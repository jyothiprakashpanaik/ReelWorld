import React, { useRef, useEffect, useState, useImperativeHandle } from 'react'
import "./Video.css";
import ReactDOM from 'react-dom';



const Video = React.forwardRef((props,ref) => {

  useImperativeHandle(ref, ()=>{
    return {pause: handleVideo, currentTime: getCurrentTime}
  });

  const videoRef = useRef(null);

  function handleVideo() {
    console.log("Before Is Paused:",videoRef.current.paused, props.currentId);
    if(videoRef.current.paused===false){
      videoRef.current.pause();
    }
    else{
      videoRef.current.play();
    }
    console.log("After Is Paused:",videoRef.current.paused);
  }

  function getCurrentTime(){
    return videoRef.current.currentTime;
  }

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

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 0.5,
  //   };

  //   const handleIntersection = (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         videoRef.current.play();
  //       } else {
  //         videoRef.current.pause();
  //       }
  //     });
  //   };

  //   const observer = new IntersectionObserver(handleIntersection, options);

  //   if (videoRef.current) {
  //     observer.observe(videoRef.current);
  //   }

  //   return () => {
  //     if (videoRef.current) {
  //       observer.unobserve(videoRef.current);
  //     }
  //   };
  // }, []);

  console.log(["Re Rendered", props.currentId]);

  return (
    <video ref={videoRef} className='videoContent' muted={true} onClick={handleClick} autoPlay={false} onEnded={handleScroll} controls>
      <source src={props.postUrl} type="video/mp4"/>
    </video>
  )
})

export default Video;