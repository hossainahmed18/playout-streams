import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const VideoPlayerHlsJs = ({ src }) => {
    const videoRef = useRef(null);
    const [hlsInstance, setHlsInstance] = useState(null);
    const [levels, setLevels] = useState([]);
    const [currentLevel, setCurrentLevel] = useState(-1);
  
    useEffect(() => {
      if (Hls.isSupported() && videoRef.current) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
  
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setLevels(hls.levels);
          setCurrentLevel(hls.currentLevel);
        });
  
        hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
          setCurrentLevel(data.level);
        });
  
        setHlsInstance(hls);
  
        return () => {
          hls.destroy();
        };
      }
    }, [src]);
  
    const handleLevelChange = (levelIndex) => {
      if (hlsInstance) {
        hlsInstance.currentLevel = levelIndex; // -1 for auto
      }
    };
  
    return (
      <div>
        <video ref={videoRef} controls style={{ width: "100%" }} />
        <div>
          <label>Quality:</label>
          <select value={currentLevel} onChange={(e) => handleLevelChange(Number(e.target.value))}>
            <option value={-1}>Auto</option>
            {levels.map((level, index) => (
              <option key={index} value={index}>
                {level.height}p ({Math.round(level.bitrate / 1000)} kbps)
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  
  export default VideoPlayerHlsJs;