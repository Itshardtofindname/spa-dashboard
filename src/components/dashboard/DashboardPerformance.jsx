import SalesProfileCard from './SalesProfileCard';
import ScorecardTable from './ScorecardTable';
import MonthlyTrackRecord from './MonthlyTrackRecord';
import ActionPlanSection from './ActionPlanSection';
import { useSalesPerformance } from '../../composables/useSalesPerformance';
import ResponsiveSelect from '../ResponsiveSelect';
import GoogleDriveScorecardImport from '../GoogleDriveScorecardImport';
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
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-2 w-full md:flex md:w-auto">
          <span className="text-xs font-bold leading-tight text-slate-600">SALES OFFICE:</span>
          <ResponsiveSelect
            value={selectedOffice}
            onChange={(e) => setSelectedOffice(e.target.value)}
            className="min-w-0 text-xs border border-slate-300 rounded px-2.5 py-1.5 bg-slate-50 font-medium w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-rose-800"
          >
            {availableOffices.map((office, idx) => (
              <option key={idx} value={office}>
                {office}
              </option>
            ))}
          </ResponsiveSelect>
        </div>

        {/* 2. Filter Grup Product (Filter Bertingkat) */}
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-2 w-full md:flex md:w-auto">
          <span className="text-xs font-bold leading-tight text-slate-600">GRUP PRODUCT:</span>
          <ResponsiveSelect
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            disabled={!availableGroups.length}
            className="min-w-0 text-xs border border-slate-300 rounded px-2.5 py-1.5 bg-slate-50 font-medium w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-rose-800 disabled:opacity-50"
          >
            {availableGroups.map((group, idx) => (
              <option key={idx} value={group}>
                {group}
              </option>
            ))}
          </ResponsiveSelect>
        </div>

        {/* 3. Filter Salesman (Filter Bertingkat) */}
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-2 w-full md:flex md:w-auto">
          <span className="text-xs font-bold leading-tight text-slate-600">SALESMAN:</span>
          <ResponsiveSelect
            value={selectedSalesman}
            onChange={(e) => setSelectedSalesman(e.target.value)}
            disabled={!availableSalesmen.length}
            className="min-w-0 text-xs border border-slate-300 rounded px-2.5 py-1.5 bg-slate-50 font-medium w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-rose-800 disabled:opacity-50"
          >
            {availableSalesmen.map((sales, idx) => (
              <option key={idx} value={sales}>
                {sales}
              </option>
            ))}
          </ResponsiveSelect>
        </div>
      </div>

      <GoogleDriveScorecardImport />

      {/* Indicator Status */}
      {loading && (
        <div className="bg-white p-6 rounded-lg border border-slate-200 text-center text-xs text-slate-500 shadow-sm">
          Memuat data ...
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-4 rounded-lg flex justify-between items-center shadow-sm font-semibold">
          <span>Gagal mengambil data: {error}</span>
          <button onClick={refetch} className="underline hover:text-rose-900 ml-2">
            Coba Lagi
          </button>
        </div>
      )}

      {/* Render Widget Dashboard */}
      {!loading && !error && currentData && (
        <>
          <SalesProfileCard data={currentData} />          
          <ScorecardTable
            salesOffice={selectedOffice}
            reportPeriod="2026-10-01"
            selectedNpk={currentData.identity?.npk}
          />
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
