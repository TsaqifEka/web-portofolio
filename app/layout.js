import './globals.css'
import ParticlesBackground from './components/ParticlesBackground'

export const metadata = {
  title: 'Tsaqif Eka - Portfolio',
  description: 'Portfolio of Tsaqif Eka - Full-stack Developer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pavanam&family=Paytone+One&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-gray-700 selection:text-white">
        <ParticlesBackground />
        {children}
      </body>
    </html>
  )
}