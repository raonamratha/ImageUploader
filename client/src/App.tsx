import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import AuthPageSimple from "@/pages/auth-page-simple";
import HomePage from "@/pages/home-page";
import LibraryPage from "@/pages/library-page";
import FaqPage from "@/pages/faq-page";
import ForgotPasswordPage from "@/pages/forgot-password-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AuthPageSimple} />
      <Route path="/dashboard" component={HomePage} />
      <Route path="/my-library" component={LibraryPage} />
      <Route path="/videos" component={HomePage} />
      <Route path="/documents" component={HomePage} />
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
