export default function SalesProfileCard({ data }) {
  // Gunakan data aman jika data belum termuat
  if (!data) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Kolom Kiri: Data Identitas Salesman */}
      <div className="lg:col-span-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-t flex justify-between items-center">
            <span>DATA IDENTITAS SALESMAN</span>
            <span>NPK: {data.identity?.npk}</span>
          </div>
          <div className="flex gap-4 mt-4 items-center border-b pb-4">
            <div className="w-20 h-24 bg-slate-200 rounded border flex items-center justify-center font-bold text-slate-500 text-xs">
              FOTO
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">{data.identity?.nama}</h2>
              <p className="text-xs text-gray-500">{data.identity?.jabatan}</p>
              <div className="mt-2 text-[11px] space-y-0.5 text-slate-600">
                <p>WILAYAH / SO: <strong>{data.identity?.wilayah}</strong></p>
                <p>TOTAL OUTLET: <strong className="text-emerald-700">{data.identity?.totalOutlet}</strong></p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 text-xs text-slate-600 pt-2 border-t">
          <span>Rank SO: <strong>{data.identity?.rankSo}</strong></span>
          <span>Avg Achievement: <strong>{data.identity?.avgAchievement}</strong></span>
        </div>
      </div>

      {/* Kolom Tengah: Final Grade */}
      <div className="lg:col-span-3 bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between text-center">
        <div className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-t flex justify-between">
          <span>FINAL GRADE</span>
          <span>September 2026</span>
        </div>
        <div className="my-auto py-2">
          <span className="text-4xl font-extrabold text-red-600 tracking-tight">{data.finalGrade?.score}</span>
          <div className="mt-2 inline-block bg-amber-500 text-white text-xs font-bold px-3 py-0.5 rounded shadow-sm">
            {data.finalGrade?.status}
          </div>
          <p className="text-[10px] text-gray-500 mt-1">Batas Lulus: &ge; 9.0</p>
        </div>
        <p className="text-[10px] text-slate-600 bg-amber-50 p-2 rounded border border-amber-100 text-left">
          ⚠️ {data.finalGrade?.keterangan}
        </p>
      </div>

      {/* Kolom Kanan: 3 Pilar Utama */}
      <div className="lg:col-span-5 bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-t">
          <span>BREAKDOWN 3 PILAR UTAMA</span>
        </div>
        <div className="space-y-2.5 my-auto py-1">
          <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100 text-xs">
            <div className="text-left">
              <p className="font-bold text-slate-800">Pilar 1: RESULT</p>
              <p className="text-[10px] text-gray-500">Sales Achievement & Growth</p>
            </div>
            <span className="font-extrabold text-slate-800">{data.breakdownPilar?.pilar1}</span>
          </div>

          <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100 text-xs">
            <div className="text-left">
              <p className="font-bold text-slate-800">Pilar 2: STRATEGIC ALIGNMENT</p>
              <p className="text-[10px] text-gray-500">Cross Sell, Outlet, & Repeat Order</p>
            </div>
            <span className="font-extrabold text-slate-800">{data.breakdownPilar?.pilar2}</span>
          </div>

          <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100 text-xs">
            <div className="text-left">
              <p className="font-bold text-slate-800">Pilar 3: PROCESS</p>
              <p className="text-[10px] text-gray-500">Daftar Kunjungan Sales (DKS)</p>
            </div>
            <span className="font-extrabold text-slate-800">{data.breakdownPilar?.pilar3}</span>
          </div>
        </div>
      </div>
    </div>
  );
}