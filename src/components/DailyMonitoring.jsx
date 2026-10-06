import { useState } from 'react';
import { getDailyMonitoringData } from '../data/dailyMonitoringData';
import { customerList, salesmanList } from '../data/dataSales';
import CalendarPicker from './CalendarPicker';

export default function DailyMonitoring() {
  const [selectedCustomer, setSelectedCustomer] = useState(customerList[0]);
  const [selectedSalesman, setSelectedSalesman] = useState(salesmanList[0]);
  const [selectedDate, setSelectedDate] = useState("2026-10-06");

  const data = getDailyMonitoringData(selectedSalesman, selectedCustomer);

  const formattedDate = new Date(selectedDate).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="space-y-4 text-slate-800">
      
      {/* Top Header & Integrated Dropdown Info */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <div className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded inline-block font-bold mb-1">DKS MONITORING</div>
            <h2 className="text-sm font-extrabold text-slate-900">Sales Daily Monitoring & Kunjungan Rute DKS</h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-1">
              <span className="flex items-center gap-1 font-semibold">
                👤 
                <select 
                    value={selectedSalesman} 
                    onChange={(e) => setSelectedSalesman(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded px-1.5 py-0.5 text-xs font-bold text-slate-900 focus:outline-none cursor-pointer max-w-[135px]"
                >
                    {salesmanList.map((sales, idx) => (
                    <option key={idx} value={sales}>{sales}</option>
                    ))}
                </select>
                </span>

                <span className="text-slate-300">|</span>

                <span className="flex items-center gap-1 font-semibold">
                🏢 
                <select 
                    value={selectedCustomer} 
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded px-1.5 py-0.5 text-xs font-bold text-slate-900 focus:outline-none cursor-pointer max-w-[135px]"
                >
                    {customerList.map((customer, idx) => (
                    <option key={idx} value={customer}>{customer}</option>
                    ))}
                </select>
                </span>

              <span className="text-slate-300">|</span>
              <span>📍 <strong>{data.routeInfo}</strong></span>

              <span className="text-slate-300">|</span>
              <span>📅 <strong>{formattedDate}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CalendarPicker 
              selectedDate={selectedDate}
              onDateChange={(newDate) => setSelectedDate(newDate)}
            />

            <button className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 hover:bg-blue-700 transition">
              🛰️ Live Route Tracking
            </button>
          </div>
        </div>
      </div>

      {/* SUMMARY SALESMAN & TARGET PENCAPAIAN */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="border-r border-slate-700 pr-2">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Progress Kunjungan Toko</span>
          <div className="text-xl font-extrabold text-white mt-1">{data.summaryCards.kunjunganOnTrack.count} <span className="text-xs font-normal text-slate-300">Toko</span></div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
            <div className="bg-blue-500 h-full w-[70%]"></div>
          </div>
          <span className="text-[10px] text-blue-300 mt-1 block">70% Selesai (1 Sedang Visit, 2 Menunggu)</span>
        </div>

        <div className="border-r border-slate-700 pr-2">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Realisasi Omzet Harian</span>
          <div className="text-xl font-extrabold text-emerald-400 mt-1">{data.summaryCards.omzetHarian.value} {data.summaryCards.omzetHarian.unit}</div>
          <p className="text-[11px] text-slate-300 mt-1">Target: Rp 35.000.000 <span className="text-emerald-400 font-bold">({data.summaryCards.omzetHarian.capai})</span></p>
          <span className="text-[10px] text-amber-300 block">{data.summaryCards.omzetHarian.sisa}</span>
        </div>

        <div className="border-r border-slate-700 pr-2">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Efektivitas Waktu & DKS</span>
          <div className="text-xl font-extrabold text-purple-300 mt-1">{data.summaryCards.efektifitasWaktu.value} <span className="text-xs font-normal text-slate-300">/ Outlet</span></div>
          <p className="text-[11px] text-slate-300 mt-1">Skor DKS: <strong>3.00 (High Discipline)</strong></p>
          <span className="text-[10px] text-emerald-400 block">100% Valid Sesuai Rute GPS</span>
        </div>

        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Cross-Sell & Status SO</span>
          <div className="text-xl font-extrabold text-amber-300 mt-1">{data.summaryCards.crossSellHitRate.value} <span className="text-xs font-normal text-slate-300">Hit Rate</span></div>
          <p className="text-[11px] text-slate-300 mt-1">6 Faktur Valid • Plafon Aman</p>
          <span className="text-[10px] text-blue-300 block">Status: Bosnet & SAP Connected</span>
        </div>
      </div>

      {/* Main Content Grid: Left (Call Plan Timeline) & Right (SKU Fokus & Rewards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* LEFT: JADWAL & CALL PLAN RUTE DKS (Col 7) */}
        <div className="lg:col-span-7 bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-2">
              📅 Jadwal & Call Plan Rute DKS
            </h3>
            <span className="text-[11px] text-gray-500 font-medium">Semua (10) • Selesai (7) • Sisa (3)</span>
          </div>

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
                    <span>⏱ {rute.durasi || rute.notes}</span>
                  </div>
                  {rute.omzet && (
                    <span className="font-extrabold text-blue-600">{rute.omzet}</span>
                  )}
                </div>

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
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
          
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
              <p className="font-bold text-blue-900">📌 Toko Aktif Saat Ini:</p>
              <p className="text-gray-600">Plafon kredit tersedia aman. Cukup untuk akumulasi draft order tanpa eskalasi HO.</p>
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