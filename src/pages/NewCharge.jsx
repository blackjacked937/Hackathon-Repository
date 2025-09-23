import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { BarChart3, FileText, Settings as SettingsIcon, Activity, Users, TrendingUp } from "lucide-react";


export default function NewCharge() {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Efectivo');
  const [description, setDescription] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:4000/api/new-charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        method,
        description,
        receiverWalletUrl: "https://ilp.interledger-test.dev/pruebalma"
      }),
    });
    const data = await res.json();

    if (data.interactUrl) {
      window.open(data.interactUrl, "_blank");
      alert("Se ha creado el cobro. Confirma el pago en la ventana que se abrió.");
    } else {
      alert("Cobro creado, pero no se pudo generar URL de interacción.");
    }

    setAmount("");
    setMethod("Efectivo");
    setDescription("");

  } catch (err) {
    console.error(err);
    alert("Error al crear cobro: " + err.message);
  }
};


  return (
    <div className="flex min-h-screen bg-[#0d111e] text-gray-200 font-sans">
      {/* Sidebar */}
       <aside className="w-64 bg-black/20 backdrop-blur-md border-r border-gray-700/50 p-6 flex flex-col">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2 text-white">Paynoir</h2>
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
        <div className="max-w-lg mx-auto bg-black/20 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-white mb-6">Crear Nuevo Cobro</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Monto (MXN)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-gray-900/50 border rounded-lg py-2 px-3 text-white"/>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Método de pago</label>
              <select value={method} onChange={e => setMethod(e.target.value)} className="w-full bg-gray-900/50 border rounded-lg py-2 px-3 text-white">
                <option value="Efectivo">Efectivo</option>
                <option value="Digital">Digital</option>
                <option value="Mixto">Mixto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Descripción</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-gray-900/50 border rounded-lg py-2 px-3 text-white"/>
            </div>

            <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">Crear Cobro</button>
          </form>
        </div>
      </main>
    </div>
  );
}
