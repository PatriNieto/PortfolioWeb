"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [showSections, setShowSections] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Manejar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculamos el progreso del scroll (0 = centro, 1 = completamente arriba)
  const scrollProgress = Math.min(scrollY / 300, 1);
  
  // Transformaciones responsivas
  const titleY = isMobile 
    ? scrollProgress * -200  // Móvil: se mueve 200px hacia arriba
    : scrollProgress * -380; // Desktop: se mueve 380px hacia arriba
    
  const titleScale = isMobile
    ? 1 - scrollProgress * 0.7  // Móvil: va de 1 a 0.3
    : 1 - scrollProgress * 0.88; // Desktop: va de 1 a 0.12
    
  const titleOpacity = 1 - scrollProgress * 0.3; // Ambos: mantiene algo de opacidad
  
  const titleX = isMobile 
    ? 0  // Móvil: sin movimiento horizontal
    : scrollProgress * -750; // Desktop: se mueve hacia la izquierda

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSections(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      {/* Título principal con animación de scroll */}
      {isMobile ? (
        <motion.div
          className="h-screen flex items-center justify-center fixed inset-0 z-10"
          animate={{ 
            y: titleY,
            scale: titleScale,
            opacity: titleOpacity
          }}
          transition={{ duration: 0.1, ease: "linear" }}
        >
          <motion.h1
            className="text-white leading-none font-light text-center giant-text"
            style={{ 
              fontSize: 'clamp(3rem, 12vw, 12rem)',
              padding: '0 1rem'
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            PATRICIA NIETO
          </motion.h1>
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
          transition={{ duration: 0.1, ease: "linear" }}
        >
          <motion.h1
            className="text-white leading-none font-light tracking-normal md:tracking-wide giant-text text-left pl-6 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            PATRICIA NIETO
          </motion.h1>
        </motion.div>
      )}

      {/* Espacio para scroll */}
      <div className="h-screen" />

      {/* Secciones que aparecen después */}
      <motion.div 
        className="min-h-screen flex"
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: showSections ? 1 : 0,
          y: showSections ? 0 : 50
        }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Sección Web */}
        <motion.div 
          className="flex-1 flex items-center justify-center border-r border-white/10 min-h-screen"
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/web" className="w-full h-full flex items-center justify-center">
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wider">
                WEB
              </h2>
              <p className="text-white/60 text-xl md:text-2xl">
                Proyectos web y desarrollo
              </p>
            </motion.div>
          </Link>
        </motion.div>

        {/* Sección Visual */}
        <motion.div 
          className="flex-1 flex items-center justify-center min-h-screen"
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/visual" className="w-full h-full flex items-center justify-center">
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wider">
                VISUAL
              </h2>
              <p className="text-white/60 text-xl md:text-2xl">
                Fotografía y arte digital
              </p>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}