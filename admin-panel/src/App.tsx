import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Dashboard from "@/pages/admin/Dashboard";
import ProtectedRoutes from "@/components/protectedRoutes";
import { ThemeProvider } from "@/components/theme-provider";
import { useAppSelector } from "@/hooks/storeHooks";
import Login from "@/pages/admin/Login";
import Testpage from "./pages/testpage";

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
            <Route path="/login" element={<Login />} />

            {/* ProtectedRoutes */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/test" element={<Testpage />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
