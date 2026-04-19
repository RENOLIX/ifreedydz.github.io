import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import { NotFoundPage } from "./pages/NotFound";
import { AuthPage } from "./pages/auth/Index";
import RepairCategoryPage from "./pages/repair/RepairCategoryPage";
import RepairBrandPage from "./pages/repair/RepairBrandPage";
import RepairModelPage from "./pages/repair/RepairModelPage";
import RepairFormPage from "./pages/repair/RepairFormPage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/reparation/formulaire" element={<RepairFormPage />} />
        <Route path="/reparation/:categorySlug" element={<RepairCategoryPage />} />
        <Route path="/reparation/:categorySlug/:brandSlug" element={<RepairBrandPage />} />
        <Route path="/reparation/:categorySlug/:brandSlug/:modelSlug" element={<RepairModelPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
