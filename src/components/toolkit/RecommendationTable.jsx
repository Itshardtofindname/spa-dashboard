
export default function RecommendationTable({data}) {
  return (
    <>
{/* SECTION 03: CROSS-SELL */}
      <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-2 border-b pb-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="flex items-center gap-2 text-xs font-bold uppercase text-slate-800">
            💡 SECTION 03: REKOMENDASI CROSS-SELL & UP-SELL ENGINE
          </h3>

          <div className="grid w-full grid-cols-3 gap-1 text-[10px] sm:w-auto sm:text-xs">
            <button className="min-w-0 rounded bg-slate-900 px-1.5 py-1.5 leading-tight text-white sm:px-2">
              Semua Part ({data.crossSellItems.length})
            </button>

            <button className="min-w-0 rounded bg-gray-100 px-1.5 py-1.5 leading-tight text-slate-700 sm:px-2">
              Up-Sell
            </button>

            <button className="min-w-0 rounded bg-gray-100 px-1.5 py-1.5 leading-tight text-slate-700 sm:px-2">
              Cross-Sell
            </button>
          </div>
        </div>

        <p className="mb-2 text-[10px] text-slate-500 sm:hidden">
          Geser tabel ke samping untuk melihat semua kolom.
        </p>

        <div
          className="cross-sell-scroll max-w-full overflow-x-auto rounded border border-slate-200"
          role="region"
          aria-label="Tabel rekomendasi cross-sell dan up-sell"
          tabIndex={0}
        >
          <table className="cross-sell-table w-full border-collapse text-left text-xs">
            <colgroup>
              {[145, 105, 70, 70, 70, 75, 70, 115, 120].map(
                (width, index) => (
                  <col key={index} style={{ width }} />
                )
              )}
            </colgroup>

            <thead>
              <tr className="bg-slate-900 text-[11px] text-white">
                <th className="border p-2">KATEGORI PART</th>
                <th className="border p-2">SKU FOKUS</th>
                <th className="border p-2 text-center">AVG 24 BLN</th>
                <th className="border p-2 text-center">INQ (MIN)</th>
                <th className="border p-2 text-center">SO (AKTUAL)</th>
                <th className="border p-2 text-center">SO (SELISIH)</th>
                <th className="border p-2 text-center">% GROWTH</th>
                <th className="border p-2 text-center">
                  TIPE REKOMENDASI
                </th>
                <th className="border p-2 text-center">AKSI CEPAT</th>
              </tr>
            </thead>

            <tbody>
              {data.crossSellItems.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b text-[11px] hover:bg-slate-50"
                >
                  <td className="border p-2 font-bold text-slate-800">
                    {item.category}
                  </td>

                  <td className="border p-2 text-slate-600">
                    {item.sku}
                  </td>

                  <td className="border p-2 text-center">
                    {item.avg24m}
                  </td>

                  <td className="border p-2 text-center">
                    {item.reqMin}
                  </td>

                  <td className="border p-2 text-center font-bold">
                    {item.actual}
                  </td>

                  <td className="border p-2 text-center font-semibold text-red-600">
                    {item.selisih}
                  </td>

                  <td className="border p-2 text-center font-semibold">
                    {item.growth}
                  </td>

                  <td className="border p-2 text-center">
                    <span
                      className={`inline-block whitespace-nowrap rounded px-2 py-0.5 text-[10px] font-bold ${
                        item.type === "UP-SELL"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  <td className="border p-2 text-center">
                    {item.actionVal !== undefined ? (
                      <span className="font-bold">
                        {item.actionVal}
                      </span>
                    ) : (
                      <button className="rounded bg-emerald-600 px-2 py-1 text-[10px] font-medium text-white hover:bg-emerald-700">
                        {item.actionText}
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {data.crossSellItems.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="p-4 text-center text-slate-500"
                  >
                    Belum ada rekomendasi produk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
