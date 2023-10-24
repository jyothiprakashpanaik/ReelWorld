import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import Navbar from './Navbar';
import { CircularProgress, Typography } from '@mui/material';
import "./Profile.css";
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AddComment from './AddComment';
import Like2 from './Like2';
import Comments from './Comments';
import Card from '@mui/material/Card';

function Profile() {
    const [userData, setUserData] = useState();
    const [posts, setPosts] = useState();
    const [open, setOpen] = useState(null);

    const { id } = useParams();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
    console.log(userData == null, posts == null, userData, posts)

    return (
        <>

            {userData == null || posts == null ? <CircularProgress /> :
                <>
                    <Navbar userData={userData} />
                    <div className='spacer'></div>
                    <div className='container'>
                        <div className='userCard'>
                            <div className='profileImg'>
                                <img src={userData.profileUrl}></img>
                            </div>
                            <div className="info">
                                <Typography variant='h5'>
                                    {userData.email}
                                </Typography>
                                <Typography variant='h6'>
                                    {userData.postIds.length} Posts
                                </Typography>
                            </div>
                        </div>
                        <hr className='divider'></hr>
                        <div className='userPostsCard'>
                            {
                                posts.map((post, index) => (
                                    <div className='videoBox' key={index}>
                                        <video className='videoContent' muted={true} autoPlay={false} controls onClick={() => handleClickOpen(index)}>
                                            <source src={post.postUrl} type="video/mp4" />
                                        </video>
                                        {open === index ? <Dialog
                                            fullScreen={fullScreen}
                                            open={!!(open + 1)}
                                            onClose={() => { handleClose(index) }}
                                            aria-labelledby="responsive-dialog-title"
                                            fullWidth={true}
                                            maxWidth='md'
                                        >
                                            <div className='modalContainer'>
                                                <div className='videoContainer1'>
                                                    <div className="modalVedio">
                                                        <video src={post.postUrl} autoPlay={true} controls />
                                                    </div>
                                                </div>
                                                <div className='commentContainer'>
                                                    <Card className='card1' style={{ height: "70vh", overflowY: "scroll", scrollSnapType: "y mandatory", scrollbarWidth: "none" }}>
                                                        <Comments postData={post} />
                                                    </Card>
                                                    <Card variant="outlined" className='card2'>
                                                        <Typography style={{ textAlign: "center" }}>{`Liked by ${post.likes.length} users`}</Typography>
                                                        <div className="likeComment" style={{ display: "flex", padding: "0.5rem 0", alignItems: "center" }}>
                                                            <Like2 postData={post} userDetails={userData} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} />
                                                            <AddComment postData={post} userDetails={userData} />
                                                        </div>
                                                    </Card>

                                                </div>
                                            </div>
                                        </Dialog>
                                            : <></>}
                                    </div>
                                ))
                            }

                        </div >
                    </div>
                </>
            }

        </>
    )
}

export default Profile