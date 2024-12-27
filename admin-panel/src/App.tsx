import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Dashboard from "@/pages/Dashboard";
import ProtectedRoutes from "@/components/protectedRoutes";
import { ThemeProvider } from "@/components/theme-provider";
import { useAppSelector } from "@/hooks/storeHooks";
import Login from "@/pages/Login";
import { Toaster } from "./components/ui/toaster";
import SidebarLayout from "./components/sidebarLayout";
import { ROUTES } from "./constants/routes";
import Services from "./pages/Services";
import Customers from "./pages/Customers";
import Booking from "./pages/Booking";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

//* react query client
const queryClient = new QueryClient();

function App() {
  const systemState = useAppSelector((state) => state.system);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider
          defaultTheme={systemState.isDarkMode ? "dark" : "light"}
          storageKey="vite-ui-theme"
        >
          <Routes>
            {/* Public pages */}
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />

            {/* ProtectedRoutes */}
            <Route element={<ProtectedRoutes />}>
              {/* Pages with Sidebar */}
              <Route element={<SidebarLayout />}>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTES.SERVICES} element={<Services />} />
                <Route path={ROUTES.CUSTOMERS} element={<Customers />} />
                <Route path={ROUTES.BOOKING} element={<Booking />} />
                <Route path={ROUTES.SETTINGS} element={<Settings />} />
              </Route>

              {/* Pages without Sidebar */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
