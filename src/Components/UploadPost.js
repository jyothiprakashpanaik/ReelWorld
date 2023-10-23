import { Alert } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import { AuthContext } from '../Context/AuthContext';
import { database } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../firebase';


function UploadPost({userData}) {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const handleFile = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            setError("Please Select a File");
            setTimeout(() => {
                setError("");
            }, 5000);
            return;
        }
        if (file.size / (1024 * 1024) > 100) {
            setError("Please select a file size less than 100MB");
            setTimeout(() => {
                setError("");
            }, 5000);
            return;
        }
        try {

            setError('');
            setLoading(true);
            const uid = uuidv4();
            const uploadTask = storage.ref(`/posts/${uid}/`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3);

            function fn1(snapshot) {
                console.log("Total File Size", snapshot.totalBytes);
                console.log("Total Transfered", snapshot.bytesTransferred);
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Progress", progress);
            }
            function fn2(error) {
                console.log("Error", error);
                setError(error.message);
                setLoading(false);
                setTimeout(() => {
                    setError('');
                }, 5000);
            }
            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
                    console.log("URL", url);
                    console.log(userData);
                    database.posts.doc(uid).set({
                        likes: [],
                        comments: [],
                        postId: uid,
                        postUrl: url,
                        userId: userData.userId,
                        userProfile: userData.profileUrl,
                        userName: userData.fullname,
                        createdAt: database.getTimeStamp
                    }).then((ref) => {
                        database.users.doc(userData.userId).update({
                            postIds: userData.postIds?[...userData.postIds, uid]:[uid]
                        }).then(() => {
                            setLoading(false);
                            setUploaded(true);
                            setTimeout(() => {
                                setUploaded(false);
                            }, 5000);

                        }).catch((error) => {
                            setError(error.message);
                            setLoading(false);
                            setTimeout(() => {
                                setError('');
                            }, 5000);
                        });
                    })
                })
            }
        }
        catch (error) {
            setError(error.message);
            setLoading(false);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }

    return (
        <div>{
            error ? <Alert severity="error">{error}</Alert> : <>
                <Button variant="outlined" color="secondary" component="label" startIcon={<MovieIcon />} disabled={loading}>
                    Upload Post
                    <input type='file' accept='video/*' hidden onChange={handleFile} />
                </Button>
                {loading && <LinearProgress color="secondary" />}
                {uploaded &&  <Alert severity="success">Post Video Uploaded Successfully</Alert>}
            </>
        }
        </div>
    )
}

export default UploadPost