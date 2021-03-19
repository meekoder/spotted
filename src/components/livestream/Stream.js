import React, { useEffect, useRef } from 'react';

const Stream = () => {
      const video = useRef();
      useEffect(() => {
            if (window.IVSPlayer.isPlayerSupported) {
                  const player = window.IVSPlayer.create();
                  player.attachHTMLVideoElement(video.current);
                  player.load('https://e9b58dff6e10.us-east-1.playback.live-video.net/api/video/v1/us-east-1.118046575675.channel.xwH7gWj3HWy0.m3u8');
                  player.play();
            }
      }, []);

      return (
            <video ref={video} id="video-player" playsinline></video>
      );
}

export default Stream;
