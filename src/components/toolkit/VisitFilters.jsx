import ResponsiveSelect from "../ResponsiveSelect";

export default function VisitFilters({
  selectedSalesman,
  setSelectedSalesman,
  selectedDay,
  setSelectedDay,
  selectedCustomer,
  setSelectedCustomer,
  salesmanList,
  dayList,
  stores,
  loadingStores,
  storeError,
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid w-full grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 2xl:grid-cols-3">
        <label className="grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-1.5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-3">
          <span className="whitespace-nowrap text-xs font-bold text-slate-600">Salesman:</span>
          <ResponsiveSelect value={selectedSalesman} onChange={(event) => setSelectedSalesman(event.target.value)} className="h-11 min-w-0 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm font-medium">
            {salesmanList.map((salesman) => <option key={salesman} value={salesman}>{salesman}</option>)}
          </ResponsiveSelect>
        </label>

        <label className="grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-1.5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-3">
          <span className="whitespace-nowrap text-xs font-bold text-slate-600">Jadwal Visit:</span>
          <ResponsiveSelect value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)} className="h-11 min-w-0 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm font-medium">
            {dayList.map((day) => <option key={day} value={day}>{day}</option>)}
          </ResponsiveSelect>
        </label>

        <label className="grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-1.5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-3">
          <span className="whitespace-nowrap text-xs font-bold text-slate-600">Active Customer ID:</span>
          <ResponsiveSelect value={selectedCustomer} onChange={(event) => setSelectedCustomer(event.target.value)} disabled={loadingStores || stores.length === 0} className="h-11 min-w-0 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60">
            <option value="">{loadingStores ? "Memuat toko..." : stores.length === 0 ? "Tidak ada toko" : "Pilih toko"}</option>
            {stores.map((store) => <option key={store.id} value={String(store.cust_no)}>{store.cust_no} - {store.nama_toko}</option>)}
          </ResponsiveSelect>
        </label>
      </div>

      {loadingStores && <p className="mt-3 text-xs text-slate-500">Memuat daftar toko...</p>}
      {storeError && <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700"><p className="font-bold">Gagal mengambil daftar toko</p><p className="mt-1">{storeError}</p></div>}
      {!loadingStores && !storeError && stores.length === 0 && <p className="mt-3 text-xs text-amber-700">Belum ada toko yang terhubung dengan salesman ini.</p>}
    </div>
  );
}
