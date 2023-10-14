import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import "./Posts.css";

function Posts({userData}) {
    const [posts, setPosts] = useState();

    useEffect(()=>{
        const unsub = database.posts.orderBy("createdAt","desc").onSnapshot((querySnapshot)=>{
            let data = [];
            querySnapshot.forEach((doc)=>{
                data.push({...doc.data(), postId:doc.id});
            });
            setPosts(data);
        })
        return ()=>{unsub();}
    }, [])

    return (
        <div>{
        (!posts || !userData) ? <CircularProgress color="secondary"/>:<div className='videoContainer'>
            {posts.map((post, index)=>(
                // console.log(post.postUrl)
                <React.Fragment key={index}>
                    <div className="videos">
                        <Video postUrl={post.postUrl}/>
                    </div>
                </React.Fragment>
            ))}
        </div>
        
        }
        </div>

    )
}

export default Posts