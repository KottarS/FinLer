import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const PropertiesSection: React.FC = () => {
  const { t } = useTranslation();
  
  const properties = [
    {
      key: 'strength',
      icon: '💪',
      color: 'from-red-500 to-orange-500'
    },
    {
      key: 'density',
      icon: '🪶',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      key: 'thermalStability',
      icon: '🔥',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      key: 'corrosionResistance',
      icon: '🛡️',
      color: 'from-green-500 to-emerald-500'
    },
    {
      key: 'selfHealing',
      icon: '🔄',
      color: 'from-purple-500 to-pink-500'
    },
    {
      key: 'frictionCoefficient',
      icon: '🧊',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      key: 'energyConductivity',
      icon: '⚡',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      key: 'antimicrobial',
      icon: '🦠',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <section id="properties" className="py-20 bg-gradient-to-b from-black via-blue-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('properties.title')}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-blue-200">
            {t('properties.intro')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property, index) => (
            <PropertyCard 
              key={property.key}
              propertyKey={property.key}
              icon={property.icon}
              colorClass={property.color}
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
            href="#additionalProperties" 
            className="inline-block px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            {t('properties.additionalProperties')}
          </a>
          <a 
            href="#compareProperties" 
            className="inline-block ml-4 px-8 py-3 rounded-full bg-transparent border border-blue-400 text-blue-400 font-medium hover:bg-blue-900/30 transition-colors"
          >
            {t('properties.compareWithOthers')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface PropertyCardProps {
  propertyKey: string;
  icon: string;
  colorClass: string;
  index: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ propertyKey, icon, colorClass, index }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl"
    >
      <div className={`h-2 bg-gradient-to-r ${colorClass}`}></div>
      <div className="p-6">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">
          {t(`properties.${propertyKey}`)}
        </h3>
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
          {t(`properties.${propertyKey}Value`)}
        </div>
        <p className="text-gray-400">
          {t(`properties.${propertyKey}Description`)}
        </p>
      </div>
    </motion.div>
  );
};

export default PropertiesSection;
