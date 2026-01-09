"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

function GlitchText({ text, className = "" }: GlitchTextProps) {
  return (
    <>
      <style>{`
        .glitch-container {
          display: inline-block;
          position: relative;
          white-space: nowrap;
        }

        .glitch-char {
          display: inline-block;
          position: relative;
          animation: strobe-random var(--duration) infinite;
          animation-delay: var(--delay);
          white-space: pre;
        }

        .glitch-char::before,
        .glitch-char::after {
          content: attr(data-char);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.9);
          text-stroke: 1.5px rgba(255, 255, 255, 0.9);
          opacity: 0;
        }

        .glitch-char::before {
          animation: outline-random-1 var(--duration) infinite;
          animation-delay: var(--delay);
        }

        .glitch-char::after {
          animation: outline-random-2 var(--duration) infinite;
          animation-delay: var(--delay);
        }

        @keyframes strobe-random {
          0%, 100% {
            opacity: 1;
            color: white;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
            transform: translate(0, 0) rotate(0deg);
          }
          
          10% {
            opacity: 0.2;
            color: rgba(255, 255, 255, 0.1);
            text-shadow: none;
            transform: translate(-1px, 2px) rotate(-2deg);
          }
          11% {
            opacity: 1;
            color: white;
            transform: translate(0, 0) rotate(0deg);
          }
          13% {
            opacity: 0.1;
            color: transparent;
            text-shadow: none;
            transform: translate(1px, 3px) rotate(1deg);
          }
          14% {
            opacity: 0.3;
            color: rgba(255, 255, 255, 0.2);
            transform: translate(-2px, 4px) rotate(-1deg);
          }
          15% {
            opacity: 1;
            color: white;
            transform: translate(0, 0) rotate(0deg);
          }
          17% {
            opacity: 0.15;
            color: transparent;
            transform: translate(2px, 5px) rotate(2deg);
          }
          18% {
            opacity: 1;
            color: white;
            transform: translate(0, 0) rotate(0deg);
          }
        }

        @keyframes outline-random-1 {
          0%, 100% {
            opacity: 0;
            transform: translate(0, 0) rotate(0deg);
          }
          
          10% {
            opacity: 0.9;
            transform: translate(-2px, 3px) rotate(-2deg);
            -webkit-text-stroke: 2px rgba(255, 255, 255, 1);
          }
          11% {
            opacity: 0;
          }
          13% {
            opacity: 1;
            transform: translate(1px, 4px) rotate(1deg);
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.9);
          }
          14% {
            opacity: 0.6;
            transform: translate(-1px, 5px) rotate(-1deg);
          }
          15% {
            opacity: 0;
          }
          17% {
            opacity: 0.8;
            transform: translate(2px, 6px) rotate(2deg);
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.8);
          }
          18% {
            opacity: 0;
          }
        }

        @keyframes outline-random-2 {
          0%, 100% {
            opacity: 0;
            transform: translate(0, 0) rotate(0deg);
          }
          
          10% {
            opacity: 0.8;
            transform: translate(2px, 2px) rotate(1deg);
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.8);
          }
          11% {
            opacity: 0;
          }
          13% {
            opacity: 0.9;
            transform: translate(-2px, 4px) rotate(-2deg);
            -webkit-text-stroke: 2px rgba(255, 255, 255, 1);
          }
          14% {
            opacity: 0.5;
            transform: translate(1px, 5px) rotate(1deg);
          }
          15% {
            opacity: 0;
          }
          17% {
            opacity: 0.7;
            transform: translate(-1px, 6px) rotate(-1deg);
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.7);
          }
          18% {
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .glitch-char::before,
          .glitch-char::after {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
          }
        }

        @media (min-width: 1920px) {
          .glitch-char::before,
          .glitch-char::after {
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.9);
          }
        }
      `}</style>
      <span className={`glitch-container ${className}`}>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="glitch-char"
            data-char={char}
            style={{
              ['--delay' as any]: `${Math.random() * 5}s`,
              ['--duration' as any]: `${0.6 + Math.random() * 0.8}s`
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </>
  );
}

function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="fixed top-8 left-0 right-0 z-50 pointer-events-none">
          <a href="#home" className="pointer-events-auto flex justify-center">
            <motion.h1
              className="text-white leading-none font-light text-center cursor-pointer select-none"
              style={{ 
                fontSize: 'clamp(1.5rem, 6vw, 3rem)',
                whiteSpace: 'nowrap'
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GlitchText text="PATRICIA NIETO" />
            </motion.h1>
          </a>
        </div>
      ) : (
        <div className="fixed top-8 left-8 z-50 pointer-events-none">
          <a href="#home" className="pointer-events-auto">
            <motion.h1
              className="text-white leading-none font-light text-left cursor-pointer select-none"
              style={{ 
                fontSize: 'clamp(1.5rem, 2.5vw, 3rem)',
                whiteSpace: 'nowrap'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GlitchText text="PATRICIA NIETO" />
            </motion.h1>
          </a>
        </div>
      )}
    </>
  );
}

function RotationIndicator() {
  const [isMobile, setIsMobile] = useState(false);
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const checkOrientation = () => {
      if (window.screen?.orientation) {
        setOrientation(window.screen.orientation.type.includes('landscape') ? 'landscape' : 'portrait');
      } else {
        setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
      }
    };

    checkMobile();
    checkOrientation();

    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isMobile || orientation !== 'landscape') {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center text-white"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ↻
        </motion.div>
        <motion.h3
          className="text-2xl font-light mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Rota tu dispositivo
        </motion.h3>
        <motion.p
          className="text-white/70 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Para una mejor experiencia, usa el modo vertical
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-black min-h-screen w-full overflow-hidden relative">
      <Header />
      <RotationIndicator />

      {/* Contenedor principal - Todo en una pantalla */}
      <div 
        id="home"
        className="min-h-screen w-full flex flex-col"
      >
        {/* Sección superior - Web/Visual en la misma vista */}
        <motion.div 
          id="projects"
          className={`flex-1 flex ${isMobile ? 'flex-col' : 'flex-row'} w-full`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {/* Sección Web */}
          <motion.div 
            className={`flex-1 flex items-center justify-center ${isMobile ? 'min-h-[40vh]' : ''} w-full ${!isMobile ? 'border-r border-white/10' : 'border-b border-white/10'} relative overflow-hidden group`}
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
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
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
            className={`flex-1 flex items-center justify-center ${isMobile ? 'min-h-[40vh]' : ''} w-full relative overflow-hidden group`}
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
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
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

        {/* Sección inferior - Footer/Contacto */}
        <motion.footer 
          id="contact"
          className="w-full py-16"
          style={{ background: '#2b00ff' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className={`w-full max-w-5xl mx-auto flex items-center ${isMobile ? 'px-8' : 'px-24'}`}>
            <div className="flex flex-col items-center justify-center gap-8 w-full">
              {/* Email */}
              <motion.div 
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <a 
                  href="mailto:patricianieto2.0@gmail.com" 
                  className={`text-white ${isMobile ? 'text-2xl' : 'text-4xl'} font-light hover:text-white/80 transition-colors block break-all text-center`}
                >
                  patricianieto2.0@gmail.com
                </a>
              </motion.div>

              {/* Redes Sociales */}
              <motion.div 
                className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-6`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
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
                    className={`text-white ${isMobile ? 'text-xl' : 'text-2xl'} font-light hover:text-white/80 transition-all inline-flex items-center gap-3 group`}
                    whileHover={{ x: 10 }}
                  >
                    {red.name}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}