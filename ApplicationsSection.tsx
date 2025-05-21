import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ApplicationsSection: React.FC = () => {
  const { t } = useTranslation();
  
  const applications = [
    {
      key: 'construction',
      icon: '🏗️',
      image: 'lunar-base.jpg'
    },
    {
      key: 'medicine',
      icon: '🩺',
      image: 'implants.jpg'
    },
    {
      key: 'space',
      icon: '🚀',
      image: 'spacecraft.jpg'
    },
    {
      key: 'energy',
      icon: '⚡',
      image: 'energy-crystal.jpg'
    }
  ];

  return (
    <section id="applications" className="py-20 bg-gradient-to-b from-black via-indigo-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('applications.title')}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-indigo-200">
            {t('applications.intro')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {applications.map((application, index) => (
            <ApplicationCard 
              key={application.key}
              appKey={application.key}
              icon={application.icon}
              index={index}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="#projects" 
            className="inline-block px-8 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            {t('applications.viewProjects')}
          </a>
          <a 
            href="#success-stories" 
            className="inline-block ml-4 px-8 py-3 rounded-full bg-transparent border border-indigo-400 text-indigo-400 font-medium hover:bg-indigo-900/30 transition-colors"
          >
            {t('applications.successStories')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface ApplicationCardProps {
  appKey: string;
  icon: string;
  index: number;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ appKey, icon, index }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl"
    >
      <div className="p-8">
        <div className="flex items-center mb-4">
          <div className="text-4xl mr-4">{icon}</div>
          <h3 className="text-2xl font-bold text-white">
            {t(`applications.${appKey}`)}
          </h3>
        </div>
        <p className="text-gray-300 mb-6">
          {t(`applications.${appKey}Description`)}
        </p>
        
        {/* Placeholder for future interactive elements */}
        <div className="h-48 bg-gradient-to-r from-indigo-800/30 to-purple-800/30 rounded-lg flex items-center justify-center">
          <p className="text-indigo-300 text-lg">
            {index % 2 === 0 ? 
              "Interactive 3D Model Placeholder" : 
              "Interactive Visualization Placeholder"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicationsSection;
