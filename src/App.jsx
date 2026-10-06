import { useState } from 'react';
import { databaseSales, salesOfficeList, grupProductList, salesmanList } from './data/dataSales';
import Navbar from './components/Navbar';
import SalesProfileCard from './components/SalesProfileCard';
import ScorecardTable from './components/ScorecardTable';
import MonthlyTrackRecord from './components/MonthlyTrackRecord';
import ActionPlanSection from './components/ActionPlanSection';

export default function App() {
  const [selectedOffice, setSelectedOffice] = useState(salesOfficeList[0]);
  const [selectedGroup, setSelectedGroup] = useState(grupProductList[0]);
  const [selectedSalesman, setSelectedSalesman] = useState(salesmanList[0]);

  // Mencari data yang cocok dengan pilihan dropdown
  const currentData = databaseSales.find(
    item => 
      item.salesOffice === selectedOffice &&
      item.grupProduct === selectedGroup &&
      item.salesman === selectedSalesman
  ) || databaseSales[0];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-8">
      <Navbar />

      <main className="max-w-7xl mx-auto p-4 space-y-4">
        <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-3">
          
          {/* Sales Office Dropdown */}
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

          {/* Grup Product Dropdown */}
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

          {/* Salesman Dropdown */}
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
      </main>
    </div>
  );
}