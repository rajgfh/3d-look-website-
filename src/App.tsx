import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";

// Pages
import HomePage from "./pages/home-page";
import ToolsPage from "./pages/tools-page";
import PricingPage from "./pages/pricing-page";
import AboutPage from "./pages/about-page";
import ToolDetail from "./components/tools/tool-detail";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/:toolId" element={<ToolDetail />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Add this before any catchall route */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
