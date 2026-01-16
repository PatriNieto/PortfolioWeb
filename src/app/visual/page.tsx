"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

// Importa el Header compartido
// import Header from "@/components/Header";

// Por ahora simulo el Header aquí para que funcione en el artifact
interface GlitchTextProps {
  text: string;
  className?: string;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const randomValues = useMemo(() => {
    if (!mounted) return text.split('').map(() => ({ delay: 0, duration: 1 }));
    return text.split('').map(() => ({
      delay: Math.random() * 5,
      duration: 0.6 + Math.random() * 0.8
    }));
  }, [text, mounted]);

  useEffect(() => {
    setMounted(true);
    
    // Activar animación al montar
    setIsAnimating(true);
    
    // Desactivar después de 3 segundos (duración aproximada de la animación)
    const initialTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
    
    // Repetir cada 60 segundos
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 3000);
    }, 60000); // 60000ms = 1 minuto
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <style>{`
        .glitch-container {
          display: inline-flex;
          justify-content: center;
          position: relative;
          white-space: nowrap;
        }

        .glitch-char {
          display: inline-block;
          position: relative;
          white-space: pre;
          opacity: 1;
          color: white;
          text-shadow: none;
          transform: translate(0, 0) rotate(0deg);
        }
        
        .glitch-char.active {
          animation: strobe-random var(--duration) infinite;
          animation-delay: var(--delay);
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
          display: none;
        }
        
        .glitch-char.active::before,
        .glitch-char.active::after {
          display: block;
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
            className={`glitch-char ${isAnimating ? 'active' : ''}`}
            data-char={char}
            style={{
              ['--delay' as any]: `${randomValues[index].delay}s`,
              ['--duration' as any]: `${randomValues[index].duration}s`
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
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {isMobile ? (
        <header className="fixed top-8 left-0 right-0 z-50 flex justify-center items-center px-4 w-full">
          <a href="/" className="block w-full max-w-max mx-auto text-center">
            <motion.h1
              className="text-white leading-none font-light text-center cursor-pointer select-none"
              style={{ 
                fontSize: 'clamp(1.2rem, 6vw, 2.2rem)',
                whiteSpace: 'nowrap'
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <GlitchText text="PATRICIA NIETO" />
            </motion.h1>
          </a>
        </header>
      ) : (
        <div className="fixed top-8 left-8 z-50">
          <a href="/">
            <motion.h1
              className="text-white leading-none font-light text-left cursor-pointer select-none"
              style={{ 
                fontSize: 'clamp(1.5rem, 2.5vw, 3rem)',
                whiteSpace: 'nowrap'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <GlitchText text="PATRICIA NIETO" />
            </motion.h1>
          </a>
        </div>
      )}
    </>
  );
}

export default function VisualPage() {

  const isMobile = useIsMobile();
  const projects = [
    {
      title: "PortfolioF",
      description: "Portfolio personal con diseño minimalista y elegante",
      url: "https://portfoliof.vercel.app/",
      category: "Portfolio"
    },
    {
      title: "Fotografía Digital",
      description: "Serie de experimentos fotográficos con técnicas digitales",
      url: "#",
      category: "Photo"
    },
    {
      title: "Arte Generativo",
      description: "Creaciones visuales generadas por algoritmos",
      url: "#",
      category: "Art"
    },
    {
      title: "Motion Graphics",
      description: "Animaciones y gráficos en movimiento",
      url: "#",
      category: "Motion"
    },
    {
      title: "3D Modeling",
      description: "Modelado y renderizado 3D",
      url: "#",
      category: "3D"
    },
    {
      title: "Video Art",
      description: "Piezas de videoarte experimental",
      url: "#",
      category: "Video"
    }
  ];

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      {/* Header sin animación - estado final fijo */}
      <Header/>

      {/* Proyectos Visuales */}
      <div className="min-h-screen bg-black px-8 pt-[6.5rem] md:px-2 md:pt-20 overflow-x-hidden">
        <div className="max-w-7xl mx-auto pt-20 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-40"
          >
            <h2
            className={`text-white leading-none font-light tracking-normal md:tracking-wide text-[4rem] mb-20 mt-8 md:mt-20 ${isMobile ? 'text-[1rem]': 'text-[5rem]'}`}
            style={{ textShadow: '0 0 30px rgba(255,255,255,0.3)', display: 'block' }}
            >
              VISUAL
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-24 pb-[100px]">
              Una colección de trabajos visuales que exploran la intersección entre fotografía, arte digital y nuevas tecnologías.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 w-[70vw] mx-auto pb-60 mb-60">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div className="border border-white/10 hover:border-white/30 transition-all duration-500 p-12 hover:bg-white/5 h-full flex flex-col justify-between group-hover:scale-[1.1] transform-gpu project-card relative overflow-hidden" style={{padding: '24px 48px'}}>
                    <div>
                      <h3 className="text-2xl md:text-3xl text-white font-light mb-4 group-hover:text-white transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-auto pt-4 flex justify-end">
                      <span className="text-xs text-white/50 tracking-widest uppercase font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}