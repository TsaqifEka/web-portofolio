'use client'

import { useEffect, useRef } from 'react'

export default function HeroSection() {
  const titleRef = useRef(null)

  useEffect(() => {
    const title = titleRef.current
    if (!title) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY < window.innerHeight) {
        const scaleValue = 1 + Math.pow(scrollY / 80, 2)
        const opacityValue = 1 - scrollY / (window.innerHeight * 0.6)
        title.style.transform = `scale(${scaleValue})`
        title.style.opacity = String(Math.max(0, opacityValue))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="home" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        <h1 ref={titleRef} className="font-paytone text-6xl md:text-8xl lg:text-[100px] uppercase tracking-tight flex items-center select-none origin-center will-change-transform">
          <span className="text-[#888]">TSAQIF</span>
          <span className="text-white ml-4">EKA</span>
        </h1>
        <div className="w-[320px] md:w-[500px] lg:w-[600px] h-[2px] bg-[#555] mt-2 mb-8"></div>
      </div>
      <div className="absolute bottom-10 text-gray-600 text-sm tracking-widest uppercase animate-pulse pointer-events-none">
        Scroll down &nbsp; &bull; &nbsp; Click to scatter dots
      </div>
    </section>
  )
}
