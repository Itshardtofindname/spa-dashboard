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
            <span className="text-xs font-bold text-slate-600">SALES OFFICE:</span>
            <select className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-slate-50 font-medium w-full md:w-64">
              <option>S001 - SO SERANG</option>
              <option>S002 - SO UTIM</option>
              <option>S003 - SO SERPONG</option>
              <option>S004 - SO SELATAN</option>
              <option>S005 - SO PUSPAR</option>
            </select>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-600">GRUP PRODUCT:</span>
            <select className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-slate-50 font-medium w-full md:w-64">
              <option>TL1 - AP2</option>
              <option>TL2 - ATI-ATU-CCO-OA2</option>
              <option>TL3 - AB4-ATD-OA4</option>
              <option>TL4A - AP4-F/NF</option>
              <option>TL4B - INB-TI4-TU4</option>
              <option>TL5 - GS2-KY2-KYZ</option>
              <option>TL6 - GS4-KY4-AKB</option>
              <option>TL7 - FP2-FTU-FBO</option>
            </select>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-600">SALESMAN:</span>
            <select className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-slate-50 font-medium w-full md:w-64">
              <option>NPK4225 - IQBAL</option>
              <option>NPK5178 - TEGAR</option>
              <option>NPK4025 - RIO</option>
              <option>NPK2528 - HENDRY</option>
              <option>NPK5060 - ANGGA</option>
              <option>NPK5207 - AZIZ</option>
              <option>NPK4618 - RAVI</option>
              <option>NPK4410 - EDI PURWANTO</option>
              <option>NPK2451 - ABU YAJID</option>
              <option>NPK4402 - BERNARDO</option>
              <option>NPK4413 - LUKMAN</option>
              <option>NPK4947 - RAHMAT</option>
              <option>NPK4405 - KAMAL</option>
              <option>NPK1584 - SENO AJI</option>
              <option>NPK3474 - MARTINO</option>
              <option>NPK4561 - HENDRA</option>
              <option>NPK4906 - DAMAR</option>
            </select>
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