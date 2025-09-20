"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function WebPage() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: "PartiPipol",
      description: "Aplicación para la gestión de eventos",
      url: "https://partipipol.netlify.app/",
      technologies: ["React", "GSAP", "Locomotive", "Netlify"]
    },
    {
      title: "LOGO_Scroll",
      description: "Experimento interactivo con scroll y animaciones web",
      url: "https://logo-scroll-6sr2ewt34-patris-projects-9af10303.vercel.app/",
      technologies: ["Next.js", "Framer Motion", "Vercel"]
    },
    {
      title: "TaskList",
      description: "Aplicación completa de gestión de tareas con interfaz moderna",
      url: "https://tasklist-theta-sage.vercel.app/",
      technologies: ["React", "TypeScript", "Tailwind", "Vercel"]
    },
    {
      title: "Howl",
      description: "Poema interactivo de Allen Ginsberg con animaciones web",
      url: "https://howl-4zfx2i6ew-patris-projects-9af10303.vercel.app/",
      technologies: ["JavaScript", "CSS3", "Vercel"]
    },
    {
      title: "Three-Torus",
      description: "Experimento 3D con Three.js y geometrías complejas",
      url: "https://three-torus-biimjbmkg-patris-projects-9af10303.vercel.app/",
      technologies: ["Three.js", "WebGL", "JavaScript", "Vercel"]
    },
    {
      title: "Eye-Tracking",
      description: "Experimento de seguimiento ocular con tecnologías web",
      url: "https://eye-tracking-web-git-main-patris-projects-9af10303.vercel.app",
      technologies: ["JavaScript", "WebRTC", "Canvas", "Vercel"]
    },
    {
      title: "TwifightGame",
      description: "Juego interactivo desarrollado con tecnologías web modernas",
      url: "https://patrinieto.github.io/TwifightGame/",
      technologies: ["JavaScript", "HTML5", "CSS3", "GitHub Pages"]
    }
  ];

  // Obtener todas las tecnologías únicas
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  ).sort();

  // Filtrar proyectos por tecnología seleccionada
  const filteredProjects = selectedTech 
    ? projects.filter(project => project.technologies.includes(selectedTech))
    : projects;

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      {/* Texto de navegación */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link href="/">
          <motion.div
            className="text-black text-sm font-light tracking-wide cursor-pointer hover:text-gray-800 transition-colors duration-300 p-4 bg-white/10 backdrop-blur-sm rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center">
              <div className="text-xs leading-tight mb-1">
                don't forget to come back
              </div>
              <div className="text-lg font-medium">
                ← home
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Proyectos - Nueva sección */}
      <div className="min-h-screen bg-black px-8 md:px-2 pt-16 md:pt-0 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-40"
        >
          <h2 className="text-white leading-none font-light tracking-normal md:tracking-wide giant-text mb-20 mt-10" style={{ textShadow: '0 0 30px rgba(255,255,255,0.3)' }}>
             WEB
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-24 pb-[100px]">
          </p>
        </motion.div>

        {/* Filtros de tecnologías */}



        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-60 w-[70vw] mx-auto max-w-5xl"
        >
            <motion.div
              onClick={() => setSelectedTech(null)}
              className={`text-sm font-light tracking-wide rounded-full transition-all duration-300 cursor-pointer border ${
                selectedTech === null
                  ? 'bg-white text-black border-white'
                  : 'text-white/60 hover:text-white border-white/20 hover:border-white/40'
              }`}
              style={{ padding: '14px 28px' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Todas
            </motion.div>
            {allTechnologies.map((tech) => (
              <motion.div
                key={tech}
                onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                className={`text-sm font-light tracking-wide rounded-full transition-all duration-300 cursor-pointer border ${
                  selectedTech === tech
                    ? 'bg-white text-black border-white'
                    : 'text-white/60 hover:text-white border-white/20 hover:border-white/40'
                }`}
                style={{ padding: '14px 28px' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 w-[70vw] mx-auto pb-20">
          {filteredProjects.map((project, index) => (
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
                           <div className="mt-auto pt-4">
                             <div className="flex flex-wrap justify-between w-[30%] ml-auto">
                               {project.technologies.map((tech) => (
                                 <span 
                                   key={tech}
                                   className="text-[11px] text-white/50 tracking-widest uppercase font-medium px-3 py-1"
                                 >
                                   {tech}
                                 </span>
                               ))}
                             </div>
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