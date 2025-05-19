import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import LoginForm from "@/components/login-form";
import SupportSection from "@/components/support-section";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user && !isLoading) {
      setLocation("/dashboard");
    }
  }, [user, isLoading, setLocation]);

  return (
    <>
      <Helmet>
        <title>Teacher Login | The Art of Living</title>
        <meta name="description" content="The Art of Living teacher portal - login to access your teaching resources and schedule." />
      </Helmet>
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 550 200" className="mx-auto">
                <circle cx="275" cy="80" r="50" fill="#FDB913" />
                <path d="M275,130 C249,130 228,109 228,83 C228,57 249,36 275,36 C301,36 322,57 322,83 C322,109 301,130 275,130 Z M275,32 C246,32 224,54 224,83 C224,112 246,134 275,134 C304,134 326,112 326,83 C326,54 304,32 275,32 Z" fill="#FFFFFF" />
                <path d="M275,25 C304,25 328,49 328,78 C328,107 304,131 275,131 C246,131 222,107 222,78 C222,49 246,25 275,25 Z M275,21 C243,21 218,46 218,78 C218,110 243,135 275,135 C307,135 332,110 332,78 C332,46 307,21 275,21 Z" fill="#000000" />
                <path d="M220,83 L330,83" stroke="#FFFFFF" strokeWidth="2" />
                <path d="M275,28 L275,138" stroke="#FFFFFF" strokeWidth="2" />
                <path d="M242,50 L308,116" stroke="#FFFFFF" strokeWidth="2" />
                <path d="M308,50 L242,116" stroke="#FFFFFF" strokeWidth="2" />
                <text x="275" y="170" fontFamily="Arial" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#000">THE ART OF LIVING</text>
              </svg>
            </div>
          </div>

          <LoginForm />
          <SupportSection />
        </div>
      </div>
    </>
  );
}
