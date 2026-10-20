import { useState, useMemo } from 'react';

// Sample data mirroring the provided image spreadsheet structure
const INITIAL_DATA = [
  { npk: '4025', name: 'RIO PURNAMA USMAN', ph: 'TL1', months: { 'Jan-26': '10,0', 'Feb-26': '10,0', 'Mar-26': '9,0', 'Apr-26': '11,0', 'May-26': '11,0', 'Jun-26': '10,0', 'Jul-26': '12,0', 'Aug-26': '12,0', 'Sep-26': '11,0' }, q1: '9,7', perform: '2', oa: '3', rOrder: '1', crossSell: '3', dks: '2' },
  { npk: '4225', name: 'M IQBAL RAISMAN', ph: 'TL1', months: { 'Jan-26': '9,0', 'Feb-26': '12,0', 'Mar-26': '10,0', 'Apr-26': '11,0', 'May-26': '10,0', 'Jun-26': '10,0', 'Jul-26': '10,0', 'Aug-26': '12,0', 'Sep-26': '11,0' }, q1: '10,3', perform: '3', oa: '1', rOrder: '1', crossSell: '3', dks: '3' },
  { npk: '5178', name: 'TEGAR', ph: 'TL1', months: { 'Jan-26': '8,0', 'Feb-26': '10,0', 'Mar-26': '9,0', 'Apr-26': '8,0', 'May-26': '10,0', 'Jun-26': '11,0', 'Jul-26': '11,0', 'Aug-26': '11,0', 'Sep-26': '9,0' }, q1: '9,0', perform: '1', oa: '1', rOrder: '1', crossSell: '3', dks: '3' },
  { npk: '2528', name: 'HENDRY YULIANTO', ph: 'TL2', months: { 'Jan-26': '9,0', 'Feb-26': '10,0', 'Mar-26': '9,0', 'Apr-26': '9,0', 'May-26': '9,0', 'Jun-26': '9,0', 'Jul-26': '10,0', 'Aug-26': '10,0', 'Sep-26': '10,0' }, q1: '9,3', perform: '2', oa: '1', rOrder: '1', crossSell: '3', dks: '3' },
  { npk: '5060', name: 'ANGGA JUANSYAH', ph: 'TL2', months: { 'Jan-26': '8,0', 'Feb-26': '7,0', 'Mar-26': '8,0', 'Apr-26': '9,0', 'May-26': '9,0', 'Jun-26': '8,0', 'Jul-26': '9,0', 'Aug-26': '8,0', 'Sep-26': '9,0' }, q1: '7,7', perform: '1', oa: '1', rOrder: '1', crossSell: '3', dks: '3' },
  { npk: '5207', name: 'AZIZ ZULQAFI', ph: 'TL3', months: { 'Jan-26': '11,0', 'Feb-26': '9,0', 'Mar-26': '10,0', 'Apr-26': '9,0', 'May-26': '9,0', 'Jun-26': '9,0', 'Jul-26': '9,0', 'Aug-26': '8,0', 'Sep-26': '9,0' }, q1: '10,0', perform: '2', oa: '1', rOrder: '1', crossSell: '3', dks: '2' },
  { npk: '4618', name: 'RAVI PERMANA PUTRA', ph: 'TL3', months: { 'Jan-26': '9,0', 'Feb-26': '8,0', 'Mar-26': '9,0', 'Apr-26': '9,0', 'May-26': '10,0', 'Jun-26': '9,0', 'Jul-26': '9,0', 'Aug-26': '8,0', 'Sep-26': '9,0' }, q1: '8,7', perform: '2', oa: '2', rOrder: '1', crossSell: '3', dks: '2' },
  { npk: '4404', name: 'BERNADO FRANSISKUS', ph: 'TL4A', months: { 'Jan-26': '10,0', 'Feb-26': '8,0', 'Mar-26': '9,0', 'Apr-26': '8,0', 'May-26': '10,0', 'Jun-26': '9,0', 'Jul-26': '9,0', 'Aug-26': '8,0', 'Sep-26': '9,0' }, q1: '9,3', perform: '2', oa: '2', rOrder: '2', crossSell: '1', dks: '3' },
  { npk: '99999', name: 'NEW SALESMAN', ph: 'TL4A', months: { 'Jan-26': '9,0', 'Feb-26': '8,0', 'Mar-26': '9,0', 'Apr-26': '8,0', 'May-26': '7,0', 'Jun-26': '7,0', 'Jul-26': '7,0', 'Aug-26': '5,0', 'Sep-26': '5,0' }, q1: '8,7', perform: '1', oa: '1', rOrder: '1', crossSell: '1', dks: '1' },
  { npk: '2451', name: 'ABU YAJID', ph: 'TL4B', months: { 'Jan-26': '9,0', 'Feb-26': '8,0', 'Mar-26': '9,0', 'Apr-26': '10,0', 'May-26': '11,0', 'Jun-26': '9,0', 'Jul-26': '9,0', 'Aug-26': '10,0', 'Sep-26': '11,0' }, q1: '8,7', perform: '2', oa: '2', rOrder: '1', crossSell: '3', dks: '3' },
  { npk: '4410', name: 'EDI PURWANTO', ph: 'TL4B', months: { 'Jan-26': '10,0', 'Feb-26': '8,0', 'Mar-26': '9,0', 'Apr-26': '9,0', 'May-26': '10,0', 'Jun-26': '9,0', 'Jul-26': '9,0', 'Aug-26': '8,0', 'Sep-26': '8,0' }, q1: '9,0', perform: '2', oa: '1', rOrder: '1', crossSell: '2', dks: '2' },
  { npk: '4413', name: 'LUKMAN HARIZ', ph: 'TL5', months: { 'Jan-26': '9,0', 'Feb-26': '9,0', 'Mar-26': '9,0', 'Apr-26': '10,0', 'May-26': '10,0', 'Jun-26': '9,0', 'Jul-26': '11,0', 'Aug-26': '11,0', 'Sep-26': '9,0' }, q1: '9,0', perform: '2', oa: '1', rOrder: '1', crossSell: '3', dks: '3' },
  { npk: '4947', name: 'RAHMAT', ph: 'TL5', months: { 'Jan-26': '9,0', 'Feb-26': '9,0', 'Mar-26': '10,0', 'Apr-26': '10,0', 'May-26': '10,0', 'Jun-26': '9,0', 'Jul-26': '10,0', 'Aug-26': '11,0', 'Sep-26': '10,0' }, q1: '9,3', perform: '2', oa: '1', rOrder: '1', crossSell: '3', dks: '3' },
  { npk: '1584', name: 'SENO AJI SOBIRIN', ph: 'TL6', months: { 'Jan-26': '9,0', 'Feb-26': '9,0', 'Mar-26': '9,0', 'Apr-26': '10,0', 'May-26': '10,0', 'Jun-26': '9,0', 'Jul-26': '11,0', 'Aug-26': '9,0', 'Sep-26': '9,0' }, q1: '9,0', perform: '1', oa: '2', rOrder: '1', crossSell: '3', dks: '2' },
  { npk: '4405', name: 'KAMAL PRIYADI', ph: 'TL6', months: { 'Jan-26': '9,0', 'Feb-26': '9,0', 'Mar-26': '9,0', 'Apr-26': '10,0', 'May-26': '10,0', 'Jun-26': '9,0', 'Jul-26': '10,0', 'Aug-26': '9,0', 'Sep-26': '9,0' }, q1: '9,0', perform: '2', oa: '2', rOrder: '1', crossSell: '3', dks: '2' },
  { npk: '3474', name: 'MARTINO TANDAFATU', ph: 'TL7', months: { 'Jan-26': '8,0', 'Feb-26': '8,0', 'Mar-26': '9,0', 'Apr-26': '8,0', 'May-26': '9,0', 'Jun-26': '7,0', 'Jul-26': '9,0', 'Aug-26': '9,0', 'Sep-26': '10,0' }, q1: '8,3', perform: '2', oa: '1', rOrder: '1', crossSell: '3', dks: '3' },
  { npk: '4561', name: 'HENDRA HERMAWAN', ph: 'TL7', months: { 'Jan-26': '9,0', 'Feb-26': '9,0', 'Mar-26': '9,0', 'Apr-26': '10,0', 'May-26': '10,0', 'Jun-26': '10,0', 'Jul-26': '10,0', 'Aug-26': '11,0', 'Sep-26': '10,0' }, q1: '9,0', perform: '2', oa: '1', rOrder: '1', crossSell: '3', dks: '3' },
  { npk: '4906', name: 'DAMAR SETIAWAN', ph: 'TL7', months: { 'Jan-26': '8,0', 'Feb-26': '9,0', 'Mar-26': '8,0', 'Apr-26': '10,0', 'May-26': '10,0', 'Jun-26': '10,0', 'Jul-26': '9,0', 'Aug-26': '11,0', 'Sep-26': '9,0' }, q1: '8,3', perform: '2', oa: '1', rOrder: '1', crossSell: '3', dks: '3' }
];

