export default function ActionPlanSection({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {/* Kolom 1: Prioritas Repeat Order Rendah */}
      <div className="bg-white p-4 rounded-lg border border-red-200 shadow-sm">
        <div className="flex items-center justify-between border-b pb-2 mb-3">
          <h3 className="text-xs font-bold text-red-600 uppercase flex items-center gap-1">
            ⚠ Prioritas Repeat Order Rendah
          </h3>
          <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold">R.Order: 33%</span>
        </div>
        <p className="text-[11px] text-gray-500 mb-3">Toko yang belum melakukan re-order dalam 21 hari terakhir:</p>
        <div className="space-y-2">
          {data.repeatOrderLow.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-gray-50 p-2.5 rounded border border-gray-100 text-xs">
              <div>
                <p className="font-bold text-slate-800">{item.store}</p>
                <p className="text-[11px] text-gray-500">{item.detail}</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-2.5 py-1 rounded font-medium transition">
                Follow Up
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Kolom 2: Area Kekuatan Salesman */}
      <div className="bg-white p-4 rounded-lg border border-emerald-200 shadow-sm">
        <div className="flex items-center justify-between border-b pb-2 mb-3">
          <h3 className="text-xs font-bold text-emerald-700 uppercase flex items-center gap-1">
            ⭐ Area Kekuatan Salesman
          </h3>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">Skor 3 (High)</span>
        </div>
        <div className="space-y-3 text-xs">
          <div className="bg-emerald-50/50 p-2.5 rounded border border-emerald-100">
            <p className="font-bold text-emerald-900">Cross Selling - Up Selling (100% Kepatuhan)</p>
            <p className="text-gray-600 text-[11px] mt-0.5">Seno sangat konsisten menawarkan SKU sekunder dan promo bundling di setiap invoice baru.</p>
          </div>
          <div className="bg-emerald-50/50 p-2.5 rounded border border-emerald-100">
            <p className="font-bold text-emerald-900">DKS (Disiplin Kunjungan Sales) (100% On-Time)</p>
            <p className="text-gray-600 text-[11px] mt-0.5">Check-in geo-logging 100% valid tanpa deviasi rute buat mingguan.</p>
          </div>
        </div>
      </div>

      {/* Kolom 3: Catatan Coaching Supervisor */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b pb-2 mb-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1">
            📋 Catatan Coaching Supervisor
          </h3>
          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">SO-JKT-SO15</span>
        </div>
        <p className="text-xs text-slate-700 italic bg-slate-50 p-2.5 rounded border border-slate-100 mb-3">
          "{data.supervisorNotes.notes}"
        </p>
        <p className="text-[11px] font-bold text-slate-800 mb-1">Rekomendasi Rencana Aksi (Oktober 2026):</p>
        <ul className="list-disc list-inside text-[11px] text-gray-600 space-y-1">
          {data.supervisorNotes.recommendation.map((rec, idx) => (
            <li key={idx}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}