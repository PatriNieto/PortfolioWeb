"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

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

export default function VisualPage() {
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
      <Header animate={false} />

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
              className="text-white leading-none font-light tracking-normal md:tracking-wide giant-text mb-20 mt-8 md:mt-20"
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