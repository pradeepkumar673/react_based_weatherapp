import React from 'react';
import Weather from '../Components/Weather';
import backgroundVideo from '../assets/weathervideo.mp4';

export default function Home() {
  return (
    <div className="min-h-screen p-4 flex items-center justify-center relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="w-full max-w-md relative z-10">
        <Weather />
      </div>
    </div>
  );
}