import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import { Avatar, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';

function Comments({ postData }) {
    const [comments, setComments] = useState();

    useEffect(() => {
        async function fetchComments() {
            let data = [];
            for (let i = 0; i < postData.comments.length; i++) {
                let doc = await database.comments.doc(postData.comments[i]).get();
                data.push(doc.data());
            }
            setComments(data);
        }

        fetchComments();

    }, [postData]);

    return (
        <div>{
            !comments ? <CircularProgress /> :
                <>
                    {
                        comments.map((comment) => {
                            return (<div style={{display: "flex", border: "1px solid black", margin: "3px", borderRadius: "5px",flexDirection:"column" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                <Avatar src={comment.userProfileImage} style={{ margin: "0.25rem", cursor: "pointer" }} />
                                <Typography variant="subtitle1" style={{ margin: "0.25rem", cursor: "pointer" }}>{comment.userName}</Typography>
                            </div>
                                <Typography variant='subtitle2' style={{ margin: "0.25rem", borderRadius:"2px", background:"gray"}}><span style={{padding:"10px"}}>{comment.comment}</span></Typography>
                            </div>)
                        })
                    }
                </>
        }</div>
    )
}

export default Comments