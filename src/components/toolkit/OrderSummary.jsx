
export default function OrderSummary() {
  return (
    <>
{/* FOOTER ORDER */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
        <div>
          <span className="block text-[10px] text-gray-500">
            Total Order Kunjungan Ini:
          </span>

          <span className="text-lg font-extrabold text-blue-600">
            Rp 9.872.083
          </span>
        </div>

        <div>
          <span className="block text-[10px] text-gray-500">
            Simulasi Sisa Plafon Setelah PO:
          </span>

          <span className="text-lg font-extrabold text-emerald-600">
            Rp 23.970.801
          </span>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 md:w-auto">
          <button className="flex min-h-11 items-center justify-center rounded border border-slate-300 px-3 py-2 text-xs font-bold leading-tight text-slate-700 hover:bg-slate-50">
            🖨️ Cetak PO
          </button>

          <button className="flex min-h-11 items-center justify-center rounded bg-emerald-600 px-3 py-2 text-xs font-bold leading-tight text-white hover:bg-emerald-700">
            💬 Kirim WA ke Toko
          </button>

          <button className="flex min-h-11 items-center justify-center rounded bg-blue-600 px-4 py-2 text-xs font-extrabold leading-tight text-white shadow hover:bg-blue-700">
            📤 Submit Order ke BOSNET & SAP
          </button>
        </div>
      </div>
    </>
  );
}
