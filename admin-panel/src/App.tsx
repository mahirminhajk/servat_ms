import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoutes from "./components/protectedRoutes";
import {  useAppSelector } from "./app/hooks";

function App() {

  const systemState = useAppSelector((state) => state.system);

  return (
    <ThemeProvider
      defaultTheme={systemState.isDarkMode ? "dark" : "light"}
      storageKey="vite-ui-theme"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* ProtectedRoutes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
