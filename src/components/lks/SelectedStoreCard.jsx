import { Store } from 'lucide-react';

export default function SelectedStoreCard() {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-rose-900 text-white flex items-center justify-center shrink-0">
          <Store className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-500 font-bold">CUST NO: 1000015851</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded">
              AREA JAKARTA TL4B
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">H. HOTIB MOTOR</h2>
          <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
            <span>Salesman: <strong className="text-slate-800">ANGGA JUANSYAH</strong></span>
            <span>Circle PIC: <strong className="text-slate-800">Seno Aji Sobirin</strong></span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100 w-full md:w-auto justify-between">
        <div className="text-left pr-4 border-r border-slate-200">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">CREDIT LIMIT STATUS</p>
          <p className="text-xs text-slate-600">Sisa Limit: <strong className="text-emerald-600 text-sm font-bold">Rp 12.474.801</strong></p>
          <p className="text-[10px] text-slate-400">Plafon Total: Rp 20.000.000</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Status Akun</p>
          <span className="inline-block px-2 py-0.5 bg-emerald-600 text-white font-bold text-[10px] rounded mt-0.5">
            ACTIVE
          </span>
          <p className="text-[10px] text-slate-500 mt-0.5">Plafon Aman (62.3%)</p>
        </div>
      </div>
    </div>
  );
}