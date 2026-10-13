import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function LksFooterNav() {
  return (
    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <span className="text-slate-500 font-medium text-[11px]">
          Outlet Selesai Dimonitor: <strong className="text-slate-800">1 dari 4 Toko Hari Ini</strong>
        </span>
        <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full w-1/4"></div>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <button className="flex items-center gap-1 border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-md font-semibold text-slate-700 transition">
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Kunjungan Sebelumnya</span>
        </button>

        <button className="flex items-center gap-1 bg-rose-900 hover:bg-rose-950 text-white px-3 py-1.5 rounded-md font-semibold transition">
          <span>Kunjungan Berikutnya: Pangkalan Jaya</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}