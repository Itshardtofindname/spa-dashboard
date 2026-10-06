import logoImg from '../assets/logo.png';

export default function Navbar({ salesmanData }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#94ABDE] shadow-sm">
      <div className="mx-auto flex min-h-[64px] max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-36 shrink-0 items-center justify-center overflow-hidden">
            <img
              src={logoImg}
              alt="SPA Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-wide text-black">
                SPA
              </span>
              <span className="rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white">
                V2.6
              </span>
            </div>
            <p className="hidden truncate text-xs text-black sm:block">
              Salesforce Performance Assistance System
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden items-center text-xs text-black xl:flex">
            <span>Sales Domestik</span>
            <span className="mx-2 text-black">/</span>
            <span>Personal Salesman</span>
            <span className="mx-2 text-black">/</span>
            <span className="font-semibold text-black">
              {salesmanData?.identity?.nama || "-"}
            </span>
            <span className="ml-1 text-black">
              (NPK {salesmanData?.identity?.npk || "-"})
            </span>
          </div>
          <div className="hidden rounded-lg border border-slate-400 bg-white/50 px-3 py-1.5 text-xs text-black md:block">
            <span className="mr-1 text-black">
              Periode
            </span>
            <span className="font-semibold text-black">
              September 2026
            </span>
          </div>
          <button
            className="
              flex items-center gap-2
              rounded-lg
              bg-emerald-600
              px-3.5 py-2
              text-xs font-semibold text-white
              shadow-sm
              transition
              hover:bg-emerald-700
              active:scale-95
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
              />
            </svg>
            <span className="hidden sm:inline">
              Export PDF
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}