import { useState } from 'react';
import ResponsiveSelect from './ResponsiveSelect';
import { sellingToolkitData } from '../data/sellingToolkitData';
import { salesmanList, customerList, dayList } from '../data/dataSales';

export default function SellingToolkit() {
  const data = sellingToolkitData;
  const [selectedSalesman, setSelectedSalesman] = useState(salesmanList[0]);
  const [selectedCustomer, setSelectedCustomer] = useState(customerList[0]);
  const [selectedDay, setSelectedDay] = useState(dayList[0]);

  return (
    <div className="space-y-4 text-slate-800">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 2xl:grid-cols-3">
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-1.5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-3">
            <span className="whitespace-nowrap text-xs font-bold leading-tight text-slate-600">Salesman:</span>
            <ResponsiveSelect 
              value={selectedSalesman} 
              onChange={(e) => setSelectedSalesman(e.target.value)}
              className="min-w-0 w-full h-11 text-sm border border-slate-300 rounded-md px-3 bg-slate-50 font-medium"
            >
              {salesmanList.map((salesman, idx) => (
                <option key={idx} value={salesman}>{salesman}</option>
              ))}
            </ResponsiveSelect>
          </div>

          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-1.5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-3">
            <span className="whitespace-nowrap text-xs font-bold leading-tight text-slate-600">Jadwal Visit:</span>
            <ResponsiveSelect 
              value={selectedDay} 
              onChange={(e) => setSelectedDay(e.target.value)}
              className="min-w-0 w-full h-11 text-sm border border-slate-300 rounded-md px-3 bg-slate-50 font-medium"
            >
              {dayList.map((day, idx) => (
                <option key={idx} value={day}>{day}</option>
              ))}
            </ResponsiveSelect>
          </div>

          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-1.5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-3">
            <span className="whitespace-nowrap text-xs font-bold leading-tight text-slate-600">Active Customer ID:</span>
            <ResponsiveSelect 
              value={selectedCustomer} 
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="min-w-0 w-full h-11 text-sm border border-slate-300 rounded-md px-3 bg-slate-50 font-medium"
            >
              {customerList.map((customer, idx) => (
                <option key={idx} value={customer}>{customer}</option>
              ))}
            </ResponsiveSelect>
          </div>
        </div>

      </div>

      {/* Status Visit Alert */}
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        {data.visitStatus}
      </div>

      {/* Grid Section 1 & Section 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* SECTION 01: INFORMASI TOKO (Col 5) */}
        <div className="lg:col-span-5 bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-xs font-bold text-red-600 uppercase flex items-center gap-1">
              📌 SECTION 01: INFORMASI TOKO
            </h3>
            <span className="text-[10px] text-gray-400">Fokus profil outlet & status limit kredit saat visit</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded border">
            <div>
              <span className="text-gray-500">Customer ID:</span>
              <p className="font-bold text-slate-900">{data.storeId}</p>
            </div>
            <div>
              <span className="text-gray-500">Nama Outlet:</span>
              <p className="font-bold text-slate-900">{data.storeName}</p>
            </div>
            <div>
              <span className="text-gray-500">Owner / SO [SAP]:</span>
              <p className="font-bold text-slate-900">{data.owner}</p>
            </div>
            <div>
              <span className="text-gray-500">NPK Salesman:</span>
              <p className="font-bold text-slate-900">{data.npkSalesman}</p>
            </div>
          </div>

          {/* Plafon Kredit Finansial */}
          <div className="border rounded p-3 bg-white space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">PLAFON KREDIT FINANSIAL [SAP FI]</span>
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">{data.creditLimit.status}</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-500">Sisa Plafon (Available Credit):</span>
              <h2 className="text-xl font-extrabold text-emerald-700">{data.creditLimit.remainingCredit}</h2>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[68.4%]"></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-500">
              <span>Terpakai: Rp 24.157.116 (41.6%)</span>
              <span>Total Credit Limit: Rp 58.000.000</span>
            </div>
          </div>

          <div className="text-[11px] space-y-1 text-slate-600 bg-slate-50 p-2.5 rounded">
            <p>🔒 Manual Block Status: <strong className="text-emerald-700">Aman (None)</strong></p>
            <p>⚠️ Overdue Invoices: <strong className="text-slate-800">0 Dokumen</strong></p>
          </div>
        </div>

        {/* SECTION 02: MONITORING ACHIEVEMENT PROGRAM (Col 7) */}
        <div className="lg:col-span-7 bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-xs font-bold text-blue-700 uppercase flex items-center gap-1">
              📊 SECTION 02: MONITORING ACHIEVEMENT PROGRAM
            </h3>
            <span className="text-[10px] text-gray-500">Sync: Hari Ini 09:30</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.programs.map((prog, idx) => (
              <div key={idx} className="border rounded-lg p-3 bg-slate-50/50 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-slate-800">{prog.title}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${prog.statusColor}`}>
                    {prog.status}
                  </span>
                </div>
                <p className="text-[10px] text-gray-500">{prog.period}</p>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Target: {prog.target}</span>
                  <span className="text-emerald-700">{prog.realization}</span>
                </div>
                {prog.reward && (
                  <p className="text-[10px] text-purple-700 font-bold bg-purple-50 p-1 rounded">🎁 {prog.reward}</p>
                )}
                {prog.balance && (
                  <p className="text-[10px] text-red-600 font-bold bg-red-50 p-1 rounded">⚠️ Balance: {prog.balance}</p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SECTION 03: REKOMENDASI CROSS-SELL & UP-SELL ENGINE */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col gap-2 border-b pb-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-2">
            💡 SECTION 03: REKOMENDASI CROSS-SELL & UP-SELL ENGINE
          </h3>
          <div className="grid w-full grid-cols-3 gap-1 text-[10px] sm:w-auto sm:text-xs">
            <button className="min-w-0 rounded bg-slate-900 px-1.5 py-1.5 leading-tight text-white sm:px-2">Semua Part (11)</button>
            <button className="min-w-0 rounded bg-gray-100 px-1.5 py-1.5 leading-tight text-slate-700 sm:px-2">Up-Sell (7)</button>
            <button className="min-w-0 rounded bg-gray-100 px-1.5 py-1.5 leading-tight text-slate-700 sm:px-2">Cross-Sell (4)</button>
          </div>
        </div>

        {/* Tabel Cross Sell */}
        <p className="mb-2 text-[10px] text-slate-500 sm:hidden">Geser tabel ke samping untuk melihat semua kolom.</p>
        <div className="cross-sell-scroll max-w-full overflow-x-auto rounded border border-slate-200" role="region" aria-label="Tabel rekomendasi cross-sell dan up-sell" tabIndex="0">
          <table className="cross-sell-table w-full text-left border-collapse text-xs">
            <colgroup>
              {[145, 105, 70, 70, 70, 75, 70, 115, 120].map((width, index) => (
                <col key={index} style={{ width }} />
              ))}
            </colgroup>
            <thead>
              <tr className="bg-slate-900 text-white text-[11px]">
                <th className="p-2 border">KATEGORI PART</th>
                <th className="p-2 border">SKU FOKUS</th>
                <th className="p-2 border text-center">AVG 24 BLN</th>
                <th className="p-2 border text-center">INQ (MIN)</th>
                <th className="p-2 border text-center">SO (AKTUAL)</th>
                <th className="p-2 border text-center">SO (SELISIH)</th>
                <th className="p-2 border text-center">% GROWTH</th>
                <th className="p-2 border text-center">TIPE REKOMENDASI</th>
                <th className="p-2 border text-center">AKSI CEPAT</th>
              </tr>
            </thead>
            <tbody>
              {data.crossSellItems.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-slate-50 text-[11px]">
                  <td className="p-2 font-bold text-slate-800 border">{item.category}</td>
                  <td className="p-2 text-slate-600 border">{item.sku}</td>
                  <td className="p-2 text-center border">{item.avg24m}</td>
                  <td className="p-2 text-center border">{item.reqMin}</td>
                  <td className="p-2 text-center font-bold border">{item.actual}</td>
                  <td className="p-2 text-center border text-red-600 font-semibold">{item.selisih}</td>
                  <td className="p-2 text-center border font-semibold">{item.growth}</td>
                  <td className="p-2 text-center border">
                      <span className={`inline-block whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-bold ${item.type === 'UP-SELL' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="p-2 text-center border">
                    {item.actionVal !== undefined ? (
                      <span className="font-bold">{item.actionVal}</span>
                    ) : (
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] px-2 py-1 rounded font-medium">
                        {item.actionText}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Submit Order Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-[10px] text-gray-500 block">Total Order Kunjungan Ini:</span>
          <span className="text-lg font-extrabold text-blue-600">Rp 9.872.083</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-500 block">Simulasi Sisa Plafon Setelah PO:</span>
          <span className="text-lg font-extrabold text-emerald-600">Rp 23.970.801</span>
        </div>
        <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:grid-cols-3">
          <button className="min-h-11 flex items-center justify-center border border-slate-300 text-slate-700 px-3 py-2 rounded text-xs font-bold leading-tight hover:bg-slate-50">
            🖨️ Cetak PO
          </button>
          <button className="min-h-11 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded text-xs font-bold leading-tight">
            💬 Kirim WA ke Toko
          </button>
          <button className="min-h-11 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-extrabold leading-tight shadow">
            📤 Submit Order ke BOSNET & SAP
          </button>
        </div>
      </div>

    </div>
  );
}
