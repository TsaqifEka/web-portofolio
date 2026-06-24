import './globals.css'
import ParticlesBackground from './components/ParticlesBackground'

export const metadata = {
  title: 'Tsaqif Eka - Portfolio',
  description: 'Portfolio of Tsaqif Eka - Full-stack Developer',
  icons: {
    icon: [
      { url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="%23000"/><text x="16" y="22" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="18" fill="%23fff">TE</text></svg>', type: 'image/svg+xml' }
    ]
  },
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