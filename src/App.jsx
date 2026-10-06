import { useState } from 'react';
import Navbar from './components/Navbar';
import SalesProfileCard from './components/SalesProfileCard';
import ScorecardTable from './components/ScorecardTable';
import MonthlyTrackRecord from './components/MonthlyTrackRecord';
import ActionPlanSection from './components/ActionPlanSection';
import SellingToolkit from './components/SellingToolkit';
import { databaseSales, salesOfficeList, grupProductList, salesmanList } from './data/dataSales';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedOffice, setSelectedOffice] = useState(salesOfficeList[0]);
  const [selectedGroup, setSelectedGroup] = useState(grupProductList[0]);
  const [selectedSalesman, setSelectedSalesman] = useState(salesmanList[0]);

  const currentData = databaseSales.find(
    item => 
      item.salesOffice === selectedOffice &&
      item.grupProduct === selectedGroup &&
      item.salesman === selectedSalesman
  ) || databaseSales[0];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-8">
      {/* Kirim data ke Navbar melalui props salesmanData */}
      <Navbar salesmanData={currentData} />

      <main className="max-w-7xl mx-auto p-4 space-y-4">
        
        <div className="flex gap-2 border-b pb-3">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow' : 'bg-white text-slate-700 border hover:bg-slate-50'}`}
          >
            📊 Dashboard Performa Sales
          </button>
          <button 
            onClick={() => setActiveTab('toolkit')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition ${activeTab === 'toolkit' ? 'bg-purple-700 text-white shadow' : 'bg-white text-slate-700 border hover:bg-slate-50'}`}
          >
            🛠️ Selling Toolkit (Store Visit)
          </button>
        </div>

        {activeTab === 'dashboard' ? (
          <>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-bold text-slate-600">SALES OFFICE:</span>
                <select 
                  value={selectedOffice} 
                  onChange={(e) => setSelectedOffice(e.target.value)}
                  className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-slate-50 font-medium w-full md:w-64"
                >
                  {salesOfficeList.map((office, idx) => (
                    <option key={idx} value={office}>{office}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-bold text-slate-600">GRUP PRODUCT:</span>
                <select 
                  value={selectedGroup} 
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-slate-50 font-medium w-full md:w-64"
                >
                  {grupProductList.map((group, idx) => (
                    <option key={idx} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-bold text-slate-600">SALESMAN:</span>
                <select 
                  value={selectedSalesman} 
                  onChange={(e) => setSelectedSalesman(e.target.value)}
                  className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-slate-50 font-medium w-full md:w-64"
                >
                  {salesmanList.map((sales, idx) => (
                    <option key={idx} value={sales}>{sales}</option>
                  ))}
                </select>
              </div>
            </div>

            <SalesProfileCard data={currentData} />
            <ScorecardTable scorecards={currentData.scorecard} />
            <MonthlyTrackRecord records={currentData.trackRecord} />
            <ActionPlanSection data={currentData} />
          </>
        ) : (
          <SellingToolkit />
        )}

      </main>
    </div>
  );
}