"use client"; // Required for client-side interactivity

import { useEffect, useRef, useState, useContext } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "./ui/button";
import SoundControlContext from "@/context/SoundControlContext";

interface SoundButtonProps {
  url: string;
}

export const SoundButton: React.FC<SoundButtonProps> = ({ url }) => {
  // State to track if the audio is playing
  const [isPlaying, setIsPlaying] = useState(false);

  // Create a ref to store the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Access SoundControlContext
  const { registerSound, unregisterSound } = useContext(SoundControlContext);

  // Initialize audio when component mounts
  useEffect(() => {
    audioRef.current = new Audio(url);

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.addEventListener("play", handlePlay);
      audioRef.current.addEventListener("pause", handlePause);
      audioRef.current.addEventListener("ended", handleEnded);
    }

    // Define stop function
    const stopSound = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };

    // Register the stop function with the context
    registerSound(stopSound);

    // Cleanup audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("play", handlePlay);
        audioRef.current.removeEventListener("pause", handlePause);
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
      unregisterSound(stopSound);
    };
  }, [url, registerSound, unregisterSound]);

  const handlePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  return (
    <Button
      variant="outline"
      size={"icon"}
      onClick={handlePlay}
      aria-label={isPlaying ? "Pause sound" : "Play sound"}
    >
      {isPlaying ? <Pause /> : <Play />}
    </Button>
  );
};
