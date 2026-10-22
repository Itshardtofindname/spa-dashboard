
export default function StoreInformation({selectedStore, selectedSalesman, storeProfile, creditLimit, formatRupiah}) {
  return (
    <>
{/* SECTION 01: INFORMASI TOKO */}
        <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:col-span-5">
          <div className="flex flex-col justify-between gap-2 border-b pb-2 sm:flex-row sm:items-center">
            <h3 className="flex items-center gap-1 text-xs font-bold uppercase text-red-600">
              📌 SECTION 01: INFORMASI TOKO
            </h3>

            <span className="text-[10px] text-gray-400">
              Profil outlet & status limit kredit
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded border bg-slate-50 p-3 text-xs">
            <div>
              <span className="text-gray-500">Customer ID:</span>
              <p className="break-words font-bold text-slate-900">
                {selectedStore?.cust_no ?? "-"}
              </p>
            </div>

            <div>
              <span className="text-gray-500">Nama Outlet:</span>
              <p className="break-words font-bold text-slate-900">
                {selectedStore?.nama_toko ?? "-"}
              </p>
            </div>

            <div>
              <span className="text-gray-500">
                Owner / SO [SAP]:
              </span>
              <p className="break-words font-bold text-slate-900">
                {storeProfile?.owner ??
                  selectedStore?.area ??
                  "Belum tersedia"}
              </p>
            </div>

            <div>
              <span className="text-gray-500">NPK Salesman:</span>
              <p className="break-words font-bold text-slate-900">
                {selectedSalesman || "-"}
              </p>
            </div>
          </div>

          {/* PLAFON KREDIT */}
          <div className="space-y-2 rounded border bg-white p-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-slate-700">
                PLAFON KREDIT FINANSIAL [SAP FI]
              </span>

              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                {creditLimit?.status ?? "BELUM ADA DATA"}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500">
                Sisa Plafon (Available Credit):
              </span>

              <h2 className="text-xl font-extrabold text-emerald-700">
                {creditLimit?.remainingCredit !== undefined &&
                creditLimit?.remainingCredit !== null
                  ? formatRupiah(creditLimit.remainingCredit)
                  : "-"}
              </h2>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(
                      0,
                      Number(creditLimit?.usedPercentage) || 0
                    )
                  )}%`,
                }}
              />
            </div>

            <div className="flex flex-col justify-between gap-1 text-[10px] text-gray-500 sm:flex-row">
              <span>
                Terpakai:{" "}
                {creditLimit?.usedAmount !== undefined &&
                creditLimit?.usedAmount !== null
                  ? formatRupiah(creditLimit.usedAmount)
                  : "-"}
                {creditLimit?.usedPercentage !== undefined &&
                creditLimit?.usedPercentage !== null
                  ? ` (${creditLimit.usedPercentage}%)`
                  : ""}
              </span>

              <span>
                Total Credit Limit:{" "}
                {creditLimit?.totalLimit !== undefined &&
                creditLimit?.totalLimit !== null
                  ? formatRupiah(creditLimit.totalLimit)
                  : "-"}
              </span>
            </div>

            {!storeProfile && (
              <p className="text-[10px] text-amber-700">
                Profil kredit belum tersedia dari backend. Nilai
                tidak ditampilkan menggunakan angka mock.
              </p>
            )}
          </div>

          <div className="space-y-1 rounded bg-slate-50 p-2.5 text-[11px] text-slate-600">
            <p>
              🔒 Manual Block Status:{" "}
              <strong className="text-slate-800">
                {storeProfile?.manual_block ?? "Belum tersedia"}
              </strong>
            </p>

            <p>
              ⚠️ Overdue Invoices:{" "}
              <strong className="text-slate-800">
                {Array.isArray(storeProfile?.overdue_invoices)
                  ? storeProfile.overdue_invoices.length
                  : storeProfile?.overdue_invoices ??
                    "Belum tersedia"}
              </strong>
            </p>
          </div>
        </div>
    </>
  );
}
