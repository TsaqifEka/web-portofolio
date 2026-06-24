'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/app/lib/supabase'

export default function CertificatesSection() {
  const sectionRef = useRef(null)
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function fetchCertificates() {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('created_at', { ascending: false })
        if (cancelled) return
        if (error) { setError(error.message); console.log(error) }
        else { setCertificates(data || []); setError(null) }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Unknown error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchCertificates()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
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
  }, [certificates])

  return (
    <section id="certificates" ref={sectionRef} className="min-h-screen w-full py-24 px-6 md:px-16 lg:px-24 border-t border-gray-900 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="fade-up mb-16 md:mb-24 text-center md:text-left">
          <h2 className="font-paytone text-4xl md:text-6xl text-white mb-4">Certificates</h2>
          <div className="w-24 h-1 bg-[#555] mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {error ? (
            <div className="col-span-full text-center py-20 font-mono text-red-400 font-bold text-xl bg-[#111] border border-red-800 rounded-[2rem]">
              [ERROR] {error}
            </div>
          ) : loading ? (
            <div className="col-span-full text-center py-20 font-mono text-gray-500 font-bold text-xl animate-pulse bg-[#111] border border-gray-800 rounded-[2rem]">
              [LOADING_CERTIFICATES...]
            </div>
          ) : certificates.length === 0 ? (
            <div className="col-span-full text-center py-20 font-mono text-gray-500 font-bold text-xl bg-[#111] border border-gray-800 rounded-[2rem]">
              [NO_CERTIFICATES_YET]
            </div>
          ) : certificates.map((cert, index) => (
            <a
              key={cert.id}
              href={cert.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="fade-up group cursor-pointer bg-[#111] border border-gray-800 rounded-[2rem] overflow-hidden hover:border-gray-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] block"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-full h-56 md:h-64 overflow-hidden relative">
                {cert.image_url && cert.image_url !== '-' ? (
                  <img src={cert.image_url} alt={cert.title} className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #1a2a3a 0%, #000 100%)' }}>
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-paytone opacity-50 text-2xl group-hover:opacity-100 transition-opacity">
                      Sertifikat {index + 1}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3 className="font-paytone text-2xl mb-3 text-gray-200 group-hover:text-white transition-colors">{cert.title}</h3>
                <p className="text-gray-500 line-clamp-2 text-sm md:text-base transition-colors group-hover:text-gray-400">{cert.description}</p>
                <div className="mt-6 flex items-center text-sm font-bold tracking-wider text-gray-600 group-hover:text-white transition-colors uppercase">
                  View
                  <svg className="w-4 h-4 ml-2 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
