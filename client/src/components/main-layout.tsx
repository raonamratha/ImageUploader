import React, { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Home, Book, Video, FileText, Settings, User } from "lucide-react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AudioPlayer from "@/components/audio-player";

type MainLayoutProps = {
  children: ReactNode;
  title: string;
  currentPage?: "home" | "library" | "video" | "document"; 
  currentAudio?: {
    title: string;
    artist: string;
  };
};

// Simplified AudioPlayer component for the layout
function SimpleAudioPlayer({ title, artist }: { title: string; artist: string }) {
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
        
        <button className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
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
}

export default function MainLayout({ children, title, currentPage = "home", currentAudio }: MainLayoutProps) {
  const defaultAudio = {
    title: "Short Sudarshan Kriya",
    artist: "Sri Sri Ravi Shankar"
  };

  const audio = currentAudio || defaultAudio;

  return (
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
          <nav className="flex space-x-6 items-center">
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
            <Link href="/dashboard" className={`flex items-center p-2 rounded-md text-sm font-medium ${currentPage === "home" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"}`}>
              <Home className="h-5 w-5 mr-2 text-gray-500" />
              Home
            </Link>
            <Link href="/my-library" className={`flex items-center p-2 rounded-md text-sm font-medium ${currentPage === "library" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"}`}>
              <Book className="h-5 w-5 mr-2 text-gray-500" />
              My Library
            </Link>
            <Link href="/videos" className={`flex items-center p-2 rounded-md text-sm font-medium ${currentPage === "video" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"}`}>
              <Video className="h-5 w-5 mr-2 text-gray-500" />
              Video
            </Link>
            <Link href="/documents" className={`flex items-center p-2 rounded-md text-sm font-medium ${currentPage === "document" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"}`}>
              <FileText className="h-5 w-5 mr-2 text-gray-500" />
              Document
            </Link>
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

          {/* Page title */}
          <h2 className="text-xl font-semibold mb-4">{title}</h2>

          {/* Content */}
          {children}
        </main>
      </div>

      {/* Audio Player Footer */}
      <footer className="border-t bg-white">
        <div className="flex items-center">
          <div className="flex-grow">
            <SimpleAudioPlayer title={audio.title} artist={audio.artist} />
          </div>
          
          <div className="flex items-center mr-4 space-x-2">
            <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <span className="text-sm font-medium">Sai Teja</span>
          </div>
          
          <div className="mr-4">
            <Settings className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
          </div>
        </div>
      </footer>
    </div>
  );
}