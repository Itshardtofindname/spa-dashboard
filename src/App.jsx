import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './components/LoginPage';
import SellingToolkit from './components/toolkit/SellingToolkit';
import DailyMonitoring from './components/DailyMonitoring';
import WeeklyMonthlySummary from './components/WeeklyMonthlySummary'; // <-- Import ini
import LembarKerjaSalesman from './components/lks/LembarKerjaSalesman';
import DashboardPerformance from './components/dashboard/DashboardPerformance';
import GoogleDriveScorecardImport from './components/GoogleDriveScorecardImport';
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('spa-dashboard-logged-in') === 'true');
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('2026-09-01');

  const handleLogin = () => {
    localStorage.setItem('spa-dashboard-logged-in', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('spa-dashboard-logged-in');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPerformance reportPeriod={selectedPeriod} />;
      case 'sales-monitoring':
        return <SellingToolkit />;
      case 'DKS':
        return <DailyMonitoring />;
      case 'summary':
        return <WeeklyMonthlySummary />; // <-- Untuk Weekly & Monthly Summary
      case 'lks':
        return <LembarKerjaSalesman />; // <-- KUNCI PERBAIKAN: Untuk Lembar Kerja Salesman
      case 'scorecard-import':
        return <GoogleDriveScorecardImport />; // <-- Untuk Import Scorecard dari Google Drive
      default:
        return <DashboardPerformance reportPeriod={selectedPeriod} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col">
      <Navbar onLogout={handleLogout} selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />

      <div className="app-content-shell flex flex-1 min-w-0">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        <main className="app-main flex-1 min-w-0 p-6 max-w-[1600px] mx-auto w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
