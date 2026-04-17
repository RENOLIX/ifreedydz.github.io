import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import { NotFoundPage } from "./pages/NotFound";
import { AuthPage } from "./pages/auth/Index";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
