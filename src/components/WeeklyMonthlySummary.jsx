import { useState } from 'react';
import { weeklySummaryData } from '../data/weeklySummaryData';
import CalendarPicker from './CalendarPicker'; // Impor komponen kalender mandiri kita

export default function WeeklyMonthlySummary() {
  const data = weeklySummaryData;

  // State untuk tanggal awal dan tanggal akhir (format: "YYYY-MM-DD")
  const [startDate, setStartDate] = useState("2025-12-01");
  const [endDate, setEndDate] = useState("2025-12-30");

  return (
    <div className="space-y-4 text-slate-800">
      
      {/* TOP HEADER */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-bold">{data.header.cluster}</span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold border">{data.header.soArea}</span>
          </div>
          <h2 className="text-base font-extrabold text-slate-900">{data.header.title}</h2>
          <p className="text-xs text-slate-500">{data.header.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-slate-900 flex items-center gap-1">
            ⚖️ Bandingkan W3
          </button>
          <button className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-emerald-700 flex items-center gap-1">
            📥 Export Laporan
          </button>
        </div>
      </div>

      {/* FILTER & DATE-TO-DATE CUSTOM CALENDAR BAR */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col xl:flex-row justify-between items-center gap-3 text-xs">
        
        {/* Sisi Kiri: Filter Tampilan & Date-to-Date */}
        <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
          <span className="font-bold text-slate-700 whitespace-nowrap">Filter:</span>
          
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border">
            <button className="px-2.5 py-1 font-semibold text-slate-700 rounded bg-white shadow-sm">Bulan Ini</button>
            <button className="px-2.5 py-1 font-semibold text-slate-600 hover:text-slate-900">Bulan Lalu</button>
            <button className="px-2.5 py-1 font-semibold text-slate-600 hover:text-slate-900">YTD</button>
          </div>
          
          <span className="text-slate-300 hidden sm:inline">|</span>

          {/* Date-to-Date Ringkas */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg p-1">
            <span className="text-slate-500 font-bold px-1">Dari</span>
            <CalendarPicker 
              selectedDate={startDate}
              onDateChange={(newDate) => setStartDate(newDate)}
            />
            
            <span className="text-slate-500 font-bold px-0.5">s/d</span>
            
            <CalendarPicker 
              selectedDate={endDate}
              onDateChange={(newDate) => setEndDate(newDate)}
            />

            <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md font-bold text-xs hover:bg-blue-700 transition shadow-sm ml-1">
              Terapkan
            </button>
          </div>
        </div>

        {/* Sisi Kanan: Pilihan Minggu (Semua, W1 - W4) */}
        <div className="flex items-center gap-1 w-full xl:w-auto justify-end">
          <span className="text-slate-400 text-[11px] font-medium mr-1 hidden sm:inline">Minggu:</span>
          <button className="px-2.5 py-1.5 bg-slate-100 font-bold rounded-md hover:bg-slate-200 transition">Semua</button>
          <button className="px-2.5 py-1.5 bg-slate-100 font-semibold rounded-md hover:bg-slate-200 transition">W1</button>
          <button className="px-2.5 py-1.5 bg-slate-100 font-semibold rounded-md hover:bg-slate-200 transition">W2</button>
          <button className="px-2.5 py-1.5 bg-blue-600 text-white font-bold rounded-md shadow transition">W3 (Aktif)</button>
          <button className="px-2.5 py-1.5 bg-slate-100 font-semibold rounded-md hover:bg-slate-200 transition">W4 (Proyeksi)</button>
        </div>

      </div>

      {/* SALESMAN INFO CARD */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">SA</span>
            <div>
              <h3 className="font-extrabold text-slate-900">{data.salesman.name} <span className="font-normal text-slate-500">(NPK {data.salesman.npk})</span></h3>
              <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-1.5 py-0.5 rounded">{data.salesman.circle}</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">{data.salesman.area}</p>
          <p className="text-[11px] text-slate-600">Supervisor: <strong>{data.salesman.supervisor}</strong></p>
        </div>

        <div className="border-x border-slate-200 px-4 space-y-2">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Target Bulanan (Dec 2025)</span>
          <div className="text-xl font-extrabold text-slate-900">{data.salesman.targetBulanan}</div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full w-[78%]"></div>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">Progres Aktual: 78.5% tercapai</span>
        </div>

        <div className="space-y-2 flex flex-col justify-center">
          <div className="flex justify-between">
            <span className="text-slate-500">Sisa Hari Kerja:</span>
            <strong className="text-slate-900">{data.salesman.sisaHariKerja}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Closing Status:</span>
            <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px]">{data.salesman.closingStatus}</span>
          </div>
        </div>
      </div>

      {/* WEEKLY PERFORMANCE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {data.weeklyCards.map((card, idx) => (
          <div key={idx} className={`p-3 rounded-lg border text-xs space-y-2 ${card.isCurrent ? 'bg-blue-50/70 border-blue-300 ring-1 ring-blue-400 shadow-sm' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800">{card.week}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${card.statusColor}`}>{card.status}</span>
            </div>
            <div className="text-lg font-extrabold text-blue-600">{card.omzet}</div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Pencapaian:</span>
              <strong className="text-emerald-700">{card.pencapaian}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* EVALUASI 3 PILAR KINERJA SPA */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase flex items-center gap-1">
              📊 Evaluasi 3 Pilar Kinerja SPA
            </h3>
            <p className="text-[10px] text-slate-500">Framework GCC Maslah: Result (3.0), Strategic Alignment (3.0), dan Process (3.0)</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Skor Komposit</span>
            <span className="text-lg font-extrabold text-blue-600">{data.threePillars.totalScore} <span className="text-xs text-slate-500">/ 9.0</span></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-3 bg-slate-50/50 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-slate-800">{data.threePillars.pillar1.title}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${data.threePillars.pillar1.badgeColor}`}>{data.threePillars.pillar1.badge}</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">{data.threePillars.pillar1.score} <span className="text-xs font-normal text-slate-500">/ {data.threePillars.pillar1.max}</span></div>
            <ul className="text-[11px] space-y-1 text-slate-600">
              <li>• {data.threePillars.pillar1.desc1}</li>
              <li>• {data.threePillars.pillar1.desc2}</li>
              <li>• {data.threePillars.pillar1.desc3}</li>
            </ul>
            {/* <p className="text-[10px] text-amber-700 bg-amber-50 p-1.5 rounded font-medium">⚠️ {data.threePillars.pillar1.note}</p> */}
          </div>

          <div className="border rounded-lg p-3 bg-slate-50/50 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-slate-800">{data.threePillars.pillar2.title}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${data.threePillars.pillar2.badgeColor}`}>{data.threePillars.pillar2.badge}</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">{data.threePillars.pillar2.score} <span className="text-xs font-normal text-slate-500">/ {data.threePillars.pillar2.max}</span></div>
            <ul className="text-[11px] space-y-1 text-slate-600">
              <li>• {data.threePillars.pillar2.desc1}</li>
              <li>• {data.threePillars.pillar2.desc2}</li>
              <li>• {data.threePillars.pillar2.desc3}</li>
            </ul>
            {/* <p className="text-[10px] text-emerald-700 bg-emerald-50 p-1.5 rounded font-medium">✅ {data.threePillars.pillar2.note}</p> */}
          </div>

          <div className="border rounded-lg p-3 bg-slate-50/50 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-slate-800">{data.threePillars.pillar3.title}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${data.threePillars.pillar3.badgeColor}`}>{data.threePillars.pillar3.badge}</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">{data.threePillars.pillar3.score} <span className="text-xs font-normal text-slate-500">/ {data.threePillars.pillar3.max}</span></div>
            <ul className="text-[11px] space-y-1 text-slate-600">
              <li>• {data.threePillars.pillar3.desc1}</li>
              <li>• {data.threePillars.pillar3.desc2}</li>
              <li>• {data.threePillars.pillar3.desc3}</li>
            </ul>
            {/* <p className="text-[10px] text-purple-700 bg-purple-50 p-1.5 rounded font-medium">✨ {data.threePillars.pillar3.note}</p> */}
          </div>
        </div>
      </div>

      {/* REKAPITULASI 8 SKU STRATEGIS */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2 gap-2">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase flex items-center gap-1">
              📦 Rekapitulasi 8 SKU Strategis
            </h3>
            <p className="text-[10px] text-slate-500">Pencapaian volume, omzet, dan evaluasi SKU per MTD Desember 2025</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-slate-100 border text-slate-700 rounded text-xs font-semibold">🔍 Filter Kategori</button>
            <button className="px-3 py-1 bg-slate-100 border text-slate-700 rounded text-xs font-semibold">↕️ Sort by Achieved %</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white text-[11px]">
                <th className="p-2 border">SKU / KATEGORI</th>
                <th className="p-2 border">TARGET BULANAN</th>
                <th className="p-2 border">REALISASI MTD</th>
                <th className="p-2 border text-center">% ACHIEVED</th>
                <th className="p-2 border text-center">STATUS</th>
                <th className="p-2 border">TOP OUTLET</th>
              </tr>
            </thead>
            <tbody>
              {data.skuStrategies.map((sku, idx) => (
                <tr key={idx} className="border-b hover:bg-slate-50 text-[11px]">
                  <td className="p-2 font-bold text-slate-800 border">{sku.category}</td>
                  <td className="p-2 text-slate-600 border">{sku.targetMonth}</td>
                  <td className="p-2 font-medium text-slate-900 border">{sku.realMtd}</td>
                  <td className="p-2 text-center font-extrabold border text-emerald-700">{sku.ach}</td>
                  <td className="p-2 text-center border">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${sku.statusColor || 'bg-emerald-100 text-emerald-800'}`}>
                      {sku.status}
                    </span>
                  </td>
                  <td className="p-2 text-slate-700 border">{sku.topOutlet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}