"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header({ animate = false }) {
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

  // Si animate=true, calculamos progreso del scroll; si no, scrollProgress=1 (estado final)
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