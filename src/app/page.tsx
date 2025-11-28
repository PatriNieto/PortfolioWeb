"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

// Importa el Header compartido
// import Header from "@/components/Header";

// Por ahora simulo el Header aquí para que funcione en el artifact
function Header({ animate = false }) {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (animate) {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [animate]);

  const scrollProgress = animate ? Math.min(scrollY / 300, 1) : 1;
  
  const titleY = isMobile 
    ? scrollProgress * (windowHeight > 0 ? -(windowHeight / 2) + 50 : -150)  // Ajustado: +50 en lugar de +10
    : scrollProgress * -Math.min(Math.max(windowHeight * 0.45, 320), 420);
    
  const titleScale = isMobile
    ? 1 - scrollProgress * 0.7
    : 1 - scrollProgress * 0.88;
    
  const titleOpacity = 1 - scrollProgress * 0.3;
  
  const titleX = isMobile 
    ? 0
    : scrollProgress * -(windowWidth/2 - 110);

  return (
    <>
      {isMobile ? (
        <motion.div
          className="h-screen flex items-center justify-center fixed inset-0 z-10"
          animate={{ 
            y: titleY,
            scale: titleScale,
            opacity: titleOpacity
          }}
          transition={{ duration: animate ? 0.1 : 0, ease: "linear" }}
        >
          <Link href="/">
            <motion.h1
              className="text-white leading-none font-light text-center giant-text cursor-pointer select-none"
              style={{ 
                fontSize: 'clamp(3rem, 12vw, 12rem)',
                padding: '0 1rem'
              }}
              initial={animate ? { opacity: 0, scale: 0.5 } : false}
              animate={animate ? { opacity: 1, scale: 1 } : {}}
              transition={animate ? { duration: 1.2, delay: 0.3, ease: "easeOut" } : {}}
              whileHover={{ scale: 1.05, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              PATRICIA NIETO
            </motion.h1>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          className="h-screen flex items-center justify-start fixed inset-0 z-10"
          animate={{ 
            y: titleY,
            x: titleX,
            scale: titleScale,
            opacity: titleOpacity
          }}
          transition={{ duration: animate ? 0.1 : 0, ease: "linear" }}
        >
          <Link href="/">
            <motion.h1
              className="text-white leading-none font-light tracking-normal md:tracking-wide giant-text text-left pl-6 pt-6 cursor-pointer select-none"
              initial={animate ? { opacity: 0 } : false}
              animate={animate ? { opacity: 1 } : {}}
              transition={animate ? { duration: 1, delay: 0.3 } : {}}
              whileHover={{ scale: 1.05, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              PATRICIA NIETO
            </motion.h1>
          </Link>
        </motion.div>
      )}
    </>
  );
}

export default function Home() {
  const [showSections, setShowSections] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSections(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen w-full overflow-x-hidden relative">
      {/* Header con animación */}
      <Header animate={true} />

      {/* Botón CONTACTO - Mejorado */}
      <motion.div
        className="fixed left-8 right-8 z-50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.button
          onClick={() => setShowFooter(!showFooter)}
          className="relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Fondo con efecto */}
          <div className="absolute inset-0 backdrop-blur-sm border border-white/20 rounded-full  transition-all duration-300" />
          
          {/* Texto */}
          <span className="block px-8 py-4 text-white  tracking-[0.3em] uppercase">
            CONTACTO
          </span>
          
          {/* Indicador visual */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-300"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showFooter ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>

      {/* Espacio para scroll */}
      <div className="h-screen" />

      {/* Secciones que aparecen después - Mejoradas para móvil */}
      <motion.div 
        className={`min-h-screen flex ${isMobile ? 'flex-col' : 'flex-row'} w-full max-w-full relative z-20`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: showSections ? 1 : 0,
          y: showSections ? 0 : 50
        }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Sección Web */}
        <motion.div 
          className={`flex-1 flex items-center justify-center ${isMobile ? 'min-h-[50vh]' : 'min-h-screen'} w-full max-w-full ${!isMobile ? 'border-r border-white/10' : 'border-b border-white/10'} relative overflow-hidden`}
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Efecto de fondo sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <Link href="/web" className="w-full h-full flex items-center justify-center relative z-10">
            <motion.div
              className="text-center px-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2 
                className={`${isMobile ? 'text-[2.5rem]' : 'text-[3rem]'} text-white font-light mb-4 tracking-wider`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >     
                WEB
              </motion.h2>
              <p className={`text-white/60 ${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} leading-relaxed`}>
                Proyectos web y desarrollo
              </p>
            </motion.div>
          </Link>
        </motion.div>

        {/* Sección Visual */}
        <motion.div 
          className={`flex-1 flex items-center justify-center ${isMobile ? 'min-h-[50vh]' : 'min-h-screen'} w-full max-w-full relative overflow-hidden`}
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Efecto de fondo sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <Link href="/visual" className="w-full h-full flex items-center justify-center relative z-10">
            <motion.div
              className="text-center px-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2 
                className={`${isMobile ? 'text-[2.5rem]' : 'text-[3rem]'} text-white font-light mb-4 tracking-wider`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >    
                VISUAL
              </motion.h2>
              <p className={`text-white/60 ${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} leading-relaxed`}>
                Fotografía y arte digital
              </p>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer deslizante desde abajo */}
      <AnimatePresence>
        {showFooter && (
          <motion.div
            className="fixed inset-0 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overlay oscuro */}
            <motion.div 
              className="absolute inset-0 bg-black/50 pointer-events-auto"
              onClick={() => setShowFooter(false)}
            />
            
            {/* Footer azul */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 pointer-events-auto"
              style={{
                background: 'linear-gradient(135deg, #0066ff 0%, #0047b3 100%)',
                boxShadow: '0 -10px 50px rgba(0, 102, 255, 0.3)'
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="max-w-6xl mx-auto px-8 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {/* Columna 1: Email */}
                  <div>
                    <h3 className="text-white/60 text-sm tracking-widest uppercase mb-4 font-medium">
                      Email
                    </h3>
                    <a 
                      href="mailto:patricia@ejemplo.com" 
                      className="text-white text-lg md:text-xl font-light hover:text-white/80 transition-colors"
                    >
                      patricia@ejemplo.com
                    </a>
                  </div>

                  {/* Columna 2: Redes Sociales */}
                  <div>
                    <h3 className="text-white/60 text-sm tracking-widest uppercase mb-4 font-medium">
                      Redes
                    </h3>
                    <div className="flex flex-col gap-2">
                      <a 
                        href="https://github.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-lg font-light hover:text-white/80 transition-colors"
                      >
                        GitHub
                      </a>
                      <a 
                        href="https://linkedin.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-lg font-light hover:text-white/80 transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a 
                        href="https://instagram.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-lg font-light hover:text-white/80 transition-colors"
                      >
                        Instagram
                      </a>
                    </div>
                  </div>

                  {/* Columna 3: Ubicación */}
                  <div>
                    <h3 className="text-white/60 text-sm tracking-widest uppercase mb-4 font-medium">
                      Ubicación
                    </h3>
                    <p className="text-white text-lg font-light">
                      Madrid, España
                    </p>
                  </div>
                </div>

                {/* Botón cerrar */}
                <motion.button
                  onClick={() => setShowFooter(false)}
                  className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl font-light"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}