import React, { useEffect, useState } from "react";
import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";

// Utility: detects current fullscreen state
const getFullscreenStatus = () => !!document.fullscreenElement;

const FullscreenToggleButton: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(getFullscreenStatus());

  const toggleFullscreen = () => {
    const el = document.documentElement;
    if (!getFullscreenStatus()) {
      el.requestFullscreen?.();
      (el as any).webkitRequestFullscreen?.();
      (el as any).msRequestFullscreen?.();
    } else {
      document.exitFullscreen?.();
      (document as any).webkitExitFullscreen?.();
    }
  };

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(getFullscreenStatus());
    };

    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  return (
    <button
      onClick={toggleFullscreen}
      className="z-50 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition"
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      {isFullscreen ? (
        <BsFullscreenExit size={20} />
      ) : (
        <BsArrowsFullscreen size={20} />
      )}
    </button>
  );
};

export default FullscreenToggleButton;
