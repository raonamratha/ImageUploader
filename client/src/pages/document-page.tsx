import React, { useState } from "react";
import { Helmet } from "react-helmet";
import MainLayout from "@/components/main-layout";
import { FileText, Download, Eye } from "lucide-react";

// Document Card Component
interface DocumentCardProps {
  title: string;
  type: string;
  size: string;
  onView: () => void;
  onDownload: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ title, type, size, onView, onDownload }) => (
  <div className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-3">
        <div className="w-10 h-12 bg-blue-100 rounded flex items-center justify-center">
          <FileText className="h-6 w-6 text-blue-500" />
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-center text-xs text-gray-500">
          <span>{type}</span>
          <span className="mx-1">•</span>
          <span>{size}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={onView}
          className="p-1.5 rounded-full hover:bg-gray-100"
          title="View"
        >
          <Eye className="h-4 w-4 text-gray-600" />
        </button>
        <button 
          onClick={onDownload}
          className="p-1.5 rounded-full hover:bg-gray-100"
          title="Download"
        >
          <Download className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </div>
  </div>
);

export default function DocumentPage() {
  const [currentAudio, setCurrentAudio] = useState({
    title: "Short Sudarshan Kriya",
    artist: "Sri Sri Ravi Shankar"
  });
  
  // Function to handle view document
  const viewDocument = (title: string) => {
    console.log(`Viewing document: ${title}`);
    // In a real app, this would open the document viewer
    alert(`Opening document: ${title}`);
  };

  // Function to handle download document
  const downloadDocument = (title: string) => {
    console.log(`Downloading document: ${title}`);
    // In a real app, this would trigger the download
    alert(`Download started for: ${title}`);
  };

  // Sample documents for guidelines
  const guidelineDocuments = [
    {
      id: 1,
      title: "SKY Practice Guidelines",
      type: "PDF",
      size: "2.3 MB",
    },
    {
      id: 2,
      title: "Teaching Manual - Happiness Course",
      type: "DOC",
      size: "4.1 MB",
    },
    {
      id: 3,
      title: "Meditation Instructions",
      type: "PDF",
      size: "1.7 MB",
    },
    {
      id: 4,
      title: "Breathing Techniques Reference",
      type: "PDF",
      size: "3.2 MB",
    },
  ];

  // Sample documents for workshop materials
  const workshopMaterials = [
    {
      id: 5,
      title: "Workshop Presentation Slides",
      type: "PPT",
      size: "5.6 MB",
    },
    {
      id: 6,
      title: "Participant Handouts",
      type: "PDF",
      size: "2.4 MB",
    },
    {
      id: 7,
      title: "Course Schedule Template",
      type: "XLS",
      size: "1.2 MB",
    },
    {
      id: 8,
      title: "Feedback Forms",
      type: "DOC",
      size: "0.8 MB",
    },
  ];

  // Sample documents for research
  const researchDocuments = [
    {
      id: 9,
      title: "Scientific Research on SKY",
      type: "PDF",
      size: "4.5 MB",
    },
    {
      id: 10,
      title: "Health Benefits Study",
      type: "PDF",
      size: "3.7 MB",
    },
    {
      id: 11,
      title: "Case Studies - Stress Reduction",
      type: "PDF",
      size: "2.9 MB",
    },
    {
      id: 12,
      title: "Meditation Impact on Well-being",
      type: "PDF",
      size: "5.1 MB",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Documents | The Art of Living</title>
        <meta 
          name="description" 
          content="Access teaching materials, guidelines, and research documents from The Art of Living teacher resources." 
        />
      </Helmet>

      <MainLayout title="Teaching Guidelines" currentPage="document" currentAudio={currentAudio}>
        {/* Teaching Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {guidelineDocuments.map(doc => (
            <DocumentCard 
              key={doc.id}
              title={doc.title}
              type={doc.type}
              size={doc.size}
              onView={() => viewDocument(doc.title)}
              onDownload={() => downloadDocument(doc.title)}
            />
          ))}
        </div>

        {/* Workshop Materials */}
        <h2 className="text-xl font-semibold mb-4">Workshop Materials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {workshopMaterials.map(doc => (
            <DocumentCard 
              key={doc.id}
              title={doc.title}
              type={doc.type}
              size={doc.size}
              onView={() => viewDocument(doc.title)}
              onDownload={() => downloadDocument(doc.title)}
            />
          ))}
        </div>

        {/* Research & Studies */}
        <h2 className="text-xl font-semibold mb-4">Research & Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {researchDocuments.map(doc => (
            <DocumentCard 
              key={doc.id}
              title={doc.title}
              type={doc.type}
              size={doc.size}
              onView={() => viewDocument(doc.title)}
              onDownload={() => downloadDocument(doc.title)}
            />
          ))}
        </div>
      </MainLayout>
    </>
  );
}