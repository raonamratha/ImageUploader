import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Helmet } from "react-helmet";
import { Search, Home, Book, Video, FileText, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AudioPlayer from "@/components/audio-player";
import { Link, useLocation } from "wouter";

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
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 ml-1 border-transparent border-l-indigo-600" />
        </div>
      </div>
    </div>
    <h3 className="text-sm font-medium">{title}</h3>
  </div>
);

// Main Dashboard Component
export default function DashboardPage() {
  const { user } = useAuth();
  const [currentAudio, setCurrentAudio] = useState({
    title: "Short Sudarshan Kriya",
    artist: "Sri Sri Ravi Shankar",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Sample audio
  });
  
  // Function to handle video clicks
  const playVideo = (title: string) => {
    console.log(`Playing video: ${title}`);
    // In a real app, this would open the video player or change the current media
    setCurrentAudio({
      title,
      artist: "Sri Sri Ravi Shankar",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
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
                src="https://www.artofliving.org/sites/www.artofliving.org/files/styles/original_image/public/vyakti-vikas-kendra-india.png?itok=VJFmnz2D" 
                alt="Art of Living Logo" 
                className="h-10 mr-3"
              />
              <h1 className="text-xl font-bold">Teacher Resources</h1>
            </div>
            <nav className="flex space-x-6">
              <a href="#" className="text-sm font-medium hover:text-indigo-600">FAQ</a>
              <a href="#" className="text-sm font-medium hover:text-indigo-600">About Us</a>
              <a href="#" className="text-sm font-medium hover:text-indigo-600">Contact Us</a>
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
        <footer className="border-t p-2 bg-white">
          <AudioPlayer
            title={currentAudio.title}
            artist={currentAudio.artist}
            audioSrc={currentAudio.audioSrc}
          />
        </footer>
      </div>
    </>
  );
}