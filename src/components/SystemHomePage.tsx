
const SystemErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f4f7f9] font-sans text-[#333] p-5 text-center">
      {/* Animation du Loader via Tailwind (animate-spin) */}
      <style>
        {`
          @keyframes slow-fade {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
          .animate-slow-fade {
            animation: slow-fade 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Code Erreur */}
      <p className="text-[120px] font-extrabold m-0 text-slate-300 tracking-tighter leading-none">
        503
      </p>

      {/* Titre du Statut */}
      <h1 className="text-2xl font-semibold -mt-5 mb-4 text-slate-600">
        Service Temporarily Unavailable
      </h1>

      {/* Séparateur */}
      <div className="w-16 h-[2px] bg-slate-200 my-6"></div>

      {/* Message Technique */}
      <p className="max-w-[500px] leading-relaxed text-slate-500 text-base">
        The server is temporarily unable to service your request due to maintenance downtime or capacity problems. 
        <br />
        <span className="font-bold text-slate-400 mt-2 block text-sm italic">
          Internal Reference: Core-Infrastructure-Link-Error
        </span>
      </p>

      {/* Loader discret */}
      <div className="mt-8 w-10 h-10 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
      
      {/* Footer Technique - Version Engine */}
      <div className="mt-12 opacity-50 flex flex-col items-center gap-1">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
          CloudNode Edge Engine v4.2.1
        </p>
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            <p className="text-[10px] font-mono text-slate-400">Cluster ID: 0xf2a88</p>
        </div>
      </div>
    </div>
  );
};

export default SystemErrorPage;