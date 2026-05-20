import './globals.css';

export const metadata = {
  title: 'Tsaqif_ | Web & IoT Explorer',
  description: 'Portofolio Tsaqif Eka Putra',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-[#0D0D0D] text-white antialiased">
        {children}
      </body>
    </html>
  );
}