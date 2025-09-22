import React, { useState, useEffect } from 'react';
import { ArrowRight, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.png'; // Asegúrate de tener tu logo en esta ruta

export default function Main() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(0);
  const navigate = useNavigate();

  const skills = [
    'Realiza transacciones',
    'Obtén analíticas en tiempo real',
    'Realiza pagos mixtos'
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [skills.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d111e] to-[#1a1f2e] text-gray-200 flex flex-col">
      
      {/* Header simple */}
      <header className="flex justify-between items-center p-8 md:p-12 border-b border-gray-700/50">
        <div className={`text-xl font-semibold transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          Paynoir
        </div>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" /> Cerrar Sesión
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-8 md:px-12">
  <div className={`max-w-5xl w-full flex flex-col md:flex-row items-center md:items-stretch gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
    
    {/* Logo a la izquierda */}
    <div className="flex-1 flex items-center justify-center">
      <img 
        src={logoImage} 
        alt="Logo Paynoir" 
        className="w-40 h-40 md:w-60 md:h-60 object-contain animate-fadeIn" 
      />
    </div>

    {/* Información a la derecha */}
    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
      <h1 className="text-4xl md:text-6xl font-light mb-4 leading-tight">
        <span className="block text-gray-500">Bienvenido!</span>
        <span className="block font-semibold text-white">Christian</span>
      </h1>

      <p className="text-xl md:text-2xl text-gray-400 mb-6">
        <span 
          key={currentSkill}
          className="font-medium text-blue-300 transition-all duration-500 inline-block"
          style={{ animation: 'fadeInUp 0.5s ease-out' }}
        >
          {skills[currentSkill]}
        </span>
      </p>

      <button
        onClick={() => navigate('/dashboard')}
        className="group flex items-center justify-center px-8 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-all duration-300 hover:scale-105 border border-blue-600/30"
      >
        <span>Ir al Dashboard</span>
        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  </div>
</main>


      <footer className="text-center p-8 text-sm text-gray-500 border-t border-gray-700/50">
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          © 2025 Mi App Dashboard
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
