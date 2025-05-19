import React, { useState } from "react";
import { Helmet } from "react-helmet";

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
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div className="flex items-center bg-white p-3">
      <div className="flex-shrink-0 mr-4">
        <div className="h-14 w-14 bg-gray-300 rounded-md flex items-center justify-center">
          <div className="text-2xl font-bold text-gray-600">{title[0]}</div>
        </div>
      </div>
      
      <div className="flex-grow">
        <div className="mb-1">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-gray-500">{artist}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">01:40</span>
          <div className="flex-grow">
            <div className="w-full h-1 bg-gray-300 rounded-lg relative">
              <div className="absolute h-full bg-purple-600 rounded-lg" style={{ width: "30%" }}></div>
            </div>
          </div>
          <span className="text-xs text-gray-500">13:25</span>
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
        
        <div className="w-24 h-2 bg-purple-200 rounded-lg relative">
          <div className="absolute h-full bg-purple-600 rounded-lg" style={{ width: "75%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default function LibraryPage() {
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
  
  // Function to navigate to other pages
  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  // Sample data for personal playlists
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
          content="Access your personal playlists in The Art of Living teacher portal." 
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
              <button onClick={() => navigateTo("/dashboard")} className="flex w-full items-center p-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </button>
              
              <button onClick={() => {}} className="flex w-full items-center p-2 rounded-md text-sm font-medium text-gray-900 bg-gray-100">
                <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                My Library
              </button>
              
              <button onClick={() => navigateTo("/videos")} className="flex w-full items-center p-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Video
              </button>
              
              <button onClick={() => navigateTo("/documents")} className="flex w-full items-center p-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Document
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            {/* Search bar */}
            <div className="relative mb-6">
              <input 
                type="text" 
                placeholder="Search" 
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="h-4 w-4 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Personal Playlists */}
            <h2 className="text-xl font-semibold mb-4">Personal Playlists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {personalPlaylists.map(playlist => (
                <VideoCard 
                  key={playlist.id}
                  title={playlist.title}
                  thumbnail={playlist.thumbnail}
                  onClick={() => playVideo(playlist.title)}
                />
              ))}
            </div>
          </main>
        </div>

        {/* Audio Player Footer */}
        <footer className="border-t bg-white">
          <div className="flex items-center">
            <div className="flex-grow">
              <AudioPlayer title={currentAudio.title} artist={currentAudio.artist} />
            </div>
            
            <div className="flex items-center mr-4 space-x-2">
              <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Sai Teja</span>
            </div>
            
            <div className="mr-4">
              <svg className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}