import React, { useRef, useEffect } from 'react'
import "./Video.css";
import ReactDOM from 'react-dom';


function Video({ postUrl, ...props }) {


  const handleClick = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  }

  const handleScroll = (e) => {
    let next = ReactDOM.findDOMNode(e.target).parentElement.nextSibling;
    
    if (next) {
      next.scrollIntoView()
    }
  }

  return (
    <video src={postUrl} onEnded={handleScroll} className='videoContent' muted={true} onClick={handleClick} autoPlay={false} controls></video>
  )
}

export default Video