import Alert from '@mui/material/Alert';
import React, { useState } from 'react';
import { database } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../firebase';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Snackbar from '@mui/material/Snackbar';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

const allowedTypes = ["video/mp4"]

function UploadPost({ userData }) {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = React.useState();
    

    const handleFile = async (e) => {
        const file = e.target.files[0];
        try {
            if (!allowedTypes.includes(file.type)) {
                throw new Error(`File type: ${file.type} not allowed. Allowed file types are ${allowedTypes}`);
            }
            if (!file) {
                throw new Error(`No files selected`);
            }
            if (file.size / (1024 * 1024) > 100) {
                throw new Error(`Input file size: ${file.size / (1024 * 1024)}MB, should be less than 100MB`);
            }
            setError(null);
            setLoading(true);
            const uid = uuidv4();

            const uploadTask = storage.ref(`/posts/${uid}/`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3);

            //################ FIREBASE UPLOAD ######################//
            function fn1(snapshot) {
                console.log("Total File Size", snapshot.totalBytes);
                console.log("Total Transfered", snapshot.bytesTransferred);
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Progress", progress);
            }
            function fn2(error) {
                console.log(error);
                throw new Error(error.message);
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
                            postIds: userData.postIds ? [...userData.postIds, uid] : [uid]
                        }).then(() => {
                            setSuccess("Your video post has been uploaded successfully!");
                            setTimeout(() => {
                                setSuccess('');
                                setLoading(false);
                            }, 5000);

                        }).catch((error) => {
                            throw new Error(error.message);
                        });
                    })
                })
            }
        }
        catch (error) {
            setError(error.message);
            setTimeout(() => {
                setLoading(false);
                setError('');
            }, 5000);
        }
    }

    return (
        <div>
            <Snackbar open={!success || !error} autoHideDuration={6000}>
                <Alert severity={
                    success?"success":error?"error":""
                } sx={{ width: '100%' }}>
                    {success?success:error?error:""}
                </Alert>
            </Snackbar>
            <div style={{ position: 'absolute', top: "80%", left: "5%" }}>

                {!loading ? <Fab color="secondary" component="label" aria-label="add" disabled={loading}>
                    <AddIcon />
                    <input type='file' accept='video/*' hidden onChange={handleFile} />
                </Fab> :
                    <>{
                        success &&
                        <Fab color="success" aria-label="done">
                            <CheckIcon />
                        </Fab>}
                        {error &&
                            <Fab color="error" aria-label="faile">
                                <ClearIcon />
                            </Fab>}
                    </>
                }
                {loading &&
                    <CircularProgress
                        size={68}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                        }}
                    />
                }
            </div>
        </div>
    )
}

export default UploadPost