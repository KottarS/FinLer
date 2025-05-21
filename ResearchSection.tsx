import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ResearchSection: React.FC = () => {
  const { t } = useTranslation();
  
  const researchAreas = [
    {
      key: 'interstellarTravel',
      icon: '🌌',
      color: 'from-purple-500 to-blue-500'
    },
    {
      key: 'planetColonization',
      icon: '🪐',
      color: 'from-red-500 to-orange-500'
    },
    {
      key: 'humanEnhancement',
      icon: '🧬',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <section id="research" className="py-20 bg-gradient-to-b from-black via-purple-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('research.title')}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-purple-200">
            {t('research.intro')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {researchAreas.map((area, index) => (
            <ResearchCard 
              key={area.key}
              areaKey={area.key}
              icon={area.icon}
              colorClass={area.color}
              index={index}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-purple-900/20 backdrop-blur-sm rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('research.currentProjects')}
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center p-3 bg-purple-800/30 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mr-3"></div>
                  <p className="text-purple-200">Research Project {item}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-purple-900/20 backdrop-blur-sm rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('research.researchCenters')}
            </h3>
            <div className="h-64 bg-gradient-to-r from-purple-800/30 to-blue-800/30 rounded-lg flex items-center justify-center">
              <p className="text-purple-300 text-lg">Interactive Map Placeholder</p>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="#collaboration" 
            className="inline-block px-8 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
          >
            {t('research.collaboration')}
          </a>
          <a 
            href="#publications" 
            className="inline-block ml-4 px-8 py-3 rounded-full bg-transparent border border-purple-400 text-purple-400 font-medium hover:bg-purple-900/30 transition-colors"
          >
            {t('research.publications')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface ResearchCardProps {
  areaKey: string;
  icon: string;
  colorClass: string;
  index: number;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ areaKey, icon, colorClass, index }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl h-full"
    >
      <div className={`h-2 bg-gradient-to-r ${colorClass}`}></div>
      <div className="p-6">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">
          {t(`research.${areaKey}`)}
        </h3>
        <p className="text-gray-400">
          {t(`research.${areaKey}Description`)}
        </p>
      </div>
    </motion.div>
  );
};

export default ResearchSection;
