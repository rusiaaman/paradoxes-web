import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';

const VideoBackground = memo(function VideoBackground({ videoSource, isPlaying, onLoadedData }) {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const loadedRef = useRef(false);
  const errorRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const fadeInVideo = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        gsap.to(video, {
          duration: 1,
          opacity: 1,
          ease: 'power2.inOut'
        });

        gsap.to(overlayRef.current, {
          duration: 1,
          opacity: 0.5,
          ease: 'power2.inOut'
        });
      }, 0);
    };

    const handleError = (e) => {
      console.error("Video loading error:", e);
      errorRef.current = e;
      onLoadedData?.();
    };

    const handleLoadedData = () => {
      errorRef.current = null;
      loadedRef.current = true;
      fadeInVideo();
      onLoadedData?.();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    
    try {
      video.load();
    } catch (e) {
      handleError(e);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [videoSource, onLoadedData]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loadedRef.current) return;

    const playVideo = async () => {
      if (isPlaying) {
        try {
          await video.play();
        } catch (error) {
          console.log("Video play error:", error);
        }
      } else {
        video.pause();
      }
    };

    playVideo();
  }, [isPlaying]);

  if (errorRef.current) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="text-white text-center p-4">
          <p>Unable to load video</p>
          <p className="text-sm text-gray-400">Please check if the video file exists at {videoSource}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <video
        ref={videoRef}
        src={videoSource}
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        muted
        loop={!videoSource.includes('second.mp4')}
        playsInline
        autoPlay
      />
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-0"
      />
    </div>
  );
});

export default VideoBackground;