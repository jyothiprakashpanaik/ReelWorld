import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import "./Posts.css";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Like from './Like';


function Posts({ userData }) {
    const [posts, setPosts] = useState();

    useEffect(() => {
        const unsub = database.posts.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), postId: doc.id });
            });
            setPosts(data);
        })
        return () => { unsub(); }
    }, [])

    return (
        <div>{
            (!posts || !userData) ? <CircularProgress color="secondary" /> : <div className='videoContainer'>
                {posts.map((post, index) => (
                    <React.Fragment key={index}>
                        <div className="videos">
                            <Video postUrl={post.postUrl} />
                            <div className='collection' style={{display: "flex"}}>
                            <div className='faAvatar' style={{display:"flex", justifyContent: "flex-end"}} >
                                <Avatar className='avatar' src={post.userProfile}/>
                                <h4>{post.userName}</h4>
                            </div>
                            <Like postData={post} userDetails={userData}/>
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