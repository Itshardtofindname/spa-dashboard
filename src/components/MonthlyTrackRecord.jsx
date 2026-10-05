export default function MonthlyTrackRecord({ records = [] }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mt-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-2">
          📊 Rekapitulasi Track Record Bulanan & Komponen KPI (Tahun 2026)
        </h3>
        <span className="text-[11px] bg-slate-800 text-white px-2 py-0.5 rounded">Data Source: SO_Jakarta_TL_Matrix</span>
      </div>

      <table className="w-full text-left border-collapse text-[11px]">
        <thead>
          <tr className="bg-slate-900 text-white text-center">
            <th className="p-2 border border-slate-700" rowSpan="2">PH</th>
            <th className="p-2 border border-slate-700" colSpan="3">Q1 2026</th>
            <th className="p-2 border border-slate-700" rowSpan="2">Q1 AVG</th>
            <th className="p-2 border border-slate-700" colSpan="3">Q2 2026</th>
            <th className="p-2 border border-slate-700" colSpan="2">Q3 2026</th>
            <th className="p-2 border border-slate-700 bg-emerald-800" rowSpan="2">SEP (AKTIF)</th>
            <th className="p-2 border border-slate-700" colSpan="5">Score Ranking Breakdown (Persentase & Bobot)</th>
            <th className="p-2 border border-slate-700" rowSpan="2">AVERAGE TOTAL</th>
            <th className="p-2 border border-slate-700" rowSpan="2">RANK</th>
          </tr>
          <tr className="bg-slate-800 text-white text-center">
            <th className="p-1 border border-slate-700">JAN</th>
            <th className="p-1 border border-slate-700">FEB</th>
            <th className="p-1 border border-slate-700">MAR</th>
            <th className="p-1 border border-slate-700">APR</th>
            <th className="p-1 border border-slate-700">MEI</th>
            <th className="p-1 border border-slate-700">JUNI</th>
            <th className="p-1 border border-slate-700">JULI</th>
            <th className="p-1 border border-slate-700">AUG</th>
            <th className="p-1 border border-slate-700">SALES (PERFORM)</th>
            <th className="p-1 border border-slate-700">DA (ACTIVE)</th>
            <th className="p-1 border border-slate-700">R.ORDER</th>
            <th className="p-1 border border-slate-700">CROSS SELL</th>
            <th className="p-1 border border-slate-700">DKS (VISIT)</th>
          </tr>
        </thead>
        <tbody>
          {records && records.map((row, index) => (
            <tr key={index} className="text-center border-b hover:bg-gray-50">
              <td className="p-2 font-bold bg-slate-100 border">{row.territory}</td>
              <td className="p-2 border">{row.jan}</td>
              <td className="p-2 border">{row.feb}</td>
              <td className="p-2 border">{row.mar}</td>
              <td className="p-2 border font-semibold bg-gray-50">{row.q1Avg}</td>
              <td className="p-2 border">{row.apr}</td>
              <td className="p-2 border">{row.mei}</td>
              <td className="p-2 border">{row.jun}</td>
              <td className="p-2 border">{row.jul}</td>
              <td className="p-2 border">{row.aug}</td>
              <td className="p-2 font-bold bg-emerald-50 text-emerald-800 border">{row.sep}</td>
              <td className="p-2 border bg-red-50 text-red-700">{row.salesScore}</td>
              <td className="p-2 border bg-amber-50 text-amber-800">{row.daScore}</td>
              <td className="p-2 border bg-amber-50 text-amber-800">{row.rOrder}</td>
              <td className="p-2 border bg-emerald-50 text-emerald-800">{row.crossSell}</td>
              <td className="p-2 border bg-emerald-50 text-emerald-800">{row.dks}</td>
              <td className="p-2 font-bold border">{row.avgTotal}</td>
              <td className="p-2 font-bold bg-slate-100 border text-blue-600">{row.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}