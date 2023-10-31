import React from 'react'
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Video from './Video';
import AddComment from './AddComment';
import Like2 from './Like2';
import Comments from './Comments';
import CancelIcon from '@mui/icons-material/Cancel';

function CommentDialog({ handleClose, index, open, post, userData }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Dialog
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
                            <Video postUrl={post.postUrl} currentId={index} />
                        </div>
                    </div>
                    <div className='commentContainer' >
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
                <div className='closeDialog' onClick={() => { handleClose(index) }}>
                    <CancelIcon />
                </div>
            </Dialog>
        </>

    )
}

export default CommentDialog