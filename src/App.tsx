import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Gallery = lazy(() => import("./pages/Gallery"));
import { LoadingProvider } from "./context/LoadingProvider";
import { LanguageProvider } from "./context/LanguageProvider";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main portfolio page */}
        <Route
          path="/"
          element={
            <LoadingProvider>
              <Suspense>
                <MainContainer>
                  <Suspense>
                    <CharacterModel />
                  </Suspense>
                </MainContainer>
              </Suspense>
            </LoadingProvider>
          }
        />
        {/* Project detail page */}
        <Route
          path="/projects/:id"
          element={
            <LanguageProvider>
              <Suspense fallback={<div style={{ background: "#0b080c", minHeight: "100vh" }} />}>
                <ProjectDetail />
              </Suspense>
            </LanguageProvider>
          }
        />
        {/* Certifications page */}
        <Route
          path="/certifications"
          element={
            <LanguageProvider>
              <Suspense fallback={<div style={{ background: "#0b080c", minHeight: "100vh" }} />}>
                <Certifications />
              </Suspense>
            </LanguageProvider>
          }
        />
        {/* Gallery mood board */}
        <Route
          path="/gallery"
          element={
            <LanguageProvider>
              <Suspense fallback={<div style={{ background: "#0b080c", minHeight: "100vh" }} />}>
                <Gallery />
              </Suspense>
            </LanguageProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
