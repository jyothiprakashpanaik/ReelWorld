import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import { Avatar, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';

function Comments({ postData }) {
    const [comments, setComments] = useState();

    useEffect(() => {
        console.log("[RUNNING USEEFFECT]");

        const fetchData = async () => {
            let data = []
            for (let i = 0; i < postData.comments.length; i++) {
                const doc = await database.comments.doc(postData.comments[i]).get();

                data.push(doc.data());
            }
            setComments(data);
        };

        fetchData();

    }, [postData]);



    console.log("[RE RENDER]");

    return (
        <div>{
            !comments ? <CircularProgress /> :
                <>
                    {
                        comments.map((comment, index) => {
                            return (<div key={index} style={{ display: "flex", alignItems: "flex-start" }}>
                                <Avatar src={comment.userProfileImage} style={{ margin: "0.25rem", cursor: "pointer" }} />
                                <p style={{ overflowWrap: "break-word", overflow: "auto" }}><span style={{ fontWeight: "bold" }}>{comment.userName}</span>&nbsp;{comment.comment}</p>
                            </div>)
                        })
                    }
                </>
        }</div>
    )
}

export default Comments