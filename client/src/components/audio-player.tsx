import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, SkipBack, SkipForward, Play, Pause } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  title: string;
  artist: string;
  audioSrc: string;
}

export default function AudioPlayer({ title, artist, audioSrc }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const setAudioData = () => {
      setDuration(audio.duration);
    };
    
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };
    
    // Set up event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    
    // Start playing when the component mounts if isPlaying is true
    if (isPlaying) {
      audio.play();
    }
    
    return () => {
      // Clean up event listeners
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [audioSrc, isPlaying]);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Update audio volume
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);
  
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
  };
  
  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleProgressChange = (values: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = values[0];
    audio.currentTime = (newTime / 100) * audio.duration;
    setCurrentTime(audio.currentTime);
  };
  
  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0] / 100;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  
  return (
    <div className="flex items-center bg-white rounded-lg p-4 shadow-md w-full">
      <div className="flex-shrink-0 mr-4">
        <div className="h-14 w-14 bg-gray-200 rounded-md overflow-hidden">
          {/* Album cover or placeholder */}
          <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white">
            {title[0]}
          </div>
        </div>
      </div>
      
      <div className="flex-grow">
        <div className="mb-2">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-gray-500">{artist}</p>
        </div>
        
        <div className="flex items-center">
          <span className="text-xs text-gray-500 w-10">{formatTime(currentTime)}</span>
          <div className="flex-grow mx-2">
            <Slider 
              value={[progressPercentage]} 
              min={0} 
              max={100} 
              step={0.1}
              onValueChange={handleProgressChange}
              className="cursor-pointer"
            />
          </div>
          <span className="text-xs text-gray-500 w-10">{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 ml-4">
        <button onClick={skipBackward} className="p-1 hover:bg-gray-100 rounded-full">
          <SkipBack className="h-5 w-5" />
        </button>
        
        <button 
          onClick={togglePlay} 
          className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        
        <button onClick={skipForward} className="p-1 hover:bg-gray-100 rounded-full">
          <SkipForward className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex items-center ml-4 space-x-2">
        <button onClick={toggleMute} className="p-1 hover:bg-gray-100 rounded-full">
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
        
        <div className="w-20">
          <Slider 
            value={[isMuted ? 0 : volume * 100]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={handleVolumeChange}
          />
        </div>
      </div>
      
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </div>
  );
}