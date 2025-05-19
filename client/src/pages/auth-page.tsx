import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/login-form";
import RegistrationForm from "@/components/registration-form";
import SupportSection from "@/components/support-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logoPath from "@/assets/art-of-living-logo.svg";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      setLocation("/");
    }
  }, [user, isLoading, setLocation]);

  return (
    <>
      <Helmet>
        <title>Teacher Login | The Art of Living</title>
        <meta name="description" content="The Art of Living teacher portal - login or register to access your teaching resources and schedule." />
      </Helmet>
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-4">
            {/* Logo Section */}
            <div className="flex justify-center mb-8">
              <div className="text-center">
                <img src={logoPath} alt="The Art of Living" className="h-24 mx-auto" />
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <LoginForm />
                  </TabsContent>
                  <TabsContent value="register">
                    <RegistrationForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <SupportSection />
          </div>

          {/* Hero Section */}
          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
            <div className="text-center p-6 bg-[#f8f9fa] rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold mb-4">Welcome to The Art of Living Teacher Portal</h1>
              <p className="mb-4 text-gray-600">
                Access all your teaching resources, manage your classes, and connect with the Art of Living community.
              </p>
              <div className="space-y-2 text-left">
                <div className="flex items-start">
                  <div className="bg-[#FDB913] rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-sm text-gray-600">Schedule and manage your classes</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#FDB913] rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-sm text-gray-600">Access teaching materials and resources</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#FDB913] rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-sm text-gray-600">Connect with the global Art of Living community</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#FDB913] rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-sm text-gray-600">Track your students' progress and engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}