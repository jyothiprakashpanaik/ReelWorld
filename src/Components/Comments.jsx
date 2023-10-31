import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import { Avatar, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Comments({ postData }) {
    const [comments, setComments] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const fetchPromises = postData.comments.map(commentId =>
                database.comments.doc(commentId).get()
            );

            const fetchedComments = await Promise.all(fetchPromises);

            const newData = fetchedComments.map(doc => doc.data());
            setComments(newData);
        }

        fetchData();

    }, [postData]);

    const handleProfile = (id) => {
        navigate(`/profile/${id}`)
    }

    return (
        <div>{
            !comments ? <CircularProgress /> :
                <>
                    {
                        comments.map((comment, index) => {
                            return (<div key={index} style={{ display: "flex", alignItems: "flex-start" }}>
                                <Avatar src={comment.userProfileImage} style={{ margin: "0.25rem", cursor: "pointer" }} />
                                <p style={{ overflowWrap: "break-word", overflow: "auto", marginTop: "0" }}>
                                    <span style={{ fontWeight: "bold" }} onClick={()=>handleProfile(comment.userId)} >{comment.userName}</span>
                                    &nbsp;{comment.comment}</p>
                            </div>)
                        })
                    }
                </>
        }</div>
    )
}

export default Comments