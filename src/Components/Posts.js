import React, { useEffect, useState, useRef } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import CommentIcon from '@mui/icons-material/Comment';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Like from './Like';
import Video from './Video';
import AddComment from './AddComment';
import Like2 from './Like2';
import Comments from './Comments';
import "./Posts.css";
import { useNavigate } from 'react-router-dom';



function Posts({ userData }) {
    const [posts, setPosts] = useState();
    const [open, setOpen] = useState(null);

    const videoRefs = useRef({});
    const navigate = useNavigate();

    console.log(videoRefs);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    const handleClickOpen = (id) => {
        console.log("VVVV",videoRefs.current[id]);
        videoRefs.current[id].pause(true);
        setOpen(id);
    };

    const handleClose = (id) => {
        videoRefs.current[id].pause(true);
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
            console.log("Updated Data", data);
        })
        return () => { unsub(); }
    }, []);

    console.count("Re render");
    console.log(posts);
    console.log(userData);

    return (
        <div>{
            (!posts || !userData) ? <CircularProgress color="secondary" /> : <div className='videoContainer'>
                {posts.map((post, index) => (
                    <div className="videos" key={index}>
                        <Video postUrl={post.postUrl} ref={(ref) => (videoRefs.current[index] = ref)} currentId={index} />
                        <div className='collection' style={{ display: "flex" }}>
                            <div className='faAvatar' onClick={()=>{navigate(`/profile/${userData.userId}`)}} style={{ display: "flex", justifyContent: "flex-end", width: "100%" }} >
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
                                            {/* <video src={post.postUrl} autoPlay={false} controls /> */}
                                            <Video postUrl={post.postUrl} currentId={index}/>
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

                ))}
            </div>
        }
        </div>

    )
}

export default Posts