import { useState } from 'react';
import logoImg from '../assets/logo.png';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi sederhana (atau sesuaikan dengan kredensial yang diinginkan)
    if (username.trim() && password.trim()) {
      onLogin({ username, name: "Seno Aji Sobirin", npk: "1584" });
    } else {
      setError('Mohon masukkan Username dan Password dengan benar.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 space-y-6">
        
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-44 items-center justify-center overflow-hidden">
            <img src={logoImg} alt="SPA Logo" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900">Sales Performance Assistance</h1>
          <p className="text-xs text-slate-500">Silakan login untuk mengakses sistem monitoring & dashboard.</p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-lg font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Username / NPK</label>
            <input 
              type="text"
              placeholder="Contoh: NPK1584 atau admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <input 
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#8B0E48] hover:bg-[#740b3c] text-white py-2.5 rounded-lg text-xs font-bold shadow-md transition active:scale-95"
          >
            🔒 Masuk ke Sistem
          </button>
        </form>

        <div className="text-center text-[10px] text-slate-400">
          Salesforce Performance Assistance System V2.6 &copy; 2026
        </div>

      </div>
    </div>
  );
}