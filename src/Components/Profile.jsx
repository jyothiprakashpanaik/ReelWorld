import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import { CircularProgress, Typography } from '@mui/material';
import "./Profile.css";
import { useTheme } from '@mui/material/styles';
import CommentDialog from './CommentDialog';
import SideNavBar from './SideNavBar';


function Profile() {
    const [userData, setUserData] = useState();
    const [posts, setPosts] = useState();
    const [open, setOpen] = useState(null);

    const { id } = useParams();
    const theme = useTheme();

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = (id) => {
        setOpen(null);
    };

    useEffect(() => {
        console.log("[USE EFFECT start user]");
        database.users.doc(id).onSnapshot((snap) => {
            setUserData(snap.data())
        });
        console.log("[USE EFFECT end]");

    }, [id]);

    useEffect(() => {
        console.log("[USE EFFECT start posts]");

        const fetchData = async () => {
            try {
                if (userData && userData.postIds) {
                    const postPromises = userData.postIds.map(postId =>
                        database.posts.doc(postId).get()
                    );

                    const postDocs = await Promise.all(postPromises);
                    const postsData = postDocs
                        .filter(postDoc => postDoc.exists) // Filter out non-existent posts
                        .map(postDoc => postDoc.data());

                    setPosts(postsData);
                }
            } catch (error) {
                // Handle errors, e.g., connection issues, etc.
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        console.log("[USE EFFECT end]");
    }, [userData]);


    console.log("[RE RENDERING]");

    console.log([id]);
    console.log([userData]);
    console.log([posts]);


    return (
        <div>
            {!userData ? <CircularProgress /> :
                <SideNavBar userData={userData} />
            }
            <div className='spacer'></div>
            <div className='container'>
                {userData && <div className='userCard'>
                    <div className='profileImg'>
                        <img src={userData.profileUrl}></img>
                    </div>
                    <div className="info">
                        <Typography variant='h5'>
                            {userData.fullname}
                        </Typography>
                        <Typography variant='h6'>
                            {userData.postIds ? userData.postIds.length : 0} Posts
                        </Typography>
                    </div>
                </div>
                }
                <hr className='divider'></hr>
                {posts && <div className='userPostsCard'>
                    {
                        posts.map((post, index) => (
                            <div className='videoBox' key={index}>
                                <video muted={true} controls={false} autoPlay={false} onClick={() => handleClickOpen(index)} src={post.postUrl} type="video/mp4" />
                                {open === index ?
                                    <CommentDialog handleClose={handleClose} open={open} index={index} post={post} userData={userData} />
                                    : <></>}
                            </div>
                        ))
                    }
                </div >}
            </div>
        </div>
    )
}

export default Profile