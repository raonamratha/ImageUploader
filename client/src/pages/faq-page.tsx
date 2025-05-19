import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqPage() {
  const [, setLocation] = useLocation();

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | The Art of Living</title>
        <meta name="description" content="Find answers to frequently asked questions about The Art of Living teacher portal." />
      </Helmet>
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-3xl mx-auto pt-8">
          <div className="flex flex-col items-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="60" viewBox="0 0 550 200" className="mb-4">
              <circle cx="275" cy="80" r="50" fill="#FDB913" />
              <path d="M275,130 C249,130 228,109 228,83 C228,57 249,36 275,36 C301,36 322,57 322,83 C322,109 301,130 275,130 Z M275,32 C246,32 224,54 224,83 C224,112 246,134 275,134 C304,134 326,112 326,83 C326,54 304,32 275,32 Z" fill="#FFFFFF" />
              <path d="M275,25 C304,25 328,49 328,78 C328,107 304,131 275,131 C246,131 222,107 222,78 C222,49 246,25 275,25 Z M275,21 C243,21 218,46 218,78 C218,110 243,135 275,135 C307,135 332,110 332,78 C332,46 307,21 275,21 Z" fill="#000000" />
              <path d="M220,83 L330,83" stroke="#FFFFFF" strokeWidth="2" />
              <path d="M275,28 L275,138" stroke="#FFFFFF" strokeWidth="2" />
              <path d="M242,50 L308,116" stroke="#FFFFFF" strokeWidth="2" />
              <path d="M308,50 L242,116" stroke="#FFFFFF" strokeWidth="2" />
              <text x="275" y="170" fontFamily="Arial" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#000">THE ART OF LIVING</text>
            </svg>
            <h1 className="text-2xl font-bold text-center">Frequently Asked Questions</h1>
          </div>

          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setLocation("/login")}
          >
            Back to Login
          </Button>

          <Accordion type="single" collapsible className="mb-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I reset my password?</AccordionTrigger>
              <AccordionContent>
                You can reset your password by clicking on the "Forget Password?" link on the login page. 
                You will receive an email with instructions to reset your password.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>I forgot my Teacher Code. How can I retrieve it?</AccordionTrigger>
              <AccordionContent>
                Please contact support at +91-8951 980 850 or email infinityapp@artofliving.org 
                with your name and registered email to retrieve your Teacher Code.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I update my profile information?</AccordionTrigger>
              <AccordionContent>
                After logging in, navigate to your profile page from the dashboard. 
                There you can update your personal information, contact details, and preferences.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>What should I do if I'm having technical issues?</AccordionTrigger>
              <AccordionContent>
                For technical support, please contact our support team at +91-8951 980 850 
                or email infinityapp@artofliving.org with details of the issue you're experiencing.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>How do I register for a new course?</AccordionTrigger>
              <AccordionContent>
                After logging in to your teacher portal, navigate to the "Courses" section, 
                where you can browse available courses and register for new ones.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="bg-[#F5F8FB] rounded-md p-4 mb-8">
            <h3 className="text-sm text-center text-gray-600 mb-3">For Any Support</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-center text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+918951980850" className="hover:underline">+91-8951 980 850 [10:00 AM - 21:00 PM IST]</a>
              </div>
              <div className="flex items-center justify-center text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:infinityapp@artofliving.org" className="hover:underline">infinityapp@artofliving.org</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
