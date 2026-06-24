import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import CertificatesSection from './components/CertificatesSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}