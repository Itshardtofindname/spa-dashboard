import SalesProfileCard from './SalesProfileCard';
import ScorecardTable from './ScorecardTable';
import MonthlyTrackRecord from './MonthlyTrackRecord';
import ActionPlanSection from './ActionPlanSection';
import { useSalesPerformance } from '../../composables/useSalesPerformance';

export default function DashboardPerformance() {
  const {
    availableOffices,
    availableGroups,
    availableSalesmen,
    selectedOffice,
    setSelectedOffice,
    selectedGroup,
    setSelectedGroup,
    selectedSalesman,
    setSelectedSalesman,
    currentData,
    loading,
    error,
    refetch,
  } = useSalesPerformance();

  return (
    <div className="space-y-4">
      {/* Dynamic Cascading Filter Selection Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-3">
        
        {/* 1. Filter Sales Office */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-600">SALES OFFICE:</span>
          <select
            value={selectedOffice}
            onChange={(e) => setSelectedOffice(e.target.value)}
            className="text-xs border border-slate-300 rounded px-2.5 py-1.5 bg-slate-50 font-medium w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-rose-800"
          >
            {availableOffices.map((office, idx) => (
              <option key={idx} value={office}>
                {office}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Filter Grup Product (Filter Bertingkat) */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-600">GRUP PRODUCT:</span>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            disabled={!availableGroups.length}
            className="text-xs border border-slate-300 rounded px-2.5 py-1.5 bg-slate-50 font-medium w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-rose-800 disabled:opacity-50"
          >
            {availableGroups.map((group, idx) => (
              <option key={idx} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Filter Salesman (Filter Bertingkat) */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-600">SALESMAN:</span>
          <select
            value={selectedSalesman}
            onChange={(e) => setSelectedSalesman(e.target.value)}
            disabled={!availableSalesmen.length}
            className="text-xs border border-slate-300 rounded px-2.5 py-1.5 bg-slate-50 font-medium w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-rose-800 disabled:opacity-50"
          >
            {availableSalesmen.map((sales, idx) => (
              <option key={idx} value={sales}>
                {sales}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Indicator Status */}
      {loading && (
        <div className="bg-white p-6 rounded-lg border border-slate-200 text-center text-xs text-slate-500 shadow-sm">
          ⚡ Memuat data performa salesman dari Supabase...
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-4 rounded-lg flex justify-between items-center shadow-sm font-semibold">
          <span>❌ Gagal mengambil data: {error}</span>
          <button onClick={refetch} className="underline hover:text-rose-900 ml-2">
            Coba Lagi
          </button>
        </div>
      )}

      {/* Render Widget Dashboard */}
      {!loading && !error && currentData && (
        <>
          <SalesProfileCard data={currentData} />
          <ScorecardTable scorecards={currentData.scorecard || []} />
          <MonthlyTrackRecord records={currentData.trackRecord || []} />
          <ActionPlanSection data={currentData} />
        </>
      )}

      {!loading && !error && !currentData && (
        <div className="bg-white p-8 rounded-lg border border-slate-200 text-center text-xs text-slate-400 shadow-sm">
          Belum ada data performa salesman untuk kombinasi filter ini.
        </div>
      )}
    </div>
  );
}