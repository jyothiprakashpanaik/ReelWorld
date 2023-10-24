import React, { useEffect, useState, useRef } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Like from './Like';
import Video from './Video';
import AddComment from './AddComment';
import Like2 from './Like2';
import Comments from './Comments';
import "./Posts.css";



function Posts({ userData }) {
    const [posts, setPosts] = useState();
    const [open, setOpen] = useState(null);

    const videoRefs = useRef({});

    console.log(videoRefs);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    let options = { threshold: 0.6 };
    let callback = (entries) => {
        entries.forEach((entry) => {
            // console.log(entry);
            let ele = entry.target.childNodes[0];
            ele.play().then(() => {
                if (!ele.paused && !entry.isIntersecting) {
                    ele.pause();
                }
            })
        })
    }
    let observer = new IntersectionObserver(callback, options);

    const handleClickOpen = (id) => {
        videoRefs.current[id].pause();
        setOpen(id);
    };

    const handleClose = (id) => {
        videoRefs.current[id].pause();
        setOpen(null);
    };


    // const handleDelete = (id) => {
    //     let response = alert('This is a simple alert.');
    //     console.log(response);
    //     if (response === true) {
    //         database.posts.doc(id).delete().then(() => {
    //             console.log(`Document ${id} removed successfully.`);
    //         })
    //         let newPosts = posts.filter((post) => {
    //             return post.postId === id;
    //         });

    //         setPosts(newPosts);
    //     }
    // }

    useEffect(() => {
        const unsub = database.posts.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), postId: doc.id });
            });
            setPosts(data);
            console.log(data);
        })
        return () => { unsub(); }
    }, []);


    useEffect(() => {
        let elements = document.querySelectorAll(".videos");

        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            elements.forEach((element) => {
                observer.unobserve(element);
            });

            observer.disconnect();
        }
    }, [posts]);

    return (
        <div>{
            (!posts || !userData) ? <CircularProgress color="secondary" /> : <div className='videoContainer'>
                {posts.map((post, index) => (
                    <React.Fragment key={index}>
                        <div className="videos">
                            <Video postUrl={post.postUrl} ref={(ref) => (videoRefs.current[index] = ref)} currentId={index} />
                            <div className='collection' style={{ display: "flex" }}>
                                <div className='faAvatar' style={{ display: "flex", justifyContent: "flex-end" }} >
                                    <Avatar className='avatar' src={post.userProfile} />
                                    <h4>{post.userName}</h4>
                                </div>
                                <div className='likeAndComment'>
                                    <Like postData={post} userDetails={userData} />
                                    <CommentIcon className='commentIcon' onClick={() => handleClickOpen(index)} />
                                    {/* {userData.userId === post.userId && <DeleteIcon style={{ color: "white" }} onClick={() => handleDelete(post.postId)} />} */}
                                </div>
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
                        </div>
                    </React.Fragment>
                ))}
            </div>
        }
        </div>

    )
}

export default Posts