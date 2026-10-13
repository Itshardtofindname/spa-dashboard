export default function SalesProfileCard({ data }) {
  if (!data) return null;

  // Fallback data aman jika objek terpisah atau terpotong
  const identity = data.identity || {
    nama: data.salesman || "-",
    npk: data.npk || "-",
    jabatan: "Field Salesman Domestic",
    wilayah: data.salesOffice || "-",
    totalOutlet: `${data.totalOutlet || 30} Outlet Aktif`,
    rankSo: data.rankSo || "#1 dari 18 Sales",
    avgAchievement: data.avgAchievement || "70.0%"
  };

  const finalGrade = data.finalGrade || {
    score: data.skorFinal ? String(data.skorFinal).replace('.', ',') : "10,0",
    status: data.statusLulus || "MEDIUM",
    batasLulus: "≥ 9.0",
    keterangan: "Performa individu memenuhi standar operasional."
  };

  const pilar = data.breakdownPilar || {
    pilar1: 3.0,
    pilar2: 5.0,
    pilar3: 2.0
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 1. DATA IDENTITAS SALESMAN */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-bold mb-3">
            <span>DATA IDENTITAS SALESMAN</span>
            <span>NPK: {identity.npk}</span>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-20 h-24 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-slate-400 text-xs font-bold">
              FOTO
            </div>

            <div className="space-y-1 text-xs">
              <h3 className="font-extrabold text-slate-800 text-sm uppercase">{identity.nama}</h3>
              <p className="text-slate-500 font-medium">{identity.jabatan}</p>
              <p className="text-slate-600 font-bold mt-2">WILAYAH / SO: <span className="text-slate-800 font-normal">{identity.wilayah}</span></p>
              <p className="text-slate-600 font-bold">TOTAL OUTLET: <span className="text-slate-800 font-normal">{identity.totalOutlet}</span></p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-2 mt-3 text-[11px] font-semibold text-slate-500">
          <span>Rank SO: <strong className="text-slate-800">{identity.rankSo}</strong></span>
          <span>Avg Achievement: <strong className="text-slate-800">{identity.avgAchievement}</strong></span>
        </div>
      </div>

      {/* 2. FINAL GRADE */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-bold mb-3">
            <span>FINAL GRADE</span>
            <span>September 2026</span>
          </div>

          <div className="text-center my-2">
            <span className="text-3xl font-black text-slate-800">{finalGrade.score}</span>
            <div className={`inline-block ml-2 px-2.5 py-0.5 text-xs font-bold rounded text-white ${
              finalGrade.status === 'HIGH' ? 'bg-emerald-600' :
              finalGrade.status === 'MEDIUM' ? 'bg-amber-500' : 'bg-rose-600'
            }`}>
              {finalGrade.status}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Batas Lulus: {finalGrade.batasLulus}</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-2 rounded text-[11px] leading-tight font-medium">
          ⚠️ {finalGrade.keterangan}
        </div>
      </div>

      {/* 3. BREAKDOWN 3 PILAR UTAMA */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div className="bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-bold mb-3">
          BREAKDOWN 3 PILAR UTAMA
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
            <div>
              <p className="font-bold text-slate-800">Pilar 1: RESULT</p>
              <p className="text-[10px] text-slate-500">Sales Achievement & Growth</p>
            </div>
            <span className="font-extrabold text-slate-800">{pilar.pilar1}</span>
          </div>

          <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
            <div>
              <p className="font-bold text-slate-800">Pilar 2: STRATEGIC ALIGNMENT</p>
              <p className="text-[10px] text-slate-500">Cross Sell, Outlet, & Repeat Order</p>
            </div>
            <span className="font-extrabold text-slate-800">{pilar.pilar2}</span>
          </div>

          <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
            <div>
              <p className="font-bold text-slate-800">Pilar 3: PROCESS</p>
              <p className="text-[10px] text-slate-500">Daftar Kunjungan Sales (DKS)</p>
            </div>
            <span className="font-extrabold text-slate-800">{pilar.pilar3}</span>
          </div>
        </div>
      </div>
    </div>
  );
}