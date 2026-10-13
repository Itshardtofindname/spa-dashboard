export default function RegionalTargetTable() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden text-xs">
      <div className="bg-slate-800 text-white p-3 flex justify-between items-center flex-wrap gap-2">
        <span className="font-bold uppercase tracking-wider text-xs">
          MONITORING DASHBOARD TOKO VS TARGET REGIONAL
        </span>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="bg-slate-700 px-2 py-0.5 rounded text-slate-200">Kode Wilayah: 5080 THS</span>
          <span className="bg-slate-700 px-2 py-0.5 rounded text-slate-200">Tanggal Cut-Off: 08/10/2026</span>
          <span className="bg-slate-700 px-2 py-0.5 rounded text-slate-200 font-bold text-amber-300">PERIODE: OCT-26</span>
          <span className="bg-emerald-600 px-2 py-0.5 rounded text-white font-bold">LIVE TELEMETRY</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px]">
              <th className="p-2.5">KATEGORI MONITORING</th>
              <th className="p-2.5 text-right">TARGET OCT-26</th>
              <th className="p-2.5 text-right">ACH OCT-26</th>
              <th className="p-2.5 text-center">% ACH BULANAN</th>
              <th className="p-2.5 text-right bg-amber-50">TGT CUT-OFF (08/10/26)</th>
              <th className="p-2.5 text-right">ACH HARIAN</th>
              <th className="p-2.5 text-center">% ACH HARIAN</th>
              <th className="p-2.5 text-center">GAP / PROGRES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
            <tr>
              <td className="p-2.5 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-rose-800 rounded-sm"></span>
                TGT TOKO [H. HOTIB MOTOR]
              </td>
              <td className="p-2.5 text-right font-bold">Rp 6.805.000</td>
              <td className="p-2.5 text-right text-slate-400">-</td>
              <td className="p-2.5 text-center text-slate-400">0%</td>
              <td className="p-2.5 text-right bg-amber-50 font-bold">Rp 2.722.000</td>
              <td className="p-2.5 text-right text-slate-400">-</td>
              <td className="p-2.5 text-center text-slate-400">0%</td>
              <td className="p-2.5 text-center">
                <div className="w-16 bg-slate-200 h-1.5 rounded-full mx-auto overflow-hidden">
                  <div className="bg-slate-400 h-full w-0"></div>
                </div>
              </td>
            </tr>
            <tr className="bg-slate-50/50">
              <td className="p-2.5 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-600 rounded-sm"></span>
                TGT TOTAL REGIONAL 5080
              </td>
              <td className="p-2.5 text-right font-bold">Rp 657.533.050</td>
              <td className="p-2.5 text-right font-bold text-emerald-600">Rp 159.124.235</td>
              <td className="p-2.5 text-center">
                <span className="px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded font-bold text-[10px]">24%</span>
              </td>
              <td className="p-2.5 text-right bg-amber-50 font-bold">Rp 23.733.782</td>
              <td className="p-2.5 text-right text-slate-400">Rp 0</td>
              <td className="p-2.5 text-center text-slate-400">0%</td>
              <td className="p-2.5 text-center">
                <div className="w-16 bg-slate-200 h-1.5 rounded-full mx-auto overflow-hidden">
                  <div className="bg-slate-800 h-full w-1/4"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}