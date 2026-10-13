import { 
  LayoutGrid, 
  TrendingUp, 
  LineChart, 
  ClipboardList,
  ClipboardCheck // Ikon untuk LKS
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard Performance Sales', icon: LayoutGrid },
  { id: 'sales-monitoring', label: 'Selling Toolkit', icon: TrendingUp },
  { id: 'DKS', label: 'Sales Daily Monitoring & Rute DKS', icon: LineChart },
  { id: 'summary', label: 'Weekly & Monthly Summary', icon: ClipboardList },
  { id: 'lks', label: 'LKS - lembar kerja salesman', icon: ClipboardCheck } // <-- Menu LKS
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200 p-4 flex flex-col shrink-0">
      <div className="mb-4 px-3">
        <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
          MAIN WORKSTATION
        </h2>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                isActive
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
              <span className="leading-snug">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}