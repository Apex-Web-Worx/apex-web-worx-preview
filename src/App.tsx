import { Switch, Route, Router as WouterRouter } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { DemoModalProvider } from "@/contexts/DemoModalContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import MenuSelection from "@/pages/menu-selection";
import AdminDashboard from "@/pages/admin/dashboard";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsConditions from "@/pages/terms-conditions";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/menu-selection" component={MenuSelection} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsConditions} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <LanguageProvider>
        <DemoModalProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </DemoModalProvider>
      </LanguageProvider>
    </TooltipProvider>
  );
}

export default App;
