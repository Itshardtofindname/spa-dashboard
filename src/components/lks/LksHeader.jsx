import { Download, RefreshCw, Calendar } from 'lucide-react';

export default function LksHeader() {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-2 py-0.5 bg-rose-900 text-white font-bold text-[9px] rounded uppercase tracking-wider">
          MODUL OPERASIONAL LAPANGAN
        </span>
        <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          Sinkronisasi Real-Time BOSNET & SAP
        </span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            LKS — Lembar Kerja Salesman
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoring Target, Realisasi Penjualan, Matriks SKU & Program Promosi Per Toko
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-md text-xs font-medium text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Periode: <strong className="text-slate-900">Oktober 2026 (Oct-26)</strong></span>
          </div>

          <button className="flex items-center gap-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md text-xs font-semibold transition">
            <Download className="w-3.5 h-3.5" />
            <span>Export LKS</span>
          </button>

          <button className="flex items-center gap-1.5 bg-rose-900 hover:bg-rose-950 text-white px-3.5 py-1.5 rounded-md text-xs font-semibold shadow-sm transition">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Input / Sync Order Toko</span>
          </button>
        </div>
      </div>
    </div>
  );
}