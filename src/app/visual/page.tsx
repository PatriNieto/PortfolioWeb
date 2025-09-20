"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
    <div className="bg-black min-h-screen">
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
                don't forget to come back home
              </div>
              <div className="text-lg font-medium">
                ← home
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Proyectos Visuales */}
      <div className="min-h-screen bg-black px-8 md:px-2 pt-16 md:pt-0">
        <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <h2 className="text-white leading-none font-light tracking-normal md:tracking-wide giant-text mb-20 mt-10" style={{ textShadow: '0 0 30px rgba(255,255,255,0.3)' }}>
            VISUAL
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-24 pb-[100px]">
            Una colección de trabajos visuales que exploran la intersección entre fotografía, arte digital y nuevas tecnologías.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 w-[70vw] mx-auto pb-20">
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