export default function ScorecardTable({ scorecards }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-2">
          📋 Detail Scorecard Aspek & Key Performance Indicators (September 2026)
        </h3>
        <span className="text-[10px] text-gray-500">Form Evaluasi Resmi: 03/10/2026</span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th className="p-2.5 border border-slate-700 w-1/4">ASPECTS</th>
            <th className="p-2.5 border border-slate-700 w-2/4">KEY INDICATORS</th>
            <th className="p-2.5 border border-slate-700 text-center w-36" colSpan="3">SCORE INDICATORS</th>
            <th className="p-2.5 border border-slate-700 text-center w-28">FINAL VALUE</th>
          </tr>
          <tr className="bg-slate-800 text-white text-center text-[10px]">
            <th colSpan="2"></th>
            <th className="p-1 border border-slate-700 bg-red-700">LOW (1)</th>
            <th className="p-1 border border-slate-700 bg-amber-600">MED (2)</th>
            <th className="p-1 border border-slate-700 bg-emerald-700">HIGH (3)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {scorecards.map((item, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="p-2.5 font-bold text-slate-700 border">{item.aspect}</td>
              <td className="p-2.5 text-slate-600 border">{item.indicator}</td>
              <td className="p-2.5 border text-center" colSpan="3">
                <span className={`inline-block px-3 py-1 text-white font-bold rounded text-[11px] ${item.statusColor}`}>
                  {item.statusText}
                </span>
              </td>
              <td className="p-2.5 border text-center font-extrabold text-slate-800 bg-slate-50">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-200 text-xs font-bold">
        <span>TOTAL AKUMULASI SKOR KINERJA: 1 + 3 + 2 + 2 + 2 = 10,0</span>
        <span className="bg-amber-500 text-white px-3 py-0.5 rounded text-xs">MEDIUM</span>
      </div>
    </div>
  );
}