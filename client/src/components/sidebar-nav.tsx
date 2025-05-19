import React from "react";
import { Home, Book, Video, FileText } from "lucide-react";

interface SidebarNavProps {
  currentPage?: string;
}

export default function SidebarNav({ currentPage = "home" }: SidebarNavProps) {
  // Function to navigate directly
  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <nav className="space-y-2">
      <button 
        onClick={() => navigateTo("/dashboard")}
        className={`flex w-full items-center p-2 rounded-md text-sm font-medium ${
          currentPage === "home" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Home className="h-5 w-5 mr-2 text-gray-500" />
        Home
      </button>
      
      <button 
        onClick={() => navigateTo("/my-library")}
        className={`flex w-full items-center p-2 rounded-md text-sm font-medium ${
          currentPage === "library" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Book className="h-5 w-5 mr-2 text-gray-500" />
        My Library
      </button>
      
      <button 
        onClick={() => navigateTo("/videos")}
        className={`flex w-full items-center p-2 rounded-md text-sm font-medium ${
          currentPage === "video" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Video className="h-5 w-5 mr-2 text-gray-500" />
        Video
      </button>
      
      <button 
        onClick={() => navigateTo("/documents")}
        className={`flex w-full items-center p-2 rounded-md text-sm font-medium ${
          currentPage === "document" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <FileText className="h-5 w-5 mr-2 text-gray-500" />
        Document
      </button>
    </nav>
  );
}