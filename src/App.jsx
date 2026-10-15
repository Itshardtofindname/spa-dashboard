import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './components/LoginPage';
import SellingToolkit from './components/SellingToolkit';
import DailyMonitoring from './components/DailyMonitoring';
import WeeklyMonthlySummary from './components/WeeklyMonthlySummary'; // <-- Import ini
import LembarKerjaSalesman from './components/lks/LembarKerjaSalesman';
import DashboardPerformance from './components/dashboard/DashboardPerformance';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('spa-dashboard-logged-in') === 'true');
  const [activePage, setActivePage] = useState('dashboard');

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
        return <DashboardPerformance />;
      case 'sales-monitoring':
        return <SellingToolkit />;
      case 'DKS':
        return <DailyMonitoring />;
      case 'summary':
        return <WeeklyMonthlySummary />; // <-- Untuk Weekly & Monthly Summary
      case 'lks':
        return <LembarKerjaSalesman />; // <-- KUNCI PERBAIKAN: Untuk Lembar Kerja Salesman
      default:
        return <DashboardPerformance />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col">
      <Navbar onLogout={handleLogout} />

      <div className="app-content-shell flex flex-1 min-w-0">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        <main className="app-main flex-1 min-w-0 p-6 max-w-[1600px] mx-auto w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