export default function App() {
  const [data] = useState(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [phFilter, setPhFilter] = useState('ALL');
  const [selectedSalesman, setSelectedSalesman] = useState(null);
  const [notification, setNotification] = useState(null);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Helper for cell color coding based on values
  const getCellColor = (valStr) => {
    const num = parseFloat(valStr.replace(',', '.'));
    if (isNaN(num)) return 'bg-slate-100 text-slate-800';
    if (num >= 10) return 'bg-emerald-500 text-white font-semibold';
    if (num >= 8.5) return 'bg-amber-400 text-slate-900 font-semibold';
    return 'bg-red-600 text-white font-semibold';
  };

  const getMetricColor = (valStr) => {
    const num = parseInt(valStr, 10);
    if (num >= 3) return 'bg-emerald-600 text-white font-semibold';
    if (num === 2) return 'bg-amber-500 text-white font-semibold';
    return 'bg-red-600 text-white font-semibold';
  };

  // Filtered dataset
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.npk.includes(search);
      const matchPh = phFilter === 'ALL' || item.ph === phFilter;
      return matchSearch && matchPh;
    });
  }, [data, search, phFilter]);

  // Generate scorecards for the modal view
  const getScorecardsForSalesman = (row) => {
    if (!row) return [];
    return [
      { aspect: 'Achievement Sales', indicator: 'Pencapaian Target Penjualan Bulanan (Sept 2026)', value: row.months['Sep-26'] },
      { aspect: 'Performance Index (Perform)', indicator: 'Indeks Kinerja Komprehensif Semester', value: `${row.perform},0` },
      { aspect: 'Outlet Active (OA)', indicator: 'Aktivasi Toko & Pelanggan Aktif Baru', value: `${row.oa},0` },
      { aspect: 'Regular Order (R.Order)', indicator: 'Konsistensi Frekuensi Order Berkala', value: `${row.rOrder},0` },
      { aspect: 'Cross Selling', indicator: 'Diversifikasi Penjualan Produk Lain', value: `${row.crossSell},0` },
      { aspect: 'Daily KPI System (DKS)', indicator: 'Kepatuhan & Laporan Kinerja Harian', value: `${row.dks},0` }
    ];
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 pb-12">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-slate-700 animate-bounce">
          <span>🔔</span> {notification}
        </div>
      )}

      {/* Top Header */}
      <header className="bg-slate-900 text-white px-6 py-4 shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-base font-bold flex items-center gap-2">
            📊 Salesman Performance Master Matrix & Scorecard 2026
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Evaluation period: January 2026 – September 2026 • Official Sheet Sync Active</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search NPK or Salesman..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-800 text-xs px-3 py-2 rounded border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 w-full md:w-60"
          />
          <select
            value={phFilter}
            onChange={(e) => setPhFilter(e.target.value)}
            className="bg-slate-800 text-xs px-3 py-2 rounded border border-slate-700 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All PH (Levels)</option>
            <option value="TL1">TL1</option>
            <option value="TL2">TL2</option>
            <option value="TL3">TL3</option>
            <option value="TL4A">TL4A</option>
            <option value="TL4B">TL4B</option>
            <option value="TL5">TL5</option>
            <option value="TL6">TL6</option>
            <option value="TL7">TL7</option>
          </select>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-4 md:p-6 max-w-[1450px] mx-auto">
        <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
          
          {/* Table Header Info Bar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="text-xs font-semibold text-slate-700">
              Showing <span className="text-blue-600 font-bold">{filteredData.length}</span> Salesmen Records (Showing exactly 5 rows in scrollable view)
            </div>
            <div className="flex items-center gap-4 text-[11px] font-medium text-slate-600">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-500 inline-block rounded-sm"></span> High (&gt;= 10.0)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-amber-400 inline-block rounded-sm"></span> Medium (8.5 - 9.9)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-600 inline-block rounded-sm"></span> Low (&lt; 8.5)</span>
            </div>
          </div>

          {/* Spreadsheet Table Wrapper - strictly constrained height to show ~5 rows before scrolling */}
          <div className="overflow-x-auto overflow-y-auto max-h-[300px]" role="region" aria-label="Salesman Master Table" tabIndex="0">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-slate-900 text-white sticky top-0 z-20 text-center font-bold">
                  <th className="p-2.5 border border-slate-700 sticky left-0 bg-slate-900 z-30">NPK</th>
                  <th className="p-2.5 border border-slate-700 sticky left-[68px] bg-slate-900 z-30 text-left min-w-[180px]">SALESMAN</th>
                  <th className="p-2.5 border border-slate-700">PH</th>
                  <th className="p-2.5 border border-slate-700">Jan-26</th>
                  <th className="p-2.5 border border-slate-700">Feb-26</th>
                  <th className="p-2.5 border border-slate-700">Mar-26</th>
                  <th className="p-2.5 border border-slate-700 bg-slate-800">Q1</th>
                  <th className="p-2.5 border border-slate-700">Apr-26</th>
                  <th className="p-2.5 border border-slate-700">May-26</th>
                  <th className="p-2.5 border border-slate-700">Jun-26</th>
                  <th className="p-2.5 border border-slate-700">Jul-26</th>
                  <th className="p-2.5 border border-slate-700">Aug-26</th>
                  <th className="p-2.5 border border-slate-700">Sep-26</th>
                  <th className="p-2.5 border border-slate-700 bg-slate-800">Perform</th>
                  <th className="p-2.5 border border-slate-700 bg-red-800">OA</th>
                  <th className="p-2.5 border border-slate-700 bg-red-800">R.Order</th>
                  <th className="p-2.5 border border-slate-700 bg-emerald-800">Cross Sell</th>
                  <th className="p-2.5 border border-slate-700 bg-emerald-800">DKS</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr
                    key={row.npk}
                    onClick={() => setSelectedSalesman(row)}
                    className="border-b border-slate-200 hover:bg-blue-50 cursor-pointer transition-colors text-center"
                  >
                    <td className="p-2 border border-slate-200 font-bold sticky left-0 bg-white z-10 text-slate-800">{row.npk}</td>
                    <td className="p-2 border border-slate-200 font-semibold sticky left-[68px] bg-white z-10 text-left text-slate-800">{row.name}</td>
                    <td className="p-2 border border-slate-200 font-medium bg-slate-50">{row.ph}</td>
                    
                    {/* Months data */}
                    {Object.entries(row.months).map(([mKey, mVal]) => (
                      <td key={mKey} className={`p-2 border border-slate-200 ${getCellColor(mVal)}`}>
                        {mVal}
                      </td>
                    ))}

                    <td className="p-2 border border-slate-200 font-bold bg-slate-100 text-slate-800">{row.q1}</td>
                    <td className={`p-2 border border-slate-200 ${getMetricColor(row.perform)}`}>{row.perform}</td>
                    <td className={`p-2 border border-slate-200 ${getMetricColor(row.oa)}`}>{row.oa}</td>
                    <td className={`p-2 border border-slate-200 ${getMetricColor(row.rOrder)}`}>{row.rOrder}</td>
                    <td className={`p-2 border border-slate-200 ${getMetricColor(row.crossSell)}`}>{row.crossSell}</td>
                    <td className={`p-2 border border-slate-200 ${getMetricColor(row.dks)}`}>{row.dks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Scorecard Detail Matching User Request */}
      {selectedSalesman && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 border border-slate-200 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start pb-3 border-b border-slate-200 mb-4">
              <div>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded mr-2">NPK: {selectedSalesman.npk}</span>
                <span className="text-[10px] bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded">PH: {selectedSalesman.ph}</span>
                <h2 className="text-base font-extrabold text-slate-900 mt-1 uppercase">
                  {selectedSalesman.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedSalesman(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1 rounded-full text-xs font-bold transition-colors"
              >
                ✕ Close
              </button>
            </div>

            {/* Scorecard Table Component matching user snippet */}
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-2 min-w-0">
                  📋 Detail Scorecard Aspek & Key Performance Indicators (September 2026)
                </h3>
                <span className="text-[10px] text-gray-500 shrink-0">Form Evaluasi Resmi: 03/10/2026</span>
              </div>

              <div className="scorecard-table-scroll max-w-full overflow-x-auto rounded border border-slate-200" role="region" aria-label="Tabel detail scorecard" tabIndex="0">
                <table className="scorecard-table w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="p-2.5 border border-slate-700 w-[20%]">ASPECTS</th>
                      <th className="p-2.5 border border-slate-700 w-[38%]">KEY INDICATORS</th>
                      <th className="p-2.5 border border-slate-700 text-center w-[27%]" colSpan="3">SCORE INDICATORS</th>
                      <th className="p-2.5 border border-slate-700 text-center w-[15%]">FINAL VALUE</th>
                    </tr>
                    <tr className="bg-slate-800 text-white text-center text-[10px]">
                      <th colSpan="2"></th>
                      <th className="p-1 border border-slate-700 bg-red-700">LOW (1)</th>
                      <th className="p-1 border border-slate-700 bg-amber-600">MED (2)</th>
                      <th className="p-1 border border-slate-700 bg-emerald-700">HIGH (3)</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {getScorecardsForSalesman(selectedSalesman).map((item, idx) => {
                      const score = Number(String(item.value).replace(',', '.'));
                      const statusText = item.statusText || (score >= 3 ? 'HIGH (3)' : score >= 2 ? 'MED (2)' : 'LOW (1)');
                      const statusColor = item.statusColor || (score >= 3 ? 'bg-emerald-600' : score >= 2 ? 'bg-amber-600' : 'bg-red-600');

                      return (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="p-2.5 font-bold text-slate-700 border">{item.aspect}</td>
                          <td className="p-2.5 text-slate-600 border">{item.indicator}</td>
                          <td className="p-2.5 border text-center" colSpan="3">
                            <span className={`inline-block px-3 py-1 text-white font-bold rounded text-[11px] ${statusColor}`}>
                              {statusText}
                            </span>
                          </td>
                          <td className="p-2.5 border text-center font-extrabold text-slate-800 bg-slate-50">{item.value}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-slate-50 p-2.5 rounded border border-slate-200 text-xs font-bold">
                <span className="break-words">TOTAL AKUMULASI SKOR KINERJA: {selectedSalesman.name}</span>
                <span className="bg-amber-500 text-white px-3 py-0.5 rounded text-xs">MEDIUM / REVIEW ACTIVE</span>
              </div>
            </div>

            {/* Action buttons inside modal */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  notify(`Scorecard report for ${selectedSalesman.name} exported successfully!`);
                  setSelectedSalesman(null);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded text-xs shadow transition-colors"
              >
                📥 Export Individual Report
              </button>
              <button
                onClick={() => setSelectedSalesman(null)}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2 rounded text-xs shadow transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}