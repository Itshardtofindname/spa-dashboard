export default function ActionPlanSection({ data }) {
  // Gunakan fallback array/string kosong jika data/properti bernilai undefined
  const repeatOrders = data?.repeatOrderRendah || [];
  const kekuatan = data?.kekuatanSales || [];
  const catatan = data?.catatanSupervisor || "Belum ada catatan dari supervisor.";

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 space-y-4 text-xs">
      <h3 className="font-bold text-slate-800 text-sm border-b pb-2 uppercase tracking-wider">
        Rencana Aksi & Evaluasi Supervisor
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Outlet Repeat Order Rendah */}
        <div className="border border-rose-100 rounded-lg p-3 bg-rose-50/30">
          <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-1">
            ⚠️ Outlet Repeat Order Rendah
          </h4>
          {repeatOrders.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              {repeatOrders.map((item, idx) => (
                <li key={idx}>
                  {typeof item === 'object' ? `${item.nama || item.store || '-'} (${item.keterangan || item.status || ''})` : item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 italic">Tidak ada data outlet repeat order rendah.</p>
          )}
        </div>

        {/* Kekuatan Salesman */}
        <div className="border border-emerald-100 rounded-lg p-3 bg-emerald-50/30">
          <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-1">
            ⭐ Kekuatan Utama Salesman
          </h4>
          {kekuatan.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              {kekuatan.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 italic">Belum ada catatan kekuatan salesman.</p>
          )}
        </div>
      </div>

      {/* Catatan Supervisor */}
      <div className="border border-amber-200 rounded-lg p-3 bg-amber-50/50">
        <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-1">
          📝 Catatan Supervisor
        </h4>
        <p className="text-slate-700 leading-relaxed font-medium">{catatan}</p>
      </div>
    </div>
  );
}