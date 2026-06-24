'use client'

import { useEffect, useRef } from 'react'

const SECTION_COLORS = {
  home: { r: 255, g: 255, b: 255 },
  about: { r: 129, g: 140, b: 248 },
  projects: { r: 6, g: 182, b: 212 },
  certificates: { r: 168, g: 85, b: 247 },
  contact: { r: 16, g: 185, b: 129 },
}

const SECTION_IDS = ['home', 'about', 'projects', 'certificates', 'contact']

function lerpColor(from, to, t) {
  return {
    r: from.r + (to.r - from.r) * t,
    g: from.g + (to.g - from.g) * t,
    b: from.b + (to.b - from.b) * t,
  }
}

export default function ParticlesBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId
    let particles = []
    let mouse = { x: -1000, y: -1000 }
    let isPressed = false
    let spotlightRadius = 160
    let targetSpotlightRadius = 160
    let currentSection = 'home'
    let activeColor = { ...SECTION_COLORS.home }
    let lastScrollY = 0
    let rafId = null
    let isThrottled = false
    let particleCount = 120
    let lineDistance = 120
    let mouseLineDistance = 150

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      particleCount = 60
      lineDistance = 80
      mouseLineDistance = 100
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 1.5
        this.vy = (Math.random() - 0.5) * 1.5
        this.baseVx = this.vx
        this.baseVy = this.vy
        this.size = Math.random() * 2 + 1
      }

      update() {
        if (isPressed) {
          const dx = this.x - mouse.x
          const dy = this.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < spotlightRadius + 100 && dist > 0) {
            const force = (spotlightRadius + 100 - dist) / (spotlightRadius + 100)
            this.vx += (dx / dist) * force * 4
            this.vy += (dy / dist) * force * 4
          }
        }

        const hx = this.x - mouse.x
        const hy = this.y - mouse.y
        const hDist = Math.sqrt(hx * hx + hy * hy)
        if (hDist < 100 && hDist > 0 && !isPressed) {
          this.vx += (hx / hDist) * 0.2
          this.vy += (hy / hDist) * 0.2
        }

        this.vx *= 0.98
        this.vy *= 0.98

        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        if (speed < 0.5) {
          this.vx += (this.baseVx - this.vx) * 0.05
          this.vy += (this.baseVy - this.vy) * 0.05
        }

        this.x += this.vx
        this.y += this.vy

        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const { r, g, b } = activeColor

        if (dist < spotlightRadius) {
          const ratio = 1 - dist / spotlightRadius
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size + ratio * 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r|0}, ${g|0}, ${b|0}, ${0.6 + ratio * 0.4})`
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r|0}, ${g|0}, ${b|0}, 0.4)`
          ctx.fill()
        }
      }
    }

    function initParticles() {
      particles = []
      const count = Math.min(
        Math.floor((canvas.width * canvas.height) / 12000),
        particleCount
      )
      for (let i = 0; i < count; i++) particles.push(new Particle())
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      spotlightRadius += (targetSpotlightRadius - spotlightRadius) * 0.12
      if (targetSpotlightRadius === 450 && Math.abs(spotlightRadius - 450) < 10) {
        targetSpotlightRadius = 160
      }

      activeColor = lerpColor(activeColor, SECTION_COLORS[currentSection], 0.05)

      const { r, g, b } = activeColor
      const rc = r | 0
      const gc = g | 0
      const bc = b | 0

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < lineDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${rc}, ${gc}, ${bc}, ${0.2 - dist / lineDistance * 0.2})`
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }

        const mx = particles[i].x - mouse.x
        const my = particles[i].y - mouse.y
        const mDist = Math.sqrt(mx * mx + my * my)
        if (mDist < mouseLineDistance) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${rc}, ${gc}, ${bc}, ${0.4 - mDist / mouseLineDistance * 0.4})`
          ctx.lineWidth = 1
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    // --- Mouse / Touch events ---
    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onMouseDown = (e) => { isPressed = true; mouse.x = e.clientX; mouse.y = e.clientY; targetSpotlightRadius = 450 }
    const onMouseUp = () => { isPressed = false }
    const onTouchStart = (e) => { if (e.touches[0]) { isPressed = true; mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; targetSpotlightRadius = 450 } }
    const onTouchMove = (e) => { if (e.touches[0]) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY } }
    const onTouchEnd = () => { isPressed = false }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    // --- Scroll physics (throttled to rAF) ---
    const onScroll = () => {
      const sy = window.scrollY
      const delta = sy - lastScrollY
      lastScrollY = sy
      const force = Math.max(-12, Math.min(delta * 0.08, 12))
      for (let i = 0; i < particles.length; i++) {
        particles[i].vy += force
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // --- Section color detection via IntersectionObserver ---
    const els = SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            currentSection = entry.target.id
          }
        }
      },
      { threshold: 0.3, rootMargin: '-5% 0px -5% 0px' }
    )
    els.forEach(el => obs.observe(el))

    resizeCanvas()
    animate()

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
