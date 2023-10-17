import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import "./Posts.css";
import Avatar from '@mui/material/Avatar';
import CommentIcon from '@mui/icons-material/Comment';
import Like from './Like';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Slide from '@mui/material/Slide';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



function Posts({ userData }) {
    const [posts, setPosts] = useState();
    const [open, setOpen] = useState(null);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };


    useEffect(() => {
        const unsub = database.posts.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), postId: doc.id });
            });
            setPosts(data);
            // console.log(data);
        })
        return () => { unsub(); }
    }, [])

    return (
        <div>{
            (!posts || !userData) ? <CircularProgress color="secondary" /> : <div className='videoContainer'>
                {posts.map((post, index) => (
                    <React.Fragment key={index}>
                        <div className="videos">
                            <Video postUrl={post.postUrl}/>
                            <div className='collection' style={{ display: "flex" }}>
                                <div className='faAvatar' style={{ display: "flex", justifyContent: "flex-end" }} >
                                    <Avatar className='avatar' src={post.userProfile} />
                                    <h4>{post.userName}</h4>
                                </div>
                                <div className='likeAndComment'>
                                    <Like postData={post} userDetails={userData} />
                                    <CommentIcon className='commentIcon' onClick={() => handleClickOpen(post.postId)} />
                                    <MoreHorizIcon style={{ color: "white" }} />
                                </div>
                                {open === post.postId ? <Dialog
                                    fullScreen={fullScreen}
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="responsive-dialog-title"
                                    fullWidth={true}
                                    maxWidth='md'
                                >
                                    <div className='modalContainer'>
                                        <div className='videoContainer1'>
                                            <div className="modalVedio">
                                                <Video postUrl={post.postUrl} />
                                            </div>
                                        </div>
                                        <div className='commentContainer'>
                                            <Card sx={{ maxWidth: 345 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="140"
                                                        image="/static/images/cards/contemplative-reptile.jpg"
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            Lizard
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Lizards are a widespread group of squamate reptiles, with over 6,000
                                                            species, ranging across all continents except Antarctica
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button size="small" color="primary">
                                                        Share
                                                    </Button>
                                                </CardActions>
                                            </Card>

                                            <Card variant='outlier'>
{/* {console.log(post)} */}

                                                <Typography>{`Liked by ${post.likes.length} users`}</Typography>
                                                <div style={{display:"flex"}} >
                                                    <Like postData={post} userDetails={userData}/>   
                                                </div>
                                            </Card>

                                        </div>
                                    </div>
                                </Dialog>
                                    : <></>}
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