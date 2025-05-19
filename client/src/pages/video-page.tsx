import React, { useState } from "react";
import { Helmet } from "react-helmet";
import MainLayout from "@/components/main-layout";
import { Download } from "lucide-react";

// Video Card Component with Download Button
interface VideoCardProps {
  title: string;
  thumbnail: string;
  onClick: () => void;
  onDownload: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnail, onClick, onDownload }) => (
  <div className="flex flex-col cursor-pointer">
    <div className="relative rounded-md overflow-hidden mb-2 group">
      <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />
      <div className="absolute inset-0 flex items-center justify-center" onClick={onClick}>
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[12px] border-l-gray-700 ml-1" />
        </div>
      </div>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onDownload();
        }}
        className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <Download className="h-4 w-4 text-gray-600" />
      </button>
    </div>
    <h3 className="text-sm font-medium">{title}</h3>
  </div>
);

export default function VideoPage() {
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

  // Function to handle download clicks
  const downloadVideo = (title: string) => {
    console.log(`Downloading video: ${title}`);
    // In a real app, this would trigger the download
    alert(`Download started for: ${title}`);
  };

  // Sample data for Happiness Course videos
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

  // Sample data for Advanced Meditation Program videos
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
        <title>Videos | The Art of Living</title>
        <meta 
          name="description" 
          content="Browse and download meditation videos from The Art of Living teacher resources." 
        />
      </Helmet>

      <MainLayout title="Happiness Course" currentPage="video" currentAudio={currentAudio}>
        {/* Happiness Course Videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {happinessCourseVideos.map(video => (
            <VideoCard 
              key={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
              onClick={() => playVideo(video.title)}
              onDownload={() => downloadVideo(video.title)}
            />
          ))}
        </div>

        {/* Advanced Meditation Program */}
        <h2 className="text-xl font-semibold mb-4">Advance Meditation Program</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {advanceMeditationVideos.map(video => (
            <VideoCard 
              key={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
              onClick={() => playVideo(video.title)}
              onDownload={() => downloadVideo(video.title)}
            />
          ))}
        </div>

        {/* Second Advanced Meditation Program Section */}
        <h2 className="text-xl font-semibold mb-4">Advance Meditation Program</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Placeholder for future content */}
          <div className="h-40 bg-gray-200 rounded-md"></div>
          <div className="h-40 bg-gray-200 rounded-md"></div>
          <div className="h-40 bg-gray-200 rounded-md"></div>
          <div className="h-40 bg-gray-200 rounded-md"></div>
        </div>
      </MainLayout>
    </>
  );
}