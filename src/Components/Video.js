import React, { useRef, useEffect, useState, useImperativeHandle } from 'react'
import "./Video.css";
import ReactDOM from 'react-dom';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import LinearProgress from '@mui/material/LinearProgress';


const Video = React.forwardRef((props, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showMuteIcon, setShowMuteIcon] = useState(false);
  const [progress, setProgress] = React.useState(0);

  useImperativeHandle(ref, () => {
    return { pause: handleVideo, currentTime: getCurrentTime }
  });

  const videoRef = useRef(null);

  function handleVideo(cmtSec) {
    console.log("Before Is Paused:", videoRef.current.paused, props.currentId);
    try {
      if (cmtSec) {
        if (videoRef.current.paused === false) {
          videoRef.current.pause();
        }
        else {
          videoRef.current.play();
        }
      }
    }
    catch (err) {
      console.log(err);
    }

    console.log("After Is Paused:", videoRef.current.paused);
  }

  function getCurrentTime() {
    return videoRef.current.currentTime;
  }

  const handleClick = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
    setShowMuteIcon(true);
    setIsMuted(e.target.muted);


    setTimeout(() => {
      setShowMuteIcon(false);
    }, 5000);

  }

  const handleScroll = (e) => {
    let next = ReactDOM.findDOMNode(e.target).parentElement.nextSibling;
    try {
      if (next) {
        next.scrollIntoView({ behavior: 'smooth' })
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      try {
        if (entry.isIntersecting && isLoaded) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
      catch (err) {
        console.log(err);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, options);
    if (videoRef.current) {
      observer.observe(videoRef.current);

    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [isLoaded]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', () => {
        if (videoRef.current) {
          let currentTime = videoRef.current.currentTime;
          let duration = videoRef.current.duration;
          setProgress((currentTime / duration) * 100);
        }
      });
    }
  }, []);

  console.count(`Re Rendered ${props.currentId}`);

  return (
    <div style={{display:'flex', flexDirection:"column", alignItems:"center"}}>
      <video onLoadedMetadata={() => setIsLoaded(true)} ref={videoRef} className='videoContent' muted={true} onClick={handleClick} autoPlay={false} onEnded={handleScroll} controls={false} loop={false} src={props.postUrl} type="video/mp4" />
      <div >
        {showMuteIcon && (isMuted ? <VolumeOffIcon onClick={handleClick} 
        style={{ color: "white", background: "rgba(0, 0, 0, 0.5)", borderRadius: "50%", padding: "1%", top: "2.5%", right: "5%", position: "absolute", cursor: "pointer" }}/> : <VolumeUpIcon onClick={handleClick} 
        style={{ color: "white", background: "rgba(0, 0, 0, 0.5)", borderRadius: "50%", padding: "1%", top: "2.5%", right: "5%", position: "absolute", cursor: "pointer" }}/>)}
      </div>
      <LinearProgress variant="determinate" value={progress} color="error" 
      style={{ bottom: "8px", width: "98%", borderRadius:"5px" }}/>
    </div>
  )
})

export default Video;