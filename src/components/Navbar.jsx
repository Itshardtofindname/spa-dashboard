export default function Navbar() {
  return (
    <header className="bg-slate-900 text-white px-4 py-3 flex flex-col md:flex-row justify-between items-center shadow-md gap-2">
      <div className="flex items-center space-x-3">
        <span className="bg-red-600 text-xs px-2.5 py-1 font-bold rounded tracking-wider">SPA V2.6 ENTERPRISE</span>
        <span className="text-xs md:text-sm font-medium text-slate-300">Salesforce Performance Assistance System</span>
      </div>
      <div className="flex items-center text-xs space-x-4">
        <span>Sales Domestik &gt; Personal Salesman &gt; <strong>Seno Aji Sobirin (NPK 1584)</strong></span>
        <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded">Periode: <strong>September 2026</strong></span>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded font-semibold transition">
          Export PDF
        </button>
      </div>
    </header>
  );
}