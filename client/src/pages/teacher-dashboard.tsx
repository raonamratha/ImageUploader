import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Search, Home, Book, Video, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";

// Video Card Component
interface VideoCardProps {
  title: string;
  thumbnail: string;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnail, onClick }) => (
  <div className="flex flex-col cursor-pointer" onClick={onClick}>
    <div className="relative rounded-md overflow-hidden mb-2 group">
      <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[12px] border-l-gray-700 ml-1" />
        </div>
      </div>
    </div>
    <h3 className="text-sm font-medium">{title}</h3>
  </div>
);

// Audio Player Component
interface AudioPlayerProps {
  title: string;
  artist: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ title, artist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(820); // 13:40 in seconds
  const [volume, setVolume] = useState(75);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Add event listener for the space key to toggle play/pause
  useEffect(() => {
    const handleSpaceKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault(); // Prevent page scrolling
        togglePlay();
      }
    };
    
    window.addEventListener('keydown', handleSpaceKey);
    return () => window.removeEventListener('keydown', handleSpaceKey);
  }, [isPlaying]);
  
  // Effect to update time display
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;
    
    const updateTime = () => setCurrentTime(audioElement.currentTime);
    audioElement.addEventListener('timeupdate', updateTime);
    
    return () => audioElement.removeEventListener('timeupdate', updateTime);
  }, []);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.error("Playback failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex items-center bg-white p-3">
      <div className="flex-shrink-0 mr-4">
        <div className="h-14 w-14 bg-gray-300 rounded-md flex items-center justify-center">
          {/* Album art placeholder */}
          <div className="text-2xl font-bold text-gray-600">{title[0]}</div>
        </div>
      </div>
      
      <div className="flex-grow">
        <div className="mb-1">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-gray-500">{artist}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
          <div className="flex-grow">
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer range-sm"
            />
          </div>
          <span className="text-xs text-gray-500">{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 ml-4">
        <button className="p-1 rounded-full hover:bg-gray-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={togglePlay}
          className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          )}
        </button>
        
        <button className="p-1 rounded-full hover:bg-gray-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center ml-6 space-x-3">
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 9.5l0 5M12 9.5a3 3 0 013 3V15m-6-5.5v.75m0 0v.75m0-.75h-.375m0 0H9" />
        </svg>
        
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #9333ea ${volume}%, #e9d5ff ${volume}%)`,
            height: '6px',
            borderRadius: '4px'
          }}
        />
      </div>
      
      <audio 
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
      />
    </div>
  );
};

// Main Dashboard Component
export default function TeacherDashboard() {
  const [currentAudio, setCurrentAudio] = useState({
    title: "Short Sudarshan Kriya",
    artist: "Sri Sri Ravi Shankar"
  });
  
  // Function to handle video clicks
  const playVideo = (title: string) => {
    console.log(`Playing video: ${title}`);
    // In a real app, this would open the video player or change the current media
    setCurrentAudio({
      title,
      artist: "Sri Sri Ravi Shankar"
    });
  };

  // Sample data for videos
  const happinessCourseVideos = [
    {
      id: 1,
      title: "Long Sudarshan Kriya",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 2,
      title: "Aura Meditation",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 3,
      title: "Short Sudarshan Kriya",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500",
    },
  ];

  const advanceMeditationVideos = [
    {
      id: 4,
      title: "Online AMP - 3Days",
      thumbnail: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 5,
      title: "AMP - 4 Days",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 6,
      title: "AMP - 5 Days",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 7,
      title: "AMP - 7 Days",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 8,
      title: "AMP - Busy Bee",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Teacher Resources | The Art of Living</title>
        <meta 
          name="description" 
          content="Access The Art of Living teacher resources, meditation videos, and courses." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b py-2 px-4 bg-white">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="https://www.artofliving.org/sites/all/themes/custom/aol/logo.png" 
                alt="Art of Living Logo" 
                className="h-12 mr-3"
              />
              <h1 className="text-xl font-bold">Teacher Resources</h1>
            </div>
            <nav className="flex space-x-6">
              <a href="#" className="text-sm font-medium hover:text-primary">FAQ</a>
              <a href="#" className="text-sm font-medium hover:text-primary">About Us</a>
              <a href="#" className="text-sm font-medium hover:text-primary">Contact Us</a>
            </nav>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-48 border-r p-4 bg-white">
            <nav className="space-y-2">
              <a href="#" className="flex items-center p-2 rounded-md text-sm font-medium text-gray-900 bg-gray-100">
                <Home className="h-5 w-5 mr-2 text-gray-500" />
                Home
              </a>
              <a href="#" className="flex items-center p-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                <Book className="h-5 w-5 mr-2 text-gray-500" />
                My Library
              </a>
              <a href="#" className="flex items-center p-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                <Video className="h-5 w-5 mr-2 text-gray-500" />
                Video
              </a>
              <a href="#" className="flex items-center p-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                <FileText className="h-5 w-5 mr-2 text-gray-500" />
                Document
              </a>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            {/* Search bar */}
            <div className="relative mb-6">
              <Input 
                type="text" 
                placeholder="Search" 
                className="pl-10 bg-white"
              />
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            </div>

            {/* Happiness Course */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Happiness Course</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {happinessCourseVideos.map(video => (
                  <VideoCard 
                    key={video.id}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    onClick={() => playVideo(video.title)}
                  />
                ))}
              </div>
            </section>

            {/* Advanced Meditation Program */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Advance Meditation Program</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {advanceMeditationVideos.map(video => (
                  <VideoCard 
                    key={video.id}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    onClick={() => playVideo(video.title)}
                  />
                ))}
              </div>
            </section>

            {/* More Advance Meditation Program */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Advance Meditation Program</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Placeholder for future content */}
                <div className="h-40 bg-gray-200 rounded-md"></div>
                <div className="h-40 bg-gray-200 rounded-md"></div>
                <div className="h-40 bg-gray-200 rounded-md"></div>
                <div className="h-40 bg-gray-200 rounded-md"></div>
              </div>
            </section>
          </main>
        </div>

        {/* Audio Player Footer */}
        <footer className="border-t bg-white">
          <AudioPlayer
            title={currentAudio.title}
            artist={currentAudio.artist}
          />
        </footer>
      </div>
    </>
  );
}