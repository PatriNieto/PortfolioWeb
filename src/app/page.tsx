"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
      setScrollY(window.scrollY);
      
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
          <a href="#home" className="pointer-events-auto">
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
          </a>
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
          <a href="#home" className="pointer-events-auto">
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
          </a>
        </motion.div>
      )}
    </>
  );
}

export default function Home() {
  const [showSections, setShowSections] = useState(false);
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

  useEffect(() => {
    document.documentElement.style.scrollSnapType = 'y mandatory';
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollSnapType = '';
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="bg-black min-h-screen w-full overflow-x-hidden relative">
      <Header animate={true} />

      {/* Primera sección - Hero */}
      <div id="home" className="h-screen scroll-snap-align-start" />

      {/* Segunda sección - Web/Visual */}
      <motion.div 
        id="projects"
        className={`min-h-screen flex ${isMobile ? 'flex-col' : 'flex-row'} w-full max-w-full relative z-20 scroll-snap-align-start`}
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
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <a href="/web" className="w-full h-full flex items-center justify-center relative z-10">
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
          </a>
        </motion.div>

        {/* Sección Visual */}
        <motion.div 
          className={`flex-1 flex items-center justify-center ${isMobile ? 'min-h-[50vh]' : 'min-h-screen'} w-full max-w-full relative overflow-hidden group`}
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <a href="/visual" className="w-full h-full flex items-center justify-center relative z-10">
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
          </a>
        </motion.div>
      </motion.div>

      {/* Tercera sección - Footer/Contacto */}
      <footer 
        id="contact"
        className="w-full min-h-screen scroll-snap-align-start"
        style={{ background: '#2b00ff' }}
      >
        <div className={`w-full max-w-5xl mx-auto h-full min-h-screen flex items-center ${isMobile ? 'px-12' : 'px-24'}`}>
          <div className="flex flex-col items-center justify-center gap-16 w-full">
            {/* Email */}
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <a 
                href="mailto:patricianieto2.0@gmail.com" 
                className={`text-white ${isMobile ? 'text-3xl' : 'text-5xl'} font-light hover:text-white/80 transition-colors block break-all text-center`}
              >
                patricianieto2.0@gmail.com
              </a>
            </motion.div>
            <br/>

            {/* Redes Sociales */}
            <motion.div 
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {[
                { name: 'GitHub', url: 'https://github.com/PatriNieto' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/patricia-nieto-full-stack/' },
                { name: 'Instagram', url: 'https://www.instagram.com/1068363_2/' }
              ].map((red, index) => (
                <motion.a
                  key={red.name}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white ${isMobile ? 'text-2xl' : 'text-4xl'} font-light hover:text-white/80 transition-all inline-flex items-center gap-3 group`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  {red.name} 
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}