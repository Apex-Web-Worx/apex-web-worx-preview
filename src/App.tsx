import { Switch, Route, Router as WouterRouter } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { DemoModalProvider } from "@/contexts/DemoModalContext";
import NotFound from "@/pages/not-found";
import PreviewHub from "@/pages/preview-hub";
import DemoPlaceholder from "@/pages/demo-placeholder";
import Home from "@/pages/home";
import MenuSelection from "@/pages/menu-selection";
import MyBooking from "@/pages/my-booking";
import AdminDashboard from "@/pages/admin/dashboard";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsConditions from "@/pages/terms-conditions";

function DetailingDemo() {
  return (
    <DemoPlaceholder
      title="Apex Detailing"
      description="Auto detailing booking platform with online appointments, gift cards, admin dashboard, and notifications — coming soon to this preview hub."
    />
  );
}

function ContractorDemo() {
  return (
    <DemoPlaceholder
      title="Contractor Pro"
      description="Contractor website with lead forms, project galleries, estimate requests, and client portal — coming soon to this preview hub."
    />
  );
}

function SalonDemo() {
  return (
    <DemoPlaceholder
      title="Salon & Spa"
      description="Salon booking with stylist profiles, service menus, and membership packages — coming soon to this preview hub."
    />
  );
}

function RestaurantDemo() {
  return (
    <DemoPlaceholder
      title="Restaurant Reserve"
      description="Restaurant site with table reservations, digital menu, and private event inquiries — coming soon to this preview hub."
    />
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={PreviewHub} />
      <Route path="/catering" nest>
        <LanguageProvider>
          <DemoModalProvider>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/menu-selection" component={MenuSelection} />
              <Route path="/my-booking/:token" component={MyBooking} />
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/privacy" component={PrivacyPolicy} />
              <Route path="/terms" component={TermsConditions} />
              <Route component={NotFound} />
            </Switch>
          </DemoModalProvider>
        </LanguageProvider>
      </Route>
      <Route path="/detailing" component={DetailingDemo} />
      <Route path="/contractor" component={ContractorDemo} />
      <Route path="/salon" component={SalonDemo} />
      <Route path="/restaurant" component={RestaurantDemo} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter>
        <Router />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
