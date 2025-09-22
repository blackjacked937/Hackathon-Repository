import React from "react";
import { Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { BarChart3, FileText, Settings as SettingsIcon, Activity, Users, TrendingUp } from "lucide-react";

const dataLine = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 300 },
  { name: "Mar", uv: 500 },
  { name: "Apr", uv: 200 },
  { name: "May", uv: 600 },
];

const dataPie = [
  { name: "Ventas", value: 400 },
  { name: "Suscripciones", value: 300 },
  { name: "Soporte", value: 300 },
];

const COLORS = ["#3b82f6", "#1e3a8a", "#60a5fa"];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0d111e] to-[#1a1f2e] text-gray-200 font-sans">
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
        <header className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Bienvenido al Dashboard</h1>
              <p className="text-gray-400">Resumen de actividad y métricas clave</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-300 transition-colors border border-blue-600/30">
                Actualizar
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-black/20 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300 group">
            <div className="flex items-center mb-6">
              <Activity className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Actividad Mensual</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataLine}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.5} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#111827", border: "none", borderRadius: "8px", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }} labelStyle={{ color: "#9ca3af" }} />
                <Line type="monotone" dataKey="uv" stroke="#3b82f6" strokeWidth={3} dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, stroke: "#1e3a8a", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-black/20 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300 group">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Distribución de Ingresos</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={dataPie} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={5} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} stroke="#374151" strokeWidth={1}>
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#111827", border: "none", borderRadius: "8px", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }} labelStyle={{ color: "#9ca3af" }} />
                <Legend wrapperStyle={{ color: "#9ca3af", fontSize: "12px" }} iconType="circle" iconSize={10} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-black/20 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-white mb-1">Usuarios Activos</h3>
            <p className="text-2xl font-bold text-blue-400">1,234</p>
          </div>
          <div className="bg-black/20 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-white mb-1">Crecimiento</h3>
            <p className="text-2xl font-bold text-green-400">+12%</p>
          </div>
          <div className="bg-black/20 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow">
            <Activity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-white mb-1">Tareas Pendientes</h3>
            <p className="text-2xl font-bold text-purple-400">56</p>
          </div>
        </div>
      </main>
    </div>
  );
}
