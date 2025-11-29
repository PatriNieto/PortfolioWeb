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
    ? scrollProgress * (windowHeight > 0 ? -(windowHeight / 2) + 50 : -150)
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
          className="h-screen flex items-center justify-center fixed inset-0 z-10 pointer-events-none"
          animate={{ 
            y: titleY,
            scale: titleScale,
            opacity: titleOpacity
          }}
          transition={{ duration: animate ? 0.1 : 0, ease: "linear" }}
        >
          <Link href="/" className="pointer-events-auto">
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
          className="h-screen flex items-center justify-start fixed inset-0 z-10 pointer-events-none"
          animate={{ 
            y: titleY,
            x: titleX,
            scale: titleScale,
            opacity: titleOpacity
          }}
          transition={{ duration: animate ? 0.1 : 0, ease: "linear" }}
        >
          <Link href="/" className="pointer-events-auto">
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

      {/* Botón CONTACTO - Posición fija abajo derecha */}
      <motion.div
        className={`fixed ${isMobile ? 'bottom-6 right-6' : 'bottom-8 right-8'} z-50`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.button
          onClick={() => setShowFooter(!showFooter)}
          className="relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Fondo con efecto */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full group-hover:bg-white/10 transition-all duration-300" />
          
          {/* Texto */}
          <span className={`relative block ${isMobile ? 'px-6 py-3 text-xs' : 'px-8 py-4 text-sm'} text-white font-light tracking-[0.3em] uppercase`}>
            Contacto
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
          className={`flex-1 flex items-center justify-center ${isMobile ? 'min-h-[50vh]' : 'min-h-screen'} w-full max-w-full ${!isMobile ? 'border-r border-white/10' : 'border-b border-white/10'} relative overflow-hidden group`}
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
          className={`flex-1 flex items-center justify-center ${isMobile ? 'min-h-[50vh]' : 'min-h-screen'} w-full max-w-full relative overflow-hidden group`}
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

      {/* Footer mejorado - Distribución vertical */}
      {showFooter && (
        <>
          {/* Overlay oscuro */}
          <div 
            className="fixed inset-0 z-[90]"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }}
            onClick={() => setShowFooter(false)}
          />
          
          {/* Footer azul eléctrico */}
          <div
            className="fixed left-0 right-0 z-[100] w-full h-full flex flex-col content-center items-center justify-center"
            style={{
              top: 0,
              bottom: 0,
              background: '#2b00ff',
            }}
          >
          
            <div className={`w-full max-w-4xl h-full ${isMobile ? 'px-8' : 'px-16'}`}>
            <button
              onClick={() => setShowFooter(false)}
              className="fixed z-[110]  text-4xl "
            >
              ×
            </button> 
              {/* Contenido distribuido verticalmente */}
              <div className="flex flex-col h-full content-center items-center justify-center gap-12 pb-8">
                
                {/* Email */}
                <div
                className="pb-8">
             
                  <a 
                    href="mailto:patricianieto2.0@gmail.com" 
                    className={`text-white ${isMobile ? 'text-xl' : 'text-3xl'} font-light hover:text-white/70 transition-colors block break-all`}
                  >
                    patricianieto2.0@gmail.com
                  </a>
                </div>

                {/* Teléfono */}
                <div>
             
                  <a 
                    href="tel:+34625093694" 
                    className={`text-white ${isMobile ? 'text-xl' : 'text-3xl'} font-light hover:text-white/70 transition-colors block`}
                  >
                    +34 625 093 694
                  </a>
                </div>

                {/* Redes Sociales */}
                <div>
         
                  <div className="flex flex-col gap-4">
                    {[
                      { name: 'GitHub', url: 'https://github.com' },
                      { name: 'LinkedIn', url: 'https://linkedin.com' },
                      { name: 'Instagram', url: 'https://instagram.com' }
                    ].map((red) => (
                      <a
                        key={red.name}
                        href={red.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-white ${isMobile ? 'text-lg' : 'text-2xl'} font-light hover:text-white/70 transition-all inline-flex items-center gap-3 hover:translate-x-2`}
                      >
                        {red.name} <span>→</span>
                      </a>
                    ))}
                  </div>
                </div>

              </div>
    
            </div>

            {/* Botón cerrar - Simple */}
       
          </div>
        </>
      )}
    </div>
  );
}