import { createClient } from '@supabase/supabase-js';

// Setup Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Home() {
  // Fetch data
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-10 text-red-500 font-mono text-center">System Error: {error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-black text-gray-300 font-sans relative overflow-hidden selection:bg-blue-600 selection:text-white">
      
      {/* Background effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-cyan-900/10 blur-[100px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-5xl mx-auto pt-32 pb-20 px-6 sm:px-8 border-b border-white/10">
        <div className="inline-block border border-blue-500/30 bg-blue-900/20 px-3 py-1 mb-6">
          <span className="font-mono text-blue-400 text-xs tracking-widest uppercase shadow-blue-500/50 drop-shadow-md">
            System Online //
          </span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-white mb-6 uppercase">
          Tsaqif<span className="text-blue-500">_</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed font-light">
          Eksplorasi arsitektur sistem dan ruang siber. Terbiasa merangkai logika di balik layar, dari baris perintah hingga implementasi nyata.
          <span className="inline-block w-2.5 h-6 ml-2 bg-blue-500 animate-pulse align-middle"></span>
        </p>
      </header>

      {/* Projects */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-20">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-xl font-mono text-white tracking-widest uppercase">Projects</h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-blue-500/50 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative bg-zinc-950 border border-white/10 hover:border-blue-500/60 transition-all duration-300 flex flex-col rounded-none shadow-[0_0_0_rgba(59,130,246,0)] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* Thumbnail */}
              <div className="h-48 bg-zinc-900 relative border-b border-white/5 overflow-hidden">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-gray-700 uppercase tracking-widest">
                    [ No Image Data ]
                  </div>
                )}
              </div>

              {/* Content body */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                   <span className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.2em]">
                     {project.category}
                   </span>
                </div>
                
                <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h2>
                
                <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech stack */}
                <div className="mt-auto">
                  <div className="mb-6 flex flex-wrap gap-2">
                     {project.tech_stack.split(',').map((tech, idx) => (
                       <span key={idx} className="text-[11px] font-mono text-gray-500 border border-zinc-800 bg-zinc-950 px-2 py-1 uppercase tracking-wider">
                         {tech.trim()}
                       </span>
                     ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-6 pt-5 border-t border-white/5">
                    {project.github_url && project.github_url !== '-' && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="text-xs font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
                        <span>[</span> Repo <span>]</span>
                      </a>
                    )}
                    {project.live_url && project.live_url !== '-' && (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="text-xs font-mono text-blue-500 hover:text-blue-300 transition-colors uppercase tracking-widest flex items-center gap-2">
                        <span>[</span> Deploy <span>]</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10 flex justify-center">
        <p className="font-mono text-[10px] text-gray-600 uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} // Connection Secure
        </p>
      </footer>
    </main>
  );
}