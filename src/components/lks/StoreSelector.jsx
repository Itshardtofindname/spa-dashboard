const storeList = [
  { id: '1000015851', name: 'H. HOTIB MOTOR', status: 'ACTIVE', statusBg: 'bg-emerald-100 text-emerald-800', border: 'border-rose-800', sisaLimit: 'Rp 12.474.801', barColor: 'bg-emerald-500', isSelected: true },
  { id: '1000021965', name: 'PANGKALAN JAYA ...', status: 'RISK AR', statusBg: 'bg-amber-100 text-amber-800', border: 'border-slate-200', sisaLimit: 'Rp 3.020.067', barColor: 'bg-amber-500', isSelected: false },
  { id: '1000033597', name: 'BANDARA BAN TA...', status: 'BLOK AR', statusBg: 'bg-rose-100 text-rose-800', border: 'border-slate-200', sisaLimit: 'Rp 6.094', barColor: 'bg-rose-500', isSelected: false },
  { id: '1000029830', name: 'KITA KITA MOTOR', status: 'ACTIVE', statusBg: 'bg-emerald-100 text-emerald-800', border: 'border-slate-200', sisaLimit: 'Rp 10.525.832', barColor: 'bg-emerald-500', isSelected: false },
];

export default function StoreSelector() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
          DAFTAR KUNJUNGAN TOKO BINAAN (4 OUTLET MONITORING)
        </span>
        <span className="text-slate-500">
          Salesman: <strong className="text-slate-800">Angga Juansyah / Seno Aji S.</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {storeList.map((store) => (
          <div 
            key={store.id} 
            className={`bg-white p-3 rounded-lg border-2 shadow-sm transition cursor-pointer ${
              store.isSelected ? store.border : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-[10px] font-mono text-slate-400">#{store.id}</span>
              <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${store.statusBg}`}>
                {store.status}
              </span>
            </div>

            <h3 className="font-bold text-slate-800 text-xs truncate mb-2">{store.name}</h3>

            <div className="flex justify-between items-baseline text-xs mb-1">
              <span className="text-[10px] text-slate-400">Sisa Limit:</span>
              <span className="font-bold text-slate-800">{store.sisaLimit}</span>
            </div>

            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
              <div className={`h-full ${store.barColor} w-3/4`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}