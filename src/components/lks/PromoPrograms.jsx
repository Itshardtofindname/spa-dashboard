import { Lock } from 'lucide-react';

export default function PromoPrograms() {
  return (
    <div className="space-y-4 text-xs">
      {/* Program Tactical */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-700 text-white p-2.5 flex justify-between items-center">
          <span className="font-bold">Program Tactical</span>
          <span className="text-[9px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">Aug - Sep 2026</span>
        </div>
        <div className="p-3 space-y-2">
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="text-slate-400 uppercase text-[9px] border-b pb-1">
                <th>L2</th>
                <th className="text-center">TARGET</th>
                <th className="text-center">ACH</th>
                <th className="text-center">% BAL</th>
                <th className="text-right">REWARD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="py-1 font-bold">ATI</td>
                <td className="text-center">50</td>
                <td className="text-center text-slate-400">-</td>
                <td className="text-center text-rose-600 font-bold">0% 50</td>
                <td className="text-right text-rose-600 font-bold">2% (134.737)</td>
              </tr>
              <tr>
                <td className="py-1 font-bold">ATU</td>
                <td className="text-center">-</td>
                <td className="text-center text-slate-400">-</td>
                <td className="text-center text-slate-400">-</td>
                <td className="text-right text-slate-400">0%</td>
              </tr>
              <tr>
                <td className="py-1 font-bold">CCO</td>
                <td className="text-center">-</td>
                <td className="text-center text-slate-400">-</td>
                <td className="text-center text-slate-400">-</td>
                <td className="text-right text-slate-400">0%</td>
              </tr>
            </tbody>
          </table>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center font-bold">
            <span className="text-slate-600">Total Estimasi Reward:</span>
            <span className="text-slate-900 text-sm">Rp 134.737</span>
          </div>
        </div>
      </div>

      {/* Program Triwulan */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-700 text-white p-2.5 flex justify-between items-center">
          <span className="font-bold">Program Triwulan</span>
          <span className="text-[9px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">Jul - Sep 2026</span>
        </div>
        <div className="p-3 space-y-2">
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="text-slate-400 uppercase text-[9px] border-b pb-1">
                <th>L2</th>
                <th className="text-center">TARGET</th>
                <th className="text-center">ACH</th>
                <th className="text-center">% BAL</th>
                <th className="text-right">REWARD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="py-1 font-bold">ATI</td>
                <td className="text-center">300</td>
                <td className="text-center text-slate-400">-</td>
                <td className="text-center text-rose-600 font-bold">0% 300</td>
                <td className="text-right text-rose-600 font-bold">2.5% (216.747)</td>
              </tr>
              <tr>
                <td className="py-1 font-bold">ATU</td>
                <td className="text-center">200</td>
                <td className="text-center text-slate-400">-</td>
                <td className="text-center text-rose-600 font-bold">0% 200</td>
                <td className="text-right text-slate-400">0.5%</td>
              </tr>
            </tbody>
          </table>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center font-bold">
            <span className="text-slate-600">Total Reward Triwulan:</span>
            <span className="text-slate-900 text-sm">Rp 216.747</span>
          </div>
        </div>
      </div>

      {/* Program Tahunan Toko */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-rose-950 text-white p-2.5 flex justify-between items-center">
          <span className="font-bold">Program Tahunan Toko</span>
          <span className="text-[9px] bg-rose-900 px-2 py-0.5 rounded text-rose-200">Feb 26 - Jan 27</span>
        </div>
        <div className="p-3 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-slate-50 p-2 rounded border border-slate-100">
              <p className="text-[9px] text-slate-400 font-bold uppercase">TARGET OMZET</p>
              <p className="font-bold text-slate-900 text-sm">Rp 750.000.000</p>
            </div>
            <div className="bg-emerald-50 p-2 rounded border border-emerald-100">
              <p className="text-[9px] text-emerald-600 font-bold uppercase">REALISASI (ACH 8%)</p>
              <p className="font-bold text-emerald-700 text-sm">Rp 58.657.619</p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-500 font-medium">
              <span>Progres Akumulatif (8% / 100%)</span>
              <span>Sisa GAP: <strong className="text-rose-600">Rp 691.342.381</strong></span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-rose-900 h-full w-[8%]"></div>
            </div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase">QUALIFIED REWARD</p>
              <p className="font-bold text-slate-800 text-xs">1 TIKET TOUR WISATA SPA</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-200 px-2 py-1 rounded text-[10px] font-bold text-slate-600">
              <Lock className="w-3 h-3 text-slate-500" />
              <span>LOCK REWARD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}