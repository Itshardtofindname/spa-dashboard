import { salesmanData } from './data/mockData';
import Navbar from './components/Navbar';
import SalesProfileCard from './components/SalesProfileCard';
import ScorecardTable from './components/ScorecardTable';
import MonthlyTrackRecord from './components/MonthlyTrackRecord';
import ActionPlanSection from './components/ActionPlanSection';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-8">
      <Navbar />

      <main className="max-w-7xl mx-auto p-4 space-y-4">
        {/* Top Control Bar */}
        <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-600">SWITCH SALESMAN:</span>
            <select className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-slate-50 font-medium w-full md:w-64">
              <option>NPK 1584 - SENO AJI SOBIRIN (Field Salesman)</option>
            </select>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-slate-600">TOLOK UKUR SCORE:</span>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">🟢 HIGH: 12-15</span>
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">🟡 MEDIUM: 9-11</span>
            <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-semibold">🔴 LOW: 5-8</span>
          </div>
        </div>

        <SalesProfileCard data={salesmanData} />
        <ScorecardTable scorecards={salesmanData.scorecards} />
        <MonthlyTrackRecord records={salesmanData.monthlyRecords} />
        <ActionPlanSection data={salesmanData} />
      </main>
    </div>
  );
}