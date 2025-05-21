import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t('navigation.home')}</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">{t('navigation.home')}</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">{t('navigation.about')}</a></li>
              <li><a href="#properties" className="text-gray-400 hover:text-white transition-colors">{t('navigation.properties')}</a></li>
              <li><a href="#applications" className="text-gray-400 hover:text-white transition-colors">{t('navigation.applications')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t('navigation.research')}</h3>
            <ul className="space-y-2">
              <li><a href="#research" className="text-gray-400 hover:text-white transition-colors">{t('navigation.research')}</a></li>
              <li><a href="#publications" className="text-gray-400 hover:text-white transition-colors">{t('research.publications')}</a></li>
              <li><a href="#collaboration" className="text-gray-400 hover:text-white transition-colors">{t('research.collaboration')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t('navigation.news')}</h3>
            <ul className="space-y-2">
              <li><a href="#news" className="text-gray-400 hover:text-white transition-colors">{t('navigation.news')}</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white transition-colors">{t('news.upcomingEvents')}</a></li>
              <li><a href="#media" className="text-gray-400 hover:text-white transition-colors">{t('news.mediaGallery')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t('navigation.contact')}</h3>
            <ul className="space-y-2">
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">{t('navigation.contact')}</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">{t('contact.faq')}</a></li>
              <li><a href="#location" className="text-gray-400 hover:text-white transition-colors">{t('contact.location')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">{t('footer.copyright')}</p>
          
          <div className="flex space-x-4">
            <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">{t('footer.privacyPolicy')}</a>
            <a href="#terms" className="text-gray-400 hover:text-white transition-colors">{t('footer.termsOfUse')}</a>
            <a href="#top" className="text-gray-400 hover:text-white transition-colors">{t('footer.backToTop')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
