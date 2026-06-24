'use client'

import { useEffect, useRef, useState } from 'react'

export default function ContactSection() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('Pesan berhasil dikirim!')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('Gagal mengirim pesan. Coba lagi.')
      }
    } catch {
      setStatus('Gagal mengirim pesan. Coba lagi.')
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen w-full py-24 px-6 md:px-16 lg:px-24 relative z-10 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="fade-up mb-16 md:mb-24 text-center md:text-left">
          <h2 className="font-paytone text-4xl md:text-6xl text-white mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-[#555] mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="fade-up">
            <h3 className="font-paytone text-3xl md:text-4xl text-white mb-6">Let&apos;s work together!</h3>
            <p className="text-[#a0a0a0] text-lg leading-relaxed mb-10">
              Apakah Anda memiliki proyek yang menarik, pertanyaan seputar layanan saya, atau sekadar ingin menyapa? Jangan ragu untuk mengirim pesan. Saya akan berusaha merespons secepat mungkin.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-[#111] border border-gray-800 flex items-center justify-center group-hover:border-gray-500 transition-colors shadow-lg">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Email</p>
                  <span className="text-lg text-gray-300 group-hover:text-white transition-colors">hello@tsaqifeka.com</span>
                </div>
              </div>

              <div className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-[#111] border border-gray-800 flex items-center justify-center group-hover:border-gray-500 transition-colors shadow-lg">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Location</p>
                  <span className="text-lg text-gray-300 group-hover:text-white transition-colors">Malang, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="fade-up" style={{ transitionDelay: '100ms' }}>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold tracking-wider text-gray-500 uppercase mb-2">Nama</label>
                  <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#111] border border-gray-800 rounded-[1.5rem] p-4 text-white focus:outline-none focus:border-gray-500 transition-colors" placeholder="Nama Anda" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold tracking-wider text-gray-500 uppercase mb-2">Email</label>
                  <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[#111] border border-gray-800 rounded-[1.5rem] p-4 text-white focus:outline-none focus:border-gray-500 transition-colors" placeholder="email@anda.com" required />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-bold tracking-wider text-gray-500 uppercase mb-2">Subjek</label>
                <input type="text" id="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full bg-[#111] border border-gray-800 rounded-[1.5rem] p-4 text-white focus:outline-none focus:border-gray-500 transition-colors" placeholder="Topik diskusi" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold tracking-wider text-gray-500 uppercase mb-2">Pesan</label>
                <textarea id="message" rows="5" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-[#111] border border-gray-800 rounded-[1.5rem] p-4 text-white focus:outline-none focus:border-gray-500 transition-colors resize-none" placeholder="Tuliskan pesan Anda di sini..." required></textarea>
              </div>
              <button type="submit" className="w-full px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-300 transition-all duration-300 hover:scale-[1.02] uppercase tracking-widest text-sm flex items-center justify-center group">
                Kirim Pesan
                <svg className="w-4 h-4 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
              {status && (
                <p className={`text-center text-sm font-bold ${status.includes('berhasil') ? 'text-green-500' : 'text-red-500'}`}>
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
