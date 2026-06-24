'use client'

import { useEffect, useRef } from 'react'

export default function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
          else entry.target.classList.remove('is-visible')
        })
      },
      { threshold: 0.15 }
    )

    const elements = sectionRef.current.querySelectorAll('.fade-up')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="min-h-screen w-full flex items-center justify-center py-24 px-6 md:px-16 lg:px-24 relative z-10">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="fade-up">
          <h2 className="font-paytone text-5xl md:text-7xl lg:text-[80px] mb-8 leading-[1.1] tracking-tight">
            Hi, I&apos;m<br />Tsaqif Eka
          </h2>
          <p className="text-[#a0a0a0] text-lg md:text-xl leading-relaxed mb-8">
            &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.&quot;
          </p>

          <div className="flex items-center gap-6">
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="group relative text-gray-400 hover:text-white transition-colors duration-300">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md scale-0 group-hover:scale-150 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
              <svg className="w-8 h-8 relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="group relative text-gray-400 hover:text-white transition-colors duration-300">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md scale-0 group-hover:scale-150 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
              <svg className="w-8 h-8 relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 100.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>

            <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="group relative text-gray-400 hover:text-white transition-colors duration-300">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md scale-0 group-hover:scale-150 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
              <svg className="w-8 h-8 relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="fade-up flex justify-center lg:justify-end">
          <div className="w-full max-w-[450px] aspect-square rounded-[2.5rem] border-[6px] border-[#555] bg-[#111] shadow-2xl relative overflow-hidden group">
            <img
              src="/profile.jpg"
              alt="Tsaqif Eka"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out absolute inset-0"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 group-hover:to-white/20 transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
