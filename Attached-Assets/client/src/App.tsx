import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import NotFound from "@/pages/not-found";

import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Caregivers from "@/pages/Caregivers";
import CaregiverProfile from "@/pages/CaregiverProfile";
import BookingFlow from "@/pages/BookingFlow";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/caregivers" component={Caregivers} />
        <Route path="/caregivers/:id" component={CaregiverProfile} />
        <Route path="/book" component={BookingFlow} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
