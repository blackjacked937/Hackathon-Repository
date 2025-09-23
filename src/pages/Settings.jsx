import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { BarChart3, FileText, Settings as SettingsIcon, Activity, Users, TrendingUp } from "lucide-react";

const BBVALogo = () => <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12.23 8.24h-1.8L8.26 16h2.2l.4-1.23h2.38l.4 1.23h2.18l-2.13-7.76zm-1.07 5.05l.7-2.19.7 2.19h-1.4zM4 8.24h3.45c1.47 0 2.44.88 2.44 2.13 0 1.07-.76 1.76-1.83 1.94l1.97 3.69h-2.4l-1.8-3.51H5.8v3.51H4V8.24zm1.8 2.87h1.12c.5 0 .82-.3.82-.71 0-.42-.32-.68-.82-.68H5.8v1.39zm11.36 1.13c0-1.79-1.13-2.9-2.88-2.9-1.74 0-2.88 1.12-2.88 2.9 0 1.78 1.14 2.9 2.88 2.9 1.75 0 2.88-1.12 2.88-2.9zm-3.97 0c0-.88.5-1.42 1.09-1.42s1.09.54 1.09 1.42c0 .88-.5 1.42-1.09 1.42s-1.09-.54-1.09-1.42z" /></svg>;
const PayPalLogo = () => <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M8.33 22.38H5.03l2.81-17.52H11.2c4.13 0 6.54 2.15 5.86 6.31-.4 2.47-2.32 4-4.82 4H9.41l-1.08 7.27zm1.19-11.23h1.7c1.78 0 2.92-1.03 3.25-2.65.4-1.93-.72-3.14-2.52-3.14h-2.1l-.33 5.79z"/></svg>;
const BancoAztecaLogo = () => <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5L12 2zm0 6.24L4.53 12 12 15.76 19.47 12 12 8.24zM2 17l10 5 10-5-10-5-10 5z"/></svg>;
const ChaseLogo = () => <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-4-8a4 4 0 118 0 4 4 0 01-8 0z"/></svg>;
const HSBCLogo = () => <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.45L18.65 8v8L12 19.55 5.35 16V8L12 4.45zM12 9l-4 2 4 2 4-2-4-2z"/></svg>;
const StripeLogo = () => <svg className="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12.92 14.23h-4.3v-2.11h4.3c1 0 1.76-.79 1.76-1.79s-.76-1.79-1.76-1.79h-6.1v10.19h6.21c1.89 0 3.42-1.57 3.42-3.51s-1.53-3.5-3.53-3.5zM4 4h16v2H4z"/></svg>;
const CheckIcon = () => <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>;
const LinkIcon = () => <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>;

export default function Settings() {
  const [name, setName] = useState('Juan Pérez');
  const [email, setEmail] = useState('juan.perez@ejemplo.com');
  const [language, setLanguage] = useState('es');
  const [currency, setCurrency] = useState('MXN');
  
  const paymentMethods = [
    { name: 'BBVA', logo: <BBVALogo />, linked: true },
    { name: 'PayPal', logo: <PayPalLogo />, linked: true },
    { name: 'Banco Azteca', logo: <BancoAztecaLogo />, linked: false },
    { name: 'Stripe', logo: <StripeLogo />, linked: true },
    { name: 'Chase', logo: <ChaseLogo />, linked: false },
    { name: 'HSBC', logo: <HSBCLogo />, linked: true },
  ];

  return (
    <div className="flex min-h-screen bg-[#0d111e]">
      {/* Sidebar */}
       <aside className="w-64 bg-black/20 backdrop-blur-md border-r border-gray-700/50 p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-white">Pay4all</h2>
          <p className="text-sm text-gray-400">Panel de control</p>
        </div>
        <nav className="space-y-2 flex-1">
          <Link to="/dashboard" className="flex items-center px-3 py-3 rounded-xl hover:bg-blue-600/30 active:bg-blue-600/40 text-white transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
            <BarChart3 className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link to="/history" className="flex items-center px-3 py-3 rounded-xl hover:bg-blue-600/30 text-gray-300 transition-all duration-200 shadow-sm hover:shadow-md">
            <FileText className="w-5 h-5 mr-3" /> Historial
          </Link>
          <Link to="/settings" className="flex items-center px-3 py-3 rounded-xl hover:bg-blue-600/30 text-gray-300 transition-all duration-200 shadow-sm hover:shadow-md">
            <SettingsIcon className="w-5 h-5 mr-3" /> Configuración
          </Link>
          <Link to="/new-charge" className="flex items-center px-3 py-3 rounded-xl hover:bg-blue-600/30 text-gray-300 transition-all duration-200 shadow-sm hover:shadow-md">
            <TrendingUp className="w-5 h-5 mr-3" /> Nuevo Cobro
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-700/50">
          <Link to="/login" className="flex items-center px-3 py-2 rounded-lg hover:bg-red-600/30 text-gray-400 hover:text-red-300 transition-colors">
            Cerrar Sesión
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Configuración del Comerciante</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Perfil */}
          <div className="bg-black/20 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Perfil</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nombre</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-900/50 border rounded-lg py-2 px-3 text-white"/>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Correo Electrónico</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-900/50 border rounded-lg py-2 px-3 text-white"/>
              </div>
            </div>
          </div>

          {/* Métodos de pago */}
          <div className="bg-black/20 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Métodos de Cobro</h2>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {paymentMethods.map(method => (
                <div key={method.name} className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    {method.logo}
                    <span className="font-semibold text-gray-200">{method.name}</span>
                  </div>
                  {method.linked ? <CheckIcon /> : <LinkIcon />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6 text-right">
          <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg">Guardar Cambios</button>
        </div>
      </main>
    </div>
  );
}
