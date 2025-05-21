import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  useEffect(() => {
    // Mobile detection for responsive design
    const checkMobile = () => {
      // Mobile detection logic for future use
      const isMobile = window.innerWidth < 768;
      document.documentElement.classList.toggle('is-mobile', isMobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black via-blue-900 to-black">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <MolecularStructure />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
          <Environment preset="night" />
        </Canvas>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {t('home.title')}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-blue-200">
            {t('home.subtitle')}
          </p>
          <p className="max-w-2xl mx-auto text-base sm:text-lg mb-12 text-gray-300">
            {t('home.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#properties"
              className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('home.keyProperties')}
            </motion.a>
            <motion.a
              href="#applications"
              className="px-8 py-3 rounded-full bg-transparent border border-blue-400 text-blue-400 font-medium hover:bg-blue-900/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('home.exploreApplications')}
            </motion.a>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg className="w-6 h-6 text-blue-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

// Placeholder for molecular structure
// In a real implementation, this would be a proper 3D model
const MolecularStructure = () => {
  return (
    <group>
      {/* Create a simple placeholder molecular structure */}
      {Array.from({ length: 20 }).map((_, i) => (
        <group key={i} position={[
          Math.sin(i * 0.5) * 3,
          Math.cos(i * 0.3) * 3,
          Math.sin(i * 0.4) * Math.cos(i * 0.2) * 3
        ]}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={i % 3 === 0 ? "#4299e1" : i % 3 === 1 ? "#9f7aea" : "#38b2ac"} />
          </mesh>
          
          {i > 0 && (
            <mesh position={[
              Math.sin((i-1) * 0.5) * 3 - Math.sin(i * 0.5) * 3,
              Math.cos((i-1) * 0.3) * 3 - Math.cos(i * 0.3) * 3,
              Math.sin((i-1) * 0.4) * Math.cos((i-1) * 0.2) * 3 - Math.sin(i * 0.4) * Math.cos(i * 0.2) * 3
            ]}>
              <cylinderGeometry args={[0.05, 0.05, 1]} />
              <meshStandardMaterial color="#a0aec0" />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};

export default Hero;
