import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import AuthPageSimple from "@/pages/auth-page-simple";
import TeacherDashboard from "@/pages/teacher-dashboard";
import MyLibraryPage from "@/pages/my-library-page";
import VideoPage from "@/pages/video-page";
import DocumentPage from "@/pages/document-page";
import FaqPage from "@/pages/faq-page";
import ForgotPasswordPage from "@/pages/forgot-password-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AuthPageSimple} />
      <Route path="/dashboard" component={TeacherDashboard} />
      <Route path="/my-library" component={MyLibraryPage} />
      <Route path="/videos" component={VideoPage} />
      <Route path="/documents" component={DocumentPage} />
      <Route path="/faq" component={FaqPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
