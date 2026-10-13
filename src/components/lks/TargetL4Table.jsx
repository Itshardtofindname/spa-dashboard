const l4Data = [
  { sku: '11-GTZ-5SMF (Astra Battery)', avg25: 1, avg26: 1, sdw: '-', tgt: 3, status: 'UP-SELLING', color: 'bg-rose-100 text-rose-800' },
  { sku: '11-GTZ-6VMF', avg25: 1, avg26: '-', sdw: '-', tgt: '-', status: 'UP-SELLING', color: 'bg-rose-100 text-rose-800' },
  { sku: 'TUBELESS MATIC (High Volume)', avg25: 15, avg26: 27, sdw: '-', tgt: 34, status: 'UP-SELLING FOCUS', color: 'bg-rose-900 text-white font-bold' },
  { sku: 'TUBETYPE INC', avg25: '-', avg26: '-', sdw: '-', tgt: '-', status: 'STANDARD', color: 'bg-slate-100 text-slate-700' },
  { sku: 'BAN DALAM MATIC', avg25: 2, avg26: '-', sdw: '-', tgt: 15, status: 'UP-SELLING', color: 'bg-rose-100 text-rose-800' },
  { sku: 'BAN DALAM BEBEK', avg25: 2, avg26: '-', sdw: '-', tgt: 15, status: 'UP-SELLING', color: 'bg-rose-100 text-rose-800' },
  { sku: 'TUBELESS BEBEK', avg25: 2, avg26: 3, sdw: '-', tgt: 4, status: 'UP-SELLING', color: 'bg-rose-100 text-rose-800' },
  { sku: 'TUBETYPE MATIC', avg25: 1, avg26: '-', sdw: '-', tgt: 1, status: 'UP-SELLING', color: 'bg-rose-100 text-rose-800' },
  { sku: 'OLI MESIN ASPIRA (OA2)', avg25: '-', avg26: '-', sdw: '-', tgt: '-', status: 'CROSS-SELLING', color: 'bg-slate-100 text-slate-700' },
  { sku: 'OLI GEAR / TRANSMISI', avg25: '-', avg26: '-', sdw: '-', tgt: '-', status: 'CROSS-SELLING', color: 'bg-slate-100 text-slate-700' },
];

export default function TargetL4Table() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden text-xs">
      <div className="bg-slate-700 text-white p-3 flex justify-between items-center">
        <span className="font-bold uppercase tracking-wider text-xs">
          TARGET L4 — DETAIL PART NUMBER & METODE FRONT-LINE
        </span>
        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
          Target Sep-26 / Oct-26
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
              <th className="p-2">ITEM SKU (PART NAME)</th>
              <th className="p-2 text-center">AVG 25</th>
              <th className="p-2 text-center">AVG 26</th>
              <th className="p-2 text-center">SDW</th>
              <th className="p-2 text-center bg-amber-100 text-amber-900">TGT PERIOD</th>
              <th className="p-2 text-center">INQ</th>
              <th className="p-2 text-center">ED</th>
              <th className="p-2 text-center">% ACH</th>
              <th className="p-2 text-center">METODE ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-medium text-[11px]">
            {l4Data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-2 font-semibold text-slate-800">{row.sku}</td>
                <td className="p-2 text-center text-slate-500">{row.avg25}</td>
                <td className="p-2 text-center text-emerald-600 font-bold">{row.avg26}</td>
                <td className="p-2 text-center text-slate-400">{row.sdw}</td>
                <td className="p-2 text-center bg-amber-50 font-bold text-slate-900">{row.tgt}</td>
                <td className="p-2 text-center text-slate-400">-</td>
                <td className="p-2 text-center text-slate-400">-</td>
                <td className="p-2 text-center text-slate-600">0%</td>
                <td className="p-2 text-center">
                  <span className={`px-2 py-0.5 text-[9px] rounded uppercase ${row.color}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}