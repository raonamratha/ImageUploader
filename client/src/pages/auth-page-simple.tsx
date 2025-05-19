import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CountrySelector from "@/components/country-selector";
import LanguageSelector from "@/components/language-selector";
import { Phone, Mail } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

const loginSchema = z.object({
  teacherCode: z.string().min(1, "Teacher code is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function AuthPageSimple() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user, loginMutation } = useAuth();
  const [country, setCountry] = useState("india");
  const [language, setLanguage] = useState("english");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      teacherCode: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginValues) => {
    setIsLoading(true);
    try {
      await loginMutation.mutateAsync({
        username: data.teacherCode,
        password: data.password,
      });
      
      // Redirect to dashboard on success
      setLocation("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      // Error toast is handled in the loginMutation onError callback
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToFAQ = () => {
    setLocation("/faq");
  };

  const handleForgotPassword = () => {
    setLocation("/forgot-password");
  };

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

          {/* Country and Language Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <CountrySelector value={country} onChange={setCountry} />
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>

          {/* Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="teacherCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <div className="flex justify-end">
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-xs text-[#5BBDC6]" 
                        onClick={handleForgotPassword}
                      >
                        Forget Password?
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-[#5BBDC6] hover:bg-[#4a9ea6] uppercase font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "LOGIN"}
              </Button>
            </form>
          </Form>

          {/* FAQ Button */}
          <Button 
            type="button" 
            onClick={navigateToFAQ}
            className="w-full bg-[#FF6A35] hover:bg-[#e85e2f] uppercase font-semibold mt-4"
          >
            Frequently Asked Questions
          </Button>

          {/* Support Section */}
          <div className="mt-6 bg-[#F5F8FB] rounded-md p-4">
            <h3 className="text-sm text-center text-gray-600 mb-3">For Any Support</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+918951980850" className="hover:underline">
                  +91-8951 980 850 [10:00 AM - 21:00 PM IST]
                </a>
              </div>
              <div className="flex items-center justify-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:infinityapp@artofliving.org" className="hover:underline">
                  infinityapp@artofliving.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}