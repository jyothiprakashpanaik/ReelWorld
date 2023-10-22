import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { database } from '../firebase';

function Profile() {
    let [profileData, setProfileData] = useState();
    let [posts, setPosts] = useState();

    const { id } = useParams();

    useEffect(() => {
        console.log("[USE EFFECT start]");

        const fetchData = async () => {
            try {
                const userDoc = await database.users.doc(id).get();
                const userData = userDoc.data();

                if (userData && userData.postIds) {
                    const postPromises = userData.postIds.map(postId =>
                        database.posts.doc(postId).get()
                    );

                    const postDocs = await Promise.all(postPromises);
                    const postsData = postDocs
                        .filter(postDoc => postDoc.exists) // Filter out non-existent posts
                        .map(postDoc => postDoc.data());

                    setProfileData(userData);
                    setPosts(postsData);
                }
            } catch (error) {
                // Handle errors, e.g., connection issues, etc.
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        console.log("[USE EFFECT end]");
    }, [id]);


    console.log("[RE RENDERING]");

    console.log([id]);
    console.log([profileData]);
    console.log([posts]);

    return (
        <div>Profile</div>
    )
}

export default Profile