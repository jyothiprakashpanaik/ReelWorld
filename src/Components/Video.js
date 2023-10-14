import React from 'react'
import "./Video.css";
import ReactDOM from 'react-dom'


function Video({postUrl, ...props}) {

    const handleClick = (e) => {
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }

    const handleScroll = (e) => {
        console.log(e.target);
        let next = ReactDOM.findDOMNode(e.target).parentElement.nextSibling;
        if(next){
            next.scrollIntoView()
            e.target.muted=true;
        }
    }
    

  return (
    <video src={postUrl} onEnded={handleScroll} className='videoContent' muted={true} onClick={handleClick} controls={true}></video>
  )
}

export default Video