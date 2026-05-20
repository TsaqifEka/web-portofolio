"use client";

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Supabase client initialization
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch projects from Supabase
  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) setError(error);
      else setProjects(data);
      
      setLoading(false);
    }
    fetchProjects();
  }, []);

  // Error display
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-10 font-mono">
        <div className="bg-white border-4 border-black p-8 text-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          <p className="font-bold">SYSTEM_ERROR_LOG: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-[#3B82F6] selection:text-white overflow-hidden">
      
      {/* Global styles and fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&display=swap');
        .font-heading { font-family: 'Archivo Black', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
      `}</style>

      {/* Navigation header */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="px-6 md:px-12 py-5 flex justify-between items-center fixed top-0 z-50 bg-white border-b-4 border-black w-full"
      >
        <div className="font-heading text-2xl tracking-tighter text-black uppercase">
          Tsaqif<span className="text-[#3B82F6]">_</span>Eka
        </div>
        <div className="hidden md:flex gap-6 font-mono text-xs font-bold uppercase tracking-widest text-black/70">
          <a href="#about" className="hover:text-black hover:underline decoration-2">Philosophy</a>
          <a href="#projects" className="hover:text-black hover:underline decoration-2">Works</a>
          <a href="#contact" className="hover:text-black hover:underline decoration-2">Contact</a>
        </div>
        <a href="#contact" className="font-heading text-xs uppercase bg-[#FFE600] text-black border-4 border-black px-5 py-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all">
          Inquire
        </a>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col gap-24 pt-24">
        
        {/* Hero section with introduction */}
        <section className="relative w-full min-h-[70vh] flex flex-col justify-center mt-10 p-10 bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-[6rem] font-heading leading-none text-black tracking-tighter uppercase mb-8"
          >
            Crafting digital harmony through <span className="bg-[#FFE600] px-2 border-4 border-black inline-block transform rotate-1">code</span> and design.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="font-mono text-black text-lg md:text-xl leading-relaxed max-w-3xl mb-12"
          >
            I am Tsaqif, a 19-year-old Information Technology student at Brawijaya University. I bridge the gap between robust programming, refined aesthetics, and strategic communication to build meaningful digital experiences.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <a href="#projects" className="inline-flex items-center gap-3 bg-[#3B82F6] text-white font-heading text-lg uppercase border-4 border-black px-10 py-5 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all">
              Explore Portfolio
            </a>
          </motion.div>
        </section>

        {/* About section with photo and biography */}
        <section id="about" className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-start py-10">
          
          {/* Left column: Profile photo */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:col-span-4 flex flex-col gap-6"
          >
            <div className="w-full aspect-[4/5] bg-white border-4 border-black p-2 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden group transform -rotate-1 hover:rotate-0 transition-transform">
              <div className="w-full h-full bg-[#f0eee9] border-4 border-black overflow-hidden relative">
                {/* Profile image - add profile.jpg to public folder */}
                <img 
                  src="/profile.jpg" 
                  alt="Tsaqif Eka" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 flex-col items-center justify-center text-center p-4 bg-white font-mono text-black">
                  <span className="font-bold text-lg mb-2">[Portrait_Module]</span>
                  <span className="text-xs">(Insert /profile.jpg in public folder)</span>
                </div>
              </div>
            </div>

            {/* Location & Contact card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full bg-white border-4 border-black p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all group cursor-pointer transform hover:-rotate-1"
            >
              {/* Location section */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">📍</span>
                  <h3 className="font-heading text-lg text-black uppercase tracking-tight group-hover:text-[#3B82F6] transition-colors">Location</h3>
                </div>
                <p className="font-mono text-lg font-bold text-black mb-1">Malang</p>
                <p className="font-mono text-sm text-black/70 leading-relaxed mb-3">
                  East Java, Indonesia
                </p>
                <a href="https://maps.google.com/?q=Malang,Indonesia" target="_blank" rel="noreferrer" className="inline-block font-mono text-xs font-bold text-[#3B82F6] uppercase hover:underline decoration-2 transition-all">
                  [View_on_Maps]
                </a>
              </div>

              {/* Divider */}
              <div className="my-5 border-t-2 border-black/20"></div>

              {/* Contact section */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">💬</span>
                  <h3 className="font-heading text-lg text-black uppercase tracking-tight group-hover:text-[#3B82F6] transition-colors">Contact</h3>
                </div>
                <p className="font-mono text-sm text-black/70 leading-relaxed mb-3">
                  Get in touch via WhatsApp
                </p>
                <a href="https://wa.me/628573352225" target="_blank" rel="noreferrer" className="inline-block font-mono text-xs font-bold text-[#3B82F6] uppercase hover:underline decoration-2 transition-all">
                  [Open_WhatsApp]
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: Biography */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-8 flex flex-col items-start bg-white border-4 border-black p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]"
          >
            <h2 className="font-heading text-4xl text-black uppercase tracking-tighter mb-8">The Philosophy of Craft</h2>
            
            <div className="font-mono text-black leading-relaxed space-y-6 text-lg">
              <p>
                My approach to software engineering is deeply multidisciplinary. While my core expertise lies in programming and Information Technology, my passion extensively covers content creation, marketing communications, and design. This intersection allows me to build platforms that are not only technically sound but also strategically positioned.
              </p>
              <p>
                Leadership and artistic expression profoundly inform my technical work. Having served as the <strong className="font-bold bg-[#FFE600] px-1 border-2 border-black">Chairman of the Student Consultative Assembly (MPK)</strong> and secured <strong className="font-bold bg-[#FFE600] px-1 border-2 border-black">1st place in a National Choir Competition</strong>, I have learned the immense value of structure, collaboration, and theatrical precision. 
              </p>
              <p>
                I view software development through a similar lens: every line of code, like every voice in a choir, must perform its role perfectly within the larger ensemble to create a masterpiece. Currently in my fourth semester, I strive to deliver digital experiences that value <span className="bg-[#3B82F6] text-white px-1">absolute reliability</span>.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Projects grid section */}
        <section id="projects" className="w-full py-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 border-b-4 border-black pb-4"
          >
            <h2 className="text-5xl font-heading text-black uppercase tracking-tighter">Selected Works</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-full text-center py-20 font-mono text-[#3B82F6] font-bold text-xl animate-pulse bg-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                [LOADING_ARCHIVES...]
              </div>
            ) : projects.map((project, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={project.id} 
                  className="bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all flex flex-col group p-4"
                >
                  <div className="h-56 bg-white border-4 border-black rounded-none relative overflow-hidden mb-6">
                    {project.image_url && project.image_url !== '-' ? (
                      // 1. Kalau kamu isi URL gambar manual di Supabase, pakai ini
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : project.live_url && project.live_url !== '-' ? (
                      // 2. Kalau gambar kosong TAPI ada link Live URL, generate screenshot otomatis!
                      <img 
                        src={`https://image.thum.io/get/width/800/crop/600/noanimate/${project.live_url}`} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                    ) : (
                      // 3. Kalau gambar kosong dan tidak ada Live URL (misal project offline)
                      <div className="absolute inset-0 flex items-center justify-center bg-[#f0eee9]">
                        <span className="font-mono text-xs text-black/50 tracking-widest uppercase">[No_Preview]</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-heading text-black uppercase group-hover:text-[#3B82F6] transition-colors duration-300 mb-4 tracking-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm font-mono text-black/80 mb-8 flex-grow leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech_stack.split(',').map((tech, idx) => (
                        <span key={idx} className="text-[10px] font-mono font-bold text-black border-2 border-black bg-[#FFE600] px-3 py-1 rounded-none uppercase tracking-wider">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 border-t-2 border-black pt-4 font-mono text-xs font-bold uppercase">
                      {project.github_url && project.github_url !== '-' && (
                        <a href={project.github_url} target="_blank" rel="noreferrer" className="text-[#3B82F6] hover:underline decoration-2">
                          [Source]
                        </a>
                      )}
                      {project.live_url && project.live_url !== '-' && (
                        <a href={project.live_url} target="_blank" rel="noreferrer" className="text-[#3B82F6] hover:underline decoration-2 ml-auto">
                          [Live_Site]
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className="w-full py-16 border-4 border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)] p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl w-full"
          >
            <h2 className="text-5xl md:text-6xl font-heading text-black uppercase tracking-tighter mb-4">
              Initiate a Dialogue
            </h2>
            <p className="font-mono text-black/80 mb-10 text-lg">
              For inquiries regarding architecture, consultation, partnerships, or collaboration.
            </p>

            <form className="flex flex-col gap-6 text-left bg-white border-4 border-black p-8 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-black uppercase">Identifier (Full Name)</label>
                  <input type="text" placeholder="Your Name" className="bg-white border-4 border-black p-4 text-black placeholder-black/30 focus:outline-none focus:bg-[#FFE600]/10 transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-black uppercase">Routing (Email Address)</label>
                  <input type="email" placeholder="user@example.com" className="bg-white border-4 border-black p-4 text-black placeholder-black/30 focus:outline-none focus:bg-[#FFE600]/10 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col gap-2 font-mono text-sm">
                <label className="font-bold text-black uppercase">Transmission Payload (Message)</label>
                <textarea rows="5" placeholder="Enter transmission data..." className="bg-white border-4 border-black p-4 text-black placeholder-black/30 focus:outline-none focus:bg-[#FFE600]/10 transition-colors resize-none"></textarea>
              </div>
              <div>
                <button type="button" className="bg-[#4B3621] bg-black text-white font-heading text-lg uppercase px-10 py-5 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all mt-2 w-full md:w-auto">
                  Submit Inquiry Transmit_
                </button>
              </div>
            </form>
          </motion.div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-white py-10 px-6 md:px-12 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-sm">
          <div className="font-heading text-xl text-black uppercase tracking-tight">
            Tsaqif<span className="text-[#3B82F6]">_</span>Eka
          </div>
          <p className="text-black/70 text-xs">
            &copy; {new Date().getFullYear()} Tsaqif Eka
          </p>
          <div className="flex gap-6 font-bold uppercase text-xs">
            <a href="#" className="text-black hover:text-[#3B82F6] hover:underline decoration-2">LinkedIn</a>
            <a href="https://github.com/TsaqifEka" target="_blank" rel="noreferrer" className="text-black hover:text-[#3B82F6] hover:underline decoration-2">GitHub</a>
            <a href="#" className="text-black hover:text-[#3B82F6] hover:underline decoration-2">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}