import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { BarChart3, FileText, Settings as SettingsIcon, Activity, Users, TrendingUp } from "lucide-react";


const CashIcon = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>);
const DigitalIcon = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>);
const MixedIcon = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>);

const monthlyTransactions = [
  { id: 1, date: '15 Sep 2025', amount: '125.50', method: 'Mixto' },
  { id: 2, date: '15 Sep 2025', amount: '80.00', method: 'Digital' },
  { id: 3, date: '14 Sep 2025', amount: '30.00', method: 'Efectivo' },
  { id: 4, date: '14 Sep 2025', amount: '250.20', method: 'Digital' },
  { id: 5, date: '13 Sep 2025', amount: '95.75', method: 'Mixto' },
  { id: 6, date: '12 Sep 2025', amount: '50.00', method: 'Efectivo' },
  { id: 7, date: '11 Sep 2025', amount: '110.00', method: 'Digital' },
];

const weeklyTransactions = monthlyTransactions.slice(0, 5);
const dailyTransactions = monthlyTransactions.slice(0, 2);

export default function History() {
  const [activeFilter, setActiveFilter] = useState('Mes');
  const filters = ['Día', 'Semana', 'Mes'];

  let displayedTransactions = [];
  switch (activeFilter) {
    case 'Día': displayedTransactions = dailyTransactions; break;
    case 'Semana': displayedTransactions = weeklyTransactions; break
    default: displayedTransactions = monthlyTransactions; break;
  }

  const getMethodIcon = (method) => {
    if (method === 'Efectivo') return <CashIcon />;
    if (method === 'Digital') return <DigitalIcon />;
    if (method === 'Mixto') return <MixedIcon />;
  };

  return (
    <div className="flex min-h-screen bg-[#0d111e] text-gray-200 font-sans">
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
        <div className="max-w-2xl mx-auto bg-black/20 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Historial de Transacciones</h1>
            <div className="flex items-center bg-gray-900/50 border rounded-lg p-1 space-x-1">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold ${
                    activeFilter === filter ? 'bg-blue-600 text-white' : 'text-gray-400'
                  } transition-colors`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-3">
            {displayedTransactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between bg-gray-900/50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-400">{tx.date}</div>
                <div className="text-lg font-bold text-white">${tx.amount}</div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  {getMethodIcon(tx.method)}
                  <span>{tx.method}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
