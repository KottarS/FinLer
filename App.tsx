import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import './i18n';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertiesSection from './components/PropertiesSection';
import ApplicationsSection from './components/ApplicationsSection';
import ResearchSection from './components/ResearchSection';
import Footer from './components/Footer';

function App() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ru');

  const toggleLanguage = () => {
    const newLanguage = language === 'ru' ? 'en' : 'ru';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  useEffect(() => {
    // Set initial language
    i18n.changeLanguage(language);
    
    // Set html lang attribute
    document.documentElement.lang = language;
    
    // Set direction for RTL languages if needed in the future
    document.documentElement.dir = 'ltr';
  }, [language, i18n]);

  return (
    <div className="App bg-black text-white min-h-screen">
      <Navbar toggleLanguage={toggleLanguage} />
      <Hero />
      <PropertiesSection />
      <ApplicationsSection />
      <ResearchSection />
      <Footer />
    </div>
  );
}

export default App;
