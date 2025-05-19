import React, { useState } from "react";
import { Helmet } from "react-helmet";
import MainLayout from "@/components/main-layout";

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

export default function MyLibraryPage() {
  const [currentAudio, setCurrentAudio] = useState({
    title: "Short Sudarshan Kriya",
    artist: "Sri Sri Ravi Shankar"
  });
  
  // Function to handle video clicks
  const playVideo = (title: string) => {
    console.log(`Playing video: ${title}`);
    setCurrentAudio({
      title,
      artist: "Sri Sri Ravi Shankar"
    });
  };

  // Sample data for videos
  const personalPlaylists = [
    {
      id: 1,
      title: "Playlist-1",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 2,
      title: "Personal Kriya Mix",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 3,
      title: "My Happiness Course Mix",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500",
    },
  ];

  return (
    <>
      <Helmet>
        <title>My Library | The Art of Living</title>
        <meta 
          name="description" 
          content="Access your personal playlists and saved content from The Art of Living teacher resources." 
        />
      </Helmet>

      <MainLayout title="Personal Playlists" currentPage="library" currentAudio={currentAudio}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {personalPlaylists.map(video => (
            <VideoCard 
              key={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
              onClick={() => playVideo(video.title)}
            />
          ))}
        </div>
      </MainLayout>
    </>
  );
}