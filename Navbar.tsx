import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface NavbarProps {
  toggleLanguage: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleLanguage }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <motion.nav 
      className="fixed w-full z-50 bg-black/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0 text-white font-bold text-xl"
              whileHover={{ scale: 1.05 }}
            >
              {currentLanguage === 'ru' ? 'Азодоз 3' : 'Azodoz 3'}
            </motion.div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="#home">{t('navigation.home')}</NavLink>
            <NavLink href="#about">{t('navigation.about')}</NavLink>
            <NavLink href="#properties">{t('navigation.properties')}</NavLink>
            <NavLink href="#applications">{t('navigation.applications')}</NavLink>
            <NavLink href="#research">{t('navigation.research')}</NavLink>
            <NavLink href="#news">{t('navigation.news')}</NavLink>
            <NavLink href="#contact">{t('navigation.contact')}</NavLink>
            
            <motion.button
              onClick={toggleLanguage}
              className="ml-4 px-3 py-1 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('common.switchLanguage')}
            </motion.button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleLanguage}
              className="mr-4 px-2 py-1 rounded-md text-xs font-medium text-white bg-blue-600 hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('common.switchLanguage')}
            </motion.button>
            
            <MobileMenuButton />
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <MobileMenu />
    </motion.nav>
  );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <motion.a
      href={href}
      className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white"
      whileHover={{ scale: 1.05, color: '#ffffff' }}
    >
      {children}
    </motion.a>
  );
};

const MobileMenuButton: React.FC = () => {
  return (
    <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
      <span className="sr-only">Open main menu</span>
      {/* Icon when menu is closed */}
      <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      {/* Icon when menu is open */}
      <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

const MobileMenu: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="hidden md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <MobileNavLink href="#home">{t('navigation.home')}</MobileNavLink>
        <MobileNavLink href="#about">{t('navigation.about')}</MobileNavLink>
        <MobileNavLink href="#properties">{t('navigation.properties')}</MobileNavLink>
        <MobileNavLink href="#applications">{t('navigation.applications')}</MobileNavLink>
        <MobileNavLink href="#research">{t('navigation.research')}</MobileNavLink>
        <MobileNavLink href="#news">{t('navigation.news')}</MobileNavLink>
        <MobileNavLink href="#contact">{t('navigation.contact')}</MobileNavLink>
      </div>
    </div>
  );
};

const MobileNavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
    >
      {children}
    </a>
  );
};

export default Navbar;
