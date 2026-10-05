export default function SalesProfileCard({ data }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Kolom Kiri: Data Identitas Salesman */}
      <div className="lg:col-span-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-t flex justify-between items-center">
            <span>DATA IDENTITAS SALESMAN</span>
            <span>NPK: {data.npk}</span>
          </div>
          <div className="flex gap-4 mt-4 items-center border-b pb-4">
            <div className="w-20 h-24 bg-slate-200 rounded border flex items-center justify-center font-bold text-slate-500 text-xs">
              FOTO
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">{data.name}</h2>
              <p className="text-xs text-gray-500">{data.position}</p>
              <div className="mt-2 text-[11px] space-y-0.5 text-slate-600">
                <p>WILAYAH / SO: <strong>{data.wilayah}</strong></p>
                <p>TOTAL OUTLET: <strong className="text-emerald-700">{data.totalOutlet}</strong></p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 text-xs text-slate-600 pt-2 border-t">
          <span>Rank SO: <strong>{data.rank}</strong></span>
          <span>Avg Achievement: <strong>{data.avgAchievement}</strong></span>
        </div>
      </div>

      {/* Kolom Tengah: Final Grade */}
      <div className="lg:col-span-3 bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between text-center">
        <div className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-t flex justify-between">
          <span>FINAL GRADE</span>
          <span>September 2026</span>
        </div>
        <div className="my-auto py-2">
          <span className="text-4xl font-extrabold text-red-600 tracking-tight">{data.finalScore}</span>
          <div className="mt-2 inline-block bg-amber-500 text-white text-xs font-bold px-3 py-0.5 rounded shadow-sm">
            {data.rating}
          </div>
          <p className="text-[10px] text-gray-500 mt-1">Batas Lulus: &ge; 9.0</p>
        </div>
        <p className="text-[10px] text-slate-600 bg-amber-50 p-2 rounded border border-amber-100 text-left">
          ⚠️ Performa individu berada pada kategori <strong>MEDIUM</strong>. Memenuhi target standar operasional, namun pilar RESULT memerlukan eskalasi intensif di bulan depan.
        </p>
      </div>

      {/* Kolom Kanan: 3 Pilar Utama */}
      <div className="lg:col-span-5 bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-t">
          <span>BREAKDOWN 3 PILAR UTAMA</span>
        </div>
        <div className="space-y-2.5 my-auto py-1">
          {data.pillars.map((pilar) => (
            <div key={pilar.id} className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100 text-xs">
              <div className="text-left">
                <p className="font-bold text-slate-800">{pilar.name}</p>
                <p className="text-[10px] text-gray-500">{pilar.subtitle}</p>
              </div>
              <span className="font-extrabold text-slate-800">{pilar.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}