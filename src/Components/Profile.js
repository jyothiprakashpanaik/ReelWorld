import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import Navbar from './Navbar';
import { CircularProgress, Typography } from '@mui/material';

function Profile() {
    let [userData, setUserData] = useState();
    let [posts, setPosts] = useState();

    const { id } = useParams();

    useEffect(() => {
        console.log("[USE EFFECT start]");

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


    useEffect(() => {
        database.users.doc(id).onSnapshot((snap) => {
            setUserData(snap.data())
        })
    }, [id]);

    console.log("[RE RENDERING]");

    console.log([id]);
    console.log([userData]);
    console.log([posts]);

    return (
        <>

            {!userData ? <CircularProgress /> :
                <>
                <Navbar userData={userData}/>
                <div className='spacer' style={{minHeight:"12vh"}}>
                    <div className='container' style={{minHeight:"88vh", marginLeft:"18%", marginRight:"18%"}}>
                        <div className='userCard' style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <div className='profileImg' style={{flexBasis:"50%", borderRadius:"50%"}}>
                                <img src={userData.profileUrl} style={{height:"8rem", width:"8rem"}}></img>
                            </div>
                            <div className="info" style={{flexBasis:"40%"}}>
                                <Typography variant='h2'>
                                    Email: {userData.email}
                                </Typography>
                                <Typography variant='h2'>
                                    Posts: {userData.postIds.length}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            }

        </>
    )
}

export default Profile