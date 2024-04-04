'use client'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { useEffect, useState } from "react";

export function Video({ path }) {
  const [videoSrc, setVideoSrc] = useState(path);
  const [currentTime, setCurrentTime] = useState(0);
  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);
  };

  useEffect(() => {
    setVideoSrc(path);
  }, [path]);

  return (
    <div>
      <ReactPlayer
        className="react-player"
        url={`/videos/${videoSrc}`}
        width="100%"
        height="100%"
        controls={true}
        muted={true}
        playing={true}
        preload="auto"
        onProgress={handleProgress}
      />
        <source src={videoSrc} type="video/mp4" />
    </div>
  );
}

