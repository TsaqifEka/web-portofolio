'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-3xl transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
      <div className="border border-white/20 border-b-white/10 border-r-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full p-2 bg-white/10 backdrop-blur-xl backdrop-saturate-[1.8] flex justify-center items-center space-x-1 md:space-x-2 text-sm md:text-base text-gray-300">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="px-4 py-2 md:px-6 md:py-2.5 rounded-full transition-all duration-300 hover:bg-white/20 hover:text-white hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)]">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}