import { useLksTargets } from "../../composables/useLks";

export default function TargetL2Table({ storeId = "1000015851" }) {
  const { l2Targets, loading, error, refetch } = useLksTargets(storeId);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg border border-slate-200 text-center text-xs text-slate-500">
        Memuat data target LKS dari backend...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 p-3 rounded-lg border border-rose-200 text-xs text-rose-600 font-semibold flex justify-between items-center">
        <span>Gagal memuat data: {error}</span>
        <button onClick={refetch} className="underline text-rose-800">Coba Lagi</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden text-xs">
      <div className="bg-rose-900 text-white p-3 flex justify-between items-center">
        <span className="font-bold uppercase tracking-wider text-xs">
          TARGET L2 — KELOMPOK PRODUK UTAMA
        </span>
        <button onClick={refetch} className="text-[10px] bg-rose-950 px-2 py-0.5 rounded text-rose-200 hover:bg-rose-800">
          🔄 Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
              <th className="p-2">L2</th>
              <th className="p-2 text-center">AVG 25</th>
              <th className="p-2 text-center">AVG 26</th>
              <th className="p-2 text-center">SDW (%)</th>
              <th className="p-2 text-center bg-amber-100 text-amber-900">TARGET OCT</th>
              <th className="p-2 text-center">METODE REKOMENDASI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-medium">
            {l2Targets.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-slate-400">
                  Belum ada data target L2 untuk toko ini.
                </td>
              </tr>
            ) : (
              l2Targets.map((row, idx) => (
                <tr key={row.id || idx} className="hover:bg-slate-50">
                  <td className="p-2 font-bold text-slate-800">
                    <span className="font-bold text-rose-900 mr-1">• {row.code_sku}</span> ({row.nama_produk})
                  </td>
                  <td className="p-2 text-center text-slate-500">{row.avg_2025}</td>
                  <td className="p-2 text-center text-emerald-600 font-bold">{row.avg_2026}</td>
                  <td className="p-2 text-center text-slate-600">{row.sdw_pct || "-"}</td>
                  <td className="p-2 text-center bg-amber-50 font-bold text-slate-900">{row.target_qty}</td>
                  <td className="p-2 text-center">
                    <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-rose-100 text-rose-800">
                      {row.metode_rekomendasi}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}