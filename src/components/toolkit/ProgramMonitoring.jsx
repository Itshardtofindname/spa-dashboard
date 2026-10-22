
export default function ProgramMonitoring({data}) {
  return (
    <>
{/* SECTION 02: MONITORING PROGRAM */}
        <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:col-span-7">
          <div className="flex flex-col justify-between gap-2 border-b pb-2 sm:flex-row sm:items-center">
            <h3 className="flex items-center gap-1 text-xs font-bold uppercase text-blue-700">
              📊 SECTION 02: MONITORING ACHIEVEMENT PROGRAM
            </h3>

            <span className="text-[10px] text-gray-500">
              Data contoh
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {data.programs.map((prog, idx) => (
              <div
                key={idx}
                className="space-y-2 rounded-lg border bg-slate-50/50 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    {prog.title}
                  </span>

                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${prog.statusColor}`}
                  >
                    {prog.status}
                  </span>
                </div>

                <p className="text-[10px] text-gray-500">
                  {prog.period}
                </p>

                <div className="flex justify-between gap-2 text-xs font-semibold">
                  <span>Target: {prog.target}</span>
                  <span className="text-emerald-700">
                    {prog.realization}
                  </span>
                </div>

                {prog.reward && (
                  <p className="rounded bg-purple-50 p-1 text-[10px] font-bold text-purple-700">
                    🎁 {prog.reward}
                  </p>
                )}

                {prog.balance && (
                  <p className="rounded bg-red-50 p-1 text-[10px] font-bold text-red-600">
                    ⚠️ Balance: {prog.balance}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
    </>
  );
}
