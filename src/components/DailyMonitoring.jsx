import { dailyMonitoringData } from '../data/dailyMonitoringData';

export default function DailyMonitoring() {
  const data = dailyMonitoringData;

  return (
    <div className="space-y-4 text-slate-800">
      
      {/* Top Header Banner Info */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <div className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded inline-block font-bold mb-1">DKS MONITORING</div>
          <h2 className="text-sm font-extrabold text-slate-900">Sales Daily Monitoring & Kunjungan Rute DKS</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            👤 <strong>{data.salesmanInfo}</strong> | 🏢 <strong>{data.soArea}</strong> | 📍 <strong>{data.routeInfo}</strong> | 📅 <strong>{data.date}</strong>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-slate-900">Hari Ini</button>
          <button className="bg-white border text-slate-700 text-xs px-3 py-1.5 rounded font-semibold hover:bg-slate-50">Kemarin</button>
          <button className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded font-semibold flex items-center gap-1">
            🛰️ Live Route Tracking
          </button>
        </div>
      </div>

      {/* KPI Summary Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        
        {/* Card 1 */}
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase">Kunjungan On-Track</span>
          <div className="text-xl font-extrabold text-blue-600">{data.summaryCards.kunjunganOnTrack.count}</div>
          <div className="text-[11px] font-semibold text-emerald-600">{data.summaryCards.kunjunganOnTrack.percentage}</div>
          <p className="text-[10px] text-gray-400">{data.summaryCards.kunjunganOnTrack.sub}</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase">Omzet Harian</span>
          <div className="text-xl font-extrabold text-slate-900">{data.summaryCards.omzetHarian.value} <span className="text-xs">{data.summaryCards.omzetHarian.unit}</span></div>
          <div className="text-[11px] font-semibold text-emerald-600">{data.summaryCards.omzetHarian.capai}</div>
          <p className="text-[10px] text-gray-400">{data.summaryCards.omzetHarian.target} • {data.summaryCards.omzetHarian.sisa}</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase">Efektifitas Waktu</span>
          <div className="text-xl font-extrabold text-slate-900">{data.summaryCards.efektifitasWaktu.value} <span className="text-xs">{data.summaryCards.efektifitasWaktu.unit}</span></div>
          <div className="text-[11px] font-semibold text-purple-600">{data.summaryCards.efektifitasWaktu.status}</div>
          <p className="text-[10px] text-gray-400">{data.summaryCards.efektifitasWaktu.target}</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase">Cross-Sell Hit Rate</span>
          <div className="text-xl font-extrabold text-emerald-600">{data.summaryCards.crossSellHitRate.value}</div>
          <div className="text-[11px] font-semibold text-slate-700">{data.summaryCards.crossSellHitRate.hit}</div>
          <p className="text-[10px] text-gray-400">{data.summaryCards.crossSellHitRate.items}</p>
        </div>

        {/* Card 5 */}
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm space-y-1 col-span-2 md:col-span-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase">Status SO Bosnet</span>
          <div className="text-xl font-extrabold text-slate-900">{data.summaryCards.statusSoBosnet.valid}</div>
          <div className="text-[11px] font-semibold text-emerald-600">Plafon 100% Aman</div>
          <p className="text-[10px] text-gray-400">Clear & Verifikasi Valid</p>
        </div>

      </div>

      {/* Main Content Grid: Left (Call Plan Timeline) & Right (SKU Fokus & Rewards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* LEFT: JADWAL & CALL PLAN RUTE DKS (Col 7) */}
        <div className="lg:col-span-7 bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-2">
              📅 Jadwal & Call Plan Rute DKS
            </h3>
            <span className="text-[11px] text-gray-500 font-medium">Semua (10) • Selesai (7) • Sisa (3)</span>
          </div>

          {/* Timeline List */}
          <div className="space-y-3">
            {data.callPlanRutes.map((rute, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-lg border text-xs transition ${rute.isCurrentVisit ? 'bg-blue-50/70 border-blue-300 ring-1 ring-blue-400 shadow-sm' : 'bg-slate-50/50 border-slate-200'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-500 text-xs w-10">{rute.time}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900">{rute.storeName}</span>
                        <span className="text-[10px] text-gray-400">ID: {rute.storeId}</span>
                      </div>
                      <p className="text-[11px] text-gray-600">{rute.address}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${rute.statusColor}`}>
                    {rute.status}
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-200/60 flex justify-between items-center text-[11px]">
                  <div className="flex items-center gap-3 text-slate-500">
                    <span>📍 {rute.gps}</span>
                    <span>⏱️️ {rute.durasi || rute.notes}</span>
                  </div>
                  {rute.omzet && (
                    <span className="font-extrabold text-blue-600">{rute.omzet}</span>
                  )}
                </div>

                {/* Extra box untuk active visit */}
                {rute.recommendation && (
                  <div className="mt-2 bg-amber-50 border border-amber-200 text-amber-900 p-2 rounded text-[11px] flex justify-between items-center">
                    <span>💡 <strong>Rekomendasi SPA:</strong> {rute.recommendation}</span>
                    <button className="bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1 rounded text-[10px] font-bold">
                      Buka Selling Tool Kits
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: SKU FOKUS HARIAN & REWARD (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* SKU Fokus Harian */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-2">
                📦 SKU Fokus Harian <span className="text-[10px] font-normal text-gray-500">Target vs Realisasi</span>
              </h3>
            </div>

            <div className="space-y-3">
              {data.skuFokus.map((sku, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{sku.name}</span>
                    <span className="text-slate-700">{sku.progress} ({sku.percentage})</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`${sku.statusColor} h-full`} style={{ width: sku.percentage }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>{sku.target}</span>
                    <span className="text-emerald-700 font-semibold">{sku.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Program Vaganza & Reward */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-2">
                🎁 Program Vaganza & Reward Outlet
              </h3>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Okt 2026</span>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border text-xs">
              <div>
                <span className="text-gray-500">Outlet Kualifikasi:</span>
                <p className="text-base font-extrabold text-slate-900">4 Toko</p>
                <p className="text-[10px] text-gray-400">Mencapai Tier-1 Vaganza</p>
              </div>
              <div>
                <span className="text-gray-500">Poin Terdistribusi:</span>
                <p className="text-base font-extrabold text-purple-700">12.850</p>
                <p className="text-[10px] text-gray-400">Poin reward tercatat</p>
              </div>
            </div>

            <div className="text-[11px] space-y-2 bg-blue-50/50 p-2.5 rounded border border-blue-100">
              <p className="font-bold text-blue-900">📌 Toko Sentosa Motor (Current):</p>
              <p className="text-gray-600">Plafon kredit tersedia Rp 14.500.000. Cukup untuk akumulasi draft order Rp 3.200.000 tanpa eskalasi HO.</p>
            </div>
          </div>

          {/* Footer Skor DKS Hari Ini */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <span className="text-[10px] text-gray-500 block uppercase font-bold">SKOR DKS HARI INI</span>
              <span className="text-sm font-extrabold text-slate-900">3.00 (Kategori: High Discipline)</span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded">
              100% Sesuai Rute
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}