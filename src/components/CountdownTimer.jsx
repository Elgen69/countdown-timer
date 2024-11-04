// src/components/CountdownTimer.jsx

import React, { useState, useEffect, useRef } from 'react';

function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showVideo, setShowVideo] = useState(false); 
  const [videoSrc, setVideoSrc] = useState(''); 
  const videoRef = useRef(null);

  const videoArray = [
    '/src/assets/Timer1.mp4',
    '/src/assets/Timer2.mp4',
    '/src/assets/Timer3.mp4',
    '/src/assets/Timer4.mp4',
    '/src/assets/Timer5.mp4',
    '/src/assets/Timer6.mp4',
    '/src/assets/Timer7.mp4',
];


  const startTimer = () => {
    const totalTimeInSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    if (totalTimeInSeconds > 0) {
      setTimeLeft(totalTimeInSeconds);
      setIsRunning(true);
      setShowVideo(false); 
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setShowVideo(true);
      const randomVideo = videoArray[Math.floor(Math.random() * videoArray.length)];
      setVideoSrc(randomVideo); 
    }
  }, [timeLeft, isRunning]);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.currentTime = 0; 
      const playPromise = videoRef.current.play(); 

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video started playing automatically.");
          })
          .catch((error) => {
            console.error("Video playback failed, possibly due to browser policy:", error);
          });
      }
    }
  }, [showVideo]);

  const formatTime = (time) => {
    const hrs = Math.floor(time / 3600).toString().padStart(2, '0');
    const mins = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const secs = (time % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="app-container">
      <h1>Countdown Timer!</h1>
      <div className="input-section">
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="HH"
        />
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="MM"
        />
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          placeholder="SS"
        />
      </div>
      <button onClick={startTimer}>Start Timer</button>
      <div className="display-section">{formatTime(timeLeft)}</div>

      {showVideo && (
        <div className="video-section">
          <video className="video-player" ref={videoRef} src={videoSrc} controls={false} />
        </div>
      )}
    </div>
  );
}

export default CountdownTimer;
