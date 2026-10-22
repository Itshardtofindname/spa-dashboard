import { createPortal } from 'react-dom';
import {
  LayoutGrid,
  TrendingUp,
  LineChart,
  ClipboardList,
  ClipboardCheck,
  FileSpreadsheet,
} from 'lucide-react';

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard Performance Sales',
    mobileLabel: 'Dashboard',
    icon: LayoutGrid,
  },
  {
    id: 'sales-monitoring',
    label: 'Selling Toolkit',
    mobileLabel: 'Toolkit',
    icon: TrendingUp,
  },
  {
    id: 'DKS',
    label: 'Sales Daily Monitoring & Rute DKS',
    mobileLabel: 'DKS',
    icon: LineChart,
  },
  {
    id: 'summary',
    label: 'Weekly & Monthly Summary',
    mobileLabel: 'Summary',
    icon: ClipboardList,
  },
  {
    id: 'lks',
    label: 'LKS - Lembar Kerja Salesman',
    mobileLabel: 'LKS',
    icon: ClipboardCheck,
  },
  {
    id: 'scorecard-import',
    label: 'Import Scorecard Drive',
    mobileLabel: 'Scorecard',
    icon: FileSpreadsheet,
  },
];

export default function Sidebar({ activePage, setActivePage }) {
  const sidebar = (
    <aside className="app-sidebar flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-4">
      <div className="mb-4 px-3">
        <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
          MAIN WORKSTATION
        </h2>
      </div>

      <nav className="sidebar-nav space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActivePage(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`sidebar-link flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                isActive
                  ? 'bg-slate-100 font-bold text-slate-900'
                  : 'font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 ${
                  isActive ? 'text-slate-900' : 'text-slate-500'
                }`}
              />

              <span className="sidebar-label leading-snug">
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.mobileLabel}</span>
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );

  return createPortal(sidebar, document.body);
}