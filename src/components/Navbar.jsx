import { useState } from 'react';
import logoImg from '../assets/logo.png';
import { monthList, yearList } from '../data/dataSales';

export default function Navbar({ salesmanData, onLogout }) {
  const [selectedMonth, setSelectedMonth] = useState(monthList[8] || "SEPTEMBER");
  const [selectedYear, setSelectedYear] = useState(yearList[2] || "2026");

  return (
    <header className="sticky top-0 z-50 w-full bg-[#94ABDE] shadow-sm">
      <div className="mx-auto flex min-h-[64px] max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        
        {/* LEFT - Logo & Brand */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-36 shrink-0 items-center justify-center overflow-hidden">
            <img src={logoImg} alt="SPA Logo" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-wide text-black">SPA</span>
            </div>
            <p className="hidden truncate text-xs text-black sm:block">
              Salesforce Performance Assistance System
            </p>
          </div>
        </div>

        {/* RIGHT - Controls & Profile */}
        <div className="flex shrink-0 items-center gap-3">

          {/* Period Dropdowns */}
          <div className="hidden items-center gap-1.5 rounded-lg border border-slate-400 bg-white/50 px-2.5 py-1.5 text-xs text-black md:flex">
            <span className="font-bold mr-1">Periode:</span>
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent font-semibold text-black focus:outline-none cursor-pointer"
            >
              {monthList.map((m, idx) => (
                <option key={idx} value={m}>{m}</option>
              ))}
            </select>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent font-semibold text-black focus:outline-none cursor-pointer"
            >
              {yearList.map((y, idx) => (
                <option key={idx} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Export PDF */}
          <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
            </svg>
            <span className="hidden sm:inline">Export PDF</span>
          </button>

          {/* Profile & Logout Trigger */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-400">
            <button 
              onClick={onLogout}
              className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm cursor-pointer hover:bg-red-600 transition" 
              title="Klik untuk Keluar (Logout)"
            >
              {salesmanData?.identity?.nama ? salesmanData.identity.nama.charAt(0) : "G"}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}