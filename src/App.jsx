import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage, LANGUAGES } from './context/LanguageContext';
import SplitscreenIntro from './components/intro/SplitscreenIntro';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import SEO from './components/common/SEO';
import './styles/global.css';

function RootRedirect() {
  const { language } = useLanguage();
  return <Navigate to={`/${language}`} replace />;
}

function MainApp() {
  const { lang } = useParams();
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  // If the language param is invalid, we might want to redirect, 
  // but the Routes catch-all or validation above handles sync.
  // If we are waiting for sync, we can just render.

  return (
    <AnimatePresence mode="wait">
      {!introComplete ? (
        <SplitscreenIntro key="intro" onComplete={handleIntroComplete} />
      ) : (
        <motion.div
          key="main"
          className="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <LanguageProvider>
            <SEO />
            <Routes>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/:lang" element={<MainApp />} />
              <Route path="*" element={<Navigate to="/en" replace />} />
            </Routes>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
