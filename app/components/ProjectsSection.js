'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/app/lib/supabase'

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const sliderRef = useRef(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [rating, setRating] = useState(0)
  const [isRated, setIsRated] = useState(false)
  const [ratingsMap, setRatingsMap] = useState({})
  const [modalReviewData, setModalReviewData] = useState(null)
  const reviewerId = useRef('')

  useEffect(() => {
    let cancelled = false
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
        if (cancelled) return
        if (error) { setError(error.message); console.error(error) }
        else { setProjects(data || []); setError(null) }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Unknown error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchProjects()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    let id = localStorage.getItem('reviewer_id')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('reviewer_id', id)
    }
    reviewerId.current = id

    async function fetchAllRatings() {
      try {
        const res = await fetch('/api/reviews')
        const data = await res.json()
        if (data.projects) setRatingsMap(data.projects)
      } catch { /* ignore */ }
    }
    fetchAllRatings()
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
  }, [projects])

  const getScrollAmount = () => {
    const card = sliderRef.current?.querySelector('.project-card')
    if (!card) return 0
    const cardWidth = card.offsetWidth
    const gap = window.innerWidth >= 768 ? 40 : 32
    return cardWidth + gap
  }

  const scrollNext = () => {
    sliderRef.current?.scrollBy({ left: getScrollAmount(), behavior: 'smooth' })
  }

  const scrollPrev = () => {
    sliderRef.current?.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' })
  }

  const openModal = async (project) => {
    setCurrentProject(project)
    setModalOpen(true)
    document.body.classList.add('modal-active')

    try {
      const res = await fetch(`/api/reviews?project_id=${project.id}`, {
        headers: { 'X-Reviewer-ID': reviewerId.current }
      })
      const data = await res.json()
      setModalReviewData(data)
      if (data.userRating) {
        setRating(data.userRating)
        setIsRated(true)
      } else {
        setRating(0)
        setIsRated(false)
      }
    } catch {
      setRating(0)
      setIsRated(false)
      setModalReviewData(null)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
    document.body.classList.remove('modal-active')
  }

  const handleStarClick = async (starValue) => {
    if (isRated || !currentProject || !reviewerId.current) return
    setRating(starValue)
    setIsRated(true)

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Reviewer-ID': reviewerId.current },
        body: JSON.stringify({ project_id: currentProject.id, rating: starValue })
      })
      const data = await res.json()
      if (data.success) {
        setModalReviewData(prev => ({ ...prev, average: data.average, count: data.count, userRating: starValue }))
        setRatingsMap(prev => ({
          ...prev,
          [currentProject.id]: { average: data.average, count: data.count }
        }))
      }
    } catch { /* ignore */ }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalOpen) closeModal()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalOpen])

  const getImages = (val) => val?.split(',').filter(u => u && u !== '-').map(u => u.trim()) || []

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen w-full py-24 px-6 md:px-16 lg:px-24 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="fade-up mb-12 md:mb-16 text-center md:text-left">
          <h2 className="font-paytone text-4xl md:text-6xl text-white mb-4">Selected Projects</h2>
          <div className="w-24 h-1 bg-[#555] mx-auto md:mx-0"></div>
        </div>

        <div className="relative w-full group">
          <button onClick={scrollPrev} className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-gray-700 bg-[#111]/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 hover:bg-black transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] hidden md:flex">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button onClick={scrollNext} className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-gray-700 bg-[#111]/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 hover:bg-black transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] hidden md:flex">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <div ref={sliderRef} id="project-slider" className="flex gap-8 md:gap-10 overflow-x-auto scroll-smooth pb-10 pt-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {error ? (
              <div className="w-full text-center py-20 font-mono text-red-400 font-bold text-xl bg-[#111] border border-red-800 rounded-[2rem]">
                [ERROR] {error}
              </div>
            ) : loading ? (
              <div className="w-full text-center py-20 font-mono text-gray-500 font-bold text-xl animate-pulse">
                [LOADING_ARCHIVES...]
              </div>
            ) : projects.length === 0 ? (
              <div className="w-full text-center py-20 font-mono text-gray-500 font-bold text-xl">
                [NO_PROJECTS_YET]
              </div>
            ) : projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card fade-up cursor-pointer bg-[#111] border border-gray-800 rounded-[2rem] overflow-hidden hover:border-gray-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] w-full md:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.66rem)] flex-none"
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => openModal(project)}
              >
                <div className="w-full h-56 md:h-64 overflow-hidden relative">
                  {(() => {
                    const urls = getImages(project.image_url)
                    if (urls.length > 0) {
                      return <img src={urls[0]} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 card-img" />
                    }
                    return (
                      <div className="absolute inset-0 transition-transform duration-700 card-img" style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #111 100%)' }}>
                        <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-paytone opacity-50 text-2xl transition-opacity card-placeholder">Project {index + 1}</div>
                      </div>
                    )
                  })()}
                </div>
                <div className="p-8">
                  <h3 className="font-paytone text-2xl mb-3 text-gray-200 transition-colors card-title">{project.title}</h3>
                  <p className="text-gray-500 line-clamp-2 text-sm md:text-base transition-colors card-desc mb-4">{project.description}</p>
                  <div className="flex items-center gap-1.5 mb-4">
                    {ratingsMap[project.id] && ratingsMap[project.id].count > 0 ? (
                      <>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s => (
                            <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(ratingsMap[project.id].average) ? 'text-yellow-400 fill-current' : 'text-gray-700'}`} viewBox="0 0 24 24">
                              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-400 font-mono text-xs">{ratingsMap[project.id].average.toFixed(1)}</span>
                        <span className="text-gray-600 font-mono text-xs">({ratingsMap[project.id].count})</span>
                      </>
                    ) : (
                      <span className="text-gray-600 font-mono text-xs">Belum dinilai</span>
                    )}
                  </div>
                  {project.tech_stack && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech_stack.split(',').map((tech, idx) => (
                        <span key={idx} className="text-[10px] font-mono font-bold text-gray-400 border border-gray-700 bg-[#1a1a1a] px-3 py-1 rounded-full uppercase tracking-wider">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 flex items-center text-sm font-bold tracking-wider text-gray-600 transition-colors uppercase card-cta">
                    View Details
                    <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 card-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && currentProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer animate-[fadeIn_0.5s_ease-out]" onClick={closeModal}></div>
          <div className="relative z-10 w-full max-w-4xl bg-[#0a0a0a] border border-gray-700 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl animate-[modalIn_0.5s_cubic-bezier(0.23,1,0.32,1)]">
            <button onClick={closeModal} className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 bg-black/50 hover:bg-white text-gray-400 hover:text-black rounded-full flex items-center justify-center transition-all z-20 backdrop-blur-sm group">
              <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="flex flex-col md:flex-row w-full max-h-[85vh] overflow-y-auto md:overflow-hidden">
              <div className="w-full md:w-1/2 shrink-0 md:overflow-y-auto md:max-h-[85vh] bg-[#0a0a0a]">
                {(() => {
                  const urls = getImages(currentProject.image_url)
                  if (urls.length > 0) {
                    return urls.map((url, i) => (
                      <img key={i} src={url} alt={`${currentProject.title} ${i + 1}`} className="w-full h-auto block" />
                    ))
                  }
                  return (
                    <div className="w-full min-h-[300px] flex items-center justify-center">
                      <span className="text-gray-600 font-paytone text-3xl">Project Preview</span>
                    </div>
                  )
                })()}
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col bg-[#0a0a0a] md:overflow-y-auto">
                <div className="w-16 h-1 bg-white mb-6 shrink-0"></div>
                <h2 className="font-paytone text-3xl md:text-5xl text-white mb-6 leading-tight">{currentProject.title}</h2>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 flex-grow">{currentProject.description}</p>

                {currentProject.tech_stack && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentProject.tech_stack.split(',').map((tech, idx) => (
                      <span key={idx} className="text-[10px] font-mono font-bold text-gray-400 border border-gray-700 bg-[#1a1a1a] px-3 py-1 rounded-full uppercase tracking-wider">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-4 mb-8">
                  {currentProject.live_url && currentProject.live_url !== '-' && (
                    <a href={currentProject.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm">Visit Project</a>
                  )}
                  {currentProject.github_url && currentProject.github_url !== '-' && (
                    <a href={currentProject.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-[#111] text-white font-bold rounded-full border border-gray-700 hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 100.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>

                <div className="border-t border-gray-800 pt-6">
                  {modalReviewData && modalReviewData.count > 0 && (
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-800">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => {
                          const fill = Math.min(100, Math.max(0, (modalReviewData.average - (s - 1)) * 100))
                          return (
                            <div key={s} className="relative w-6 h-6">
                              <svg className="absolute inset-0 w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                              </svg>
                              <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
                                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                </svg>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <span className="text-gray-300 font-paytone text-lg">{modalReviewData.average.toFixed(1)}</span>
                      <span className="text-gray-500 font-mono text-sm">({modalReviewData.count} suara)</span>
                    </div>
                  )}

                  <p className="text-gray-400 text-sm mb-3">Nilai proyek ini:</p>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1 cursor-pointer">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          onClick={() => handleStarClick(star)}
                          onMouseEnter={() => !isRated && setRating(star)}
                          onMouseLeave={() => !isRated && setRating(0)}
                          className={`w-8 h-8 transition-colors duration-200 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-700'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                  {isRated && (
                    <p className="text-green-500 font-bold text-sm mt-3 animate-[fadeIn_0.3s_ease-out]">
                      &check; Terima kasih! Anda memberi {rating} bintang.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .project-card:hover .card-img {
          transform: scale(1.1);
        }
        .project-card:hover .card-placeholder {
          opacity: 1;
        }
        .project-card:hover .card-title {
          color: white;
        }
        .project-card:hover .card-desc {
          color: #9ca3af;
        }
        .project-card:hover .card-cta {
          color: white;
        }
        .project-card:hover .card-arrow {
          transform: translateX(0.5rem);
        }
      `}</style>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(32px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </section>
  )
}
