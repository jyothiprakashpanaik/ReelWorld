import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import { database } from '../firebase';

function AddComment({userDetails, postData}) {
    const [text, setText] = useState('');
    const handleText = (e) => {
        setText(e.target.value);
    }

    const handleClick = () => {
        
        let obj = {
            comment: text,
            userProfileImage: userDetails.profileUrl,
            userName: userDetails.fullname,
            userId: userDetails.userId,
        }
        database.comments.add(obj).then((doc)=>{
            database.posts.doc(postData.postId).update({
                comments: [...postData.comments, doc.id]
            })
        })
        setText('')
    }
    return (
        <div style={{width:"100%"}}>
            <TextField multiline maxRows={4} fullWidth label="Comment" id="Comment" size="small" sx={{width:"70%"}} value={text} onChange={handleText}/>
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleClick}>
                Send
            </Button>
        </div>
    )
}

export default AddComment