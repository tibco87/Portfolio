import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import SplitscreenIntro from './components/intro/SplitscreenIntro';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import './styles/global.css';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
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
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
