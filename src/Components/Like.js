import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';

function Like({postData, userDetails}) {
    const [like, setLike] = useState();

    useEffect(()=>{
        let check = postData.likes.includes(userDetails.userId)?true:false;
        setLike(check);
    }, [postData]);

    const handleLike = () => {
        if(like===true){
            let newLikes = postData.likes.filter(userId => userId!=userDetails.userId);
            database.posts.doc(postData.postId).update({
                likes: newLikes
            });
        }
        else{
            let newLikes = postData.likes.concat([userDetails.userId]);
            database.posts.doc(postData.postId).update({
                likes: newLikes
            });
        }
    }
    

    return (
        <div>{
        like!=null?
            like? <FavoriteIcon className='likeIcon like' onClick={handleLike} style={{color:"red"}}/>:<FavoriteBorderIcon className='likeIcon unlike' onClick={handleLike}/>
           : <></>
        }</div>
    )
}

export default Like