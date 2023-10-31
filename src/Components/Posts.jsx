import React, { useEffect, useState, useRef } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import CommentIcon from '@mui/icons-material/Comment';
import Like from './Like';
import Video from './Video';
import "./Posts.css";
import { useNavigate } from 'react-router-dom';
import CommentDialog from './CommentDialog';




function Posts({ userData }) {
    const [posts, setPosts] = useState();
    const [open, setOpen] = useState(null);

    const videoRefs = useRef({});
    const navigate = useNavigate();

    console.log(videoRefs);


    const handleClickOpen = (id) => {
        console.log(videoRefs.current[id]);
        videoRefs.current[id].pause();
        setOpen(id);
    };

    const handleClose = (id) => {
        console.log("id", id);
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
                            <div className='faAvatar' onClick={() => { navigate(`/profile/${userData.userId}`) }} style={{ display: "flex", justifyContent: "flex-end", width: "100%" }} >
                                <Avatar className='avatar' src={post.userProfile} />
                                <h4>{post.userName}</h4>
                            </div>
                            <div className='likeAndComment'>
                                <Like postData={post} userDetails={userData} />
                                
                                <CommentIcon className='commentIcon' onClick={() => handleClickOpen(index)} />
                                {/* {userData.userId === post.userId && <DeleteIcon style={{ color: "white" }} onClick={() => handleDelete(post.postId)} />} */}
                            </div>
                            {open === index &&
                                <CommentDialog handleClose={handleClose} open={open} index={index} post={post} userData={userData} />
                            }
                        </div>
                    </div>

                ))}
            </div>
        }
        </div>

    )
}

export default Posts