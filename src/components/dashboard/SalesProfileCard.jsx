
function displayValue(value, suffix = "") {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return `${value}${suffix}`;
}

function formatScore(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(String(value).replace(",", "."));

  if (!Number.isFinite(number)) {
    return String(value);
  }

  return number.toLocaleString("id-ID", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
}

export default function SalesProfileCard({ data }) {
  if (!data) return null;

  const identity = data.identity || {};

  const nama =
    identity.nama ?? data.nama ?? data.salesman ?? "—";

  const npk =
    identity.npk ?? data.npk ?? "—";

  const jabatan =
    identity.jabatan ?? data.jabatan ?? "—";

  const wilayah =
    identity.wilayah ??
    data.salesOffice ??
    data.sales_office ??
    "—";

  const totalOutlet =
    identity.totalOutlet ?? data.totalOutlet;

  const rankSo =
    identity.rankSo ?? data.rankSo;

  const avgAchievement =
    identity.avgAchievement ?? data.avgAchievement;

  const finalGrade = data.finalGrade || {};

  const finalScore =
    finalGrade.score ?? data.skorFinal;

  const finalStatus =
    finalGrade.status ?? data.statusLulus;

  const batasLulus = finalGrade.batasLulus;
  const keterangan = finalGrade.keterangan;

  const pilar = data.breakdownPilar || {};

  const hasPilar =
    pilar.pilar1 != null ||
    pilar.pilar2 != null ||
    pilar.pilar3 != null;

  const statusColor =
    finalStatus === "HIGH"
      ? "bg-emerald-600"
      : finalStatus === "MEDIUM"
        ? "bg-amber-500"
        : finalStatus === "LOW"
          ? "bg-rose-600"
          : "bg-slate-400";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* DATA IDENTITAS SALESMAN */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-bold mb-3">
            <span>DATA IDENTITAS SALESMAN</span>
            <span>NPK: {npk}</span>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-20 h-24 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-slate-400 text-xs font-bold">
              FOTO
            </div>

            <div className="space-y-1 text-xs min-w-0">
              <h3 className="font-extrabold text-slate-800 text-sm uppercase break-words">
                {nama}
              </h3>

              <p className="text-slate-500 font-medium">
                {jabatan}
              </p>

              <p className="text-slate-600 font-bold mt-2">
                WILAYAH / SO:{" "}
                <span className="text-slate-800 font-normal">
                  {wilayah}
                </span>
              </p>

              <p className="text-slate-600 font-bold">
                TOTAL OUTLET:{" "}
                <span className="text-slate-800 font-normal">
                  {displayValue(totalOutlet)}
                  {totalOutlet != null && totalOutlet !== ""
                    ? " Outlet"
                    : ""}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2 items-center border-t pt-2 mt-3 text-[11px] font-semibold text-slate-500">
          <span>
            Rank SO:{" "}
            <strong className="text-slate-800">
              {displayValue(rankSo)}
            </strong>
          </span>

          <span>
            Avg Achievement:{" "}
            <strong className="text-slate-800">
              {displayValue(avgAchievement)}
              {avgAchievement != null &&
              avgAchievement !== "" &&
              typeof avgAchievement === "number"
                ? "%"
                : ""}
            </strong>
          </span>
        </div>
      </div>

      {/* FINAL GRADE */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex h-full flex-col gap-3">
        <div className="flex justify-between items-center bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-bold">
          <span>FINAL GRADE</span>
          <span>September 2026</span>
        </div>

        <div className="flex min-h-36 flex-1 flex-col items-center justify-center rounded-lg bg-slate-50 px-3 py-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-4xl font-black leading-none tracking-tight text-slate-800">
              {formatScore(finalScore)}
            </span>

            {finalStatus != null && finalStatus !== "" && (
              <span
                className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded text-white ${statusColor}`}
              >
                {finalStatus}
              </span>
            )}
          </div>

          <p className="text-[11px] text-slate-500 mt-2">
            Batas lulus:{" "}
            <strong className="text-slate-700">
              {displayValue(batasLulus)}
            </strong>
          </p>
        </div>

        {keterangan ? (
          <div className="bg-slate-50 border border-slate-200 text-slate-600 p-3 rounded-lg text-[11px] leading-snug font-medium">
            {keterangan}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 text-slate-500 p-3 rounded-lg text-[11px] leading-snug">
            Keterangan performa belum tersedia dari backend.
          </div>
        )}
      </div>

      {/* BREAKDOWN 3 PILAR UTAMA */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div className="bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-bold mb-3">
          BREAKDOWN 3 PILAR UTAMA
        </div>

        <div className="space-y-2 text-xs">
          {[
            {
              key: "pilar1",
              title: "Pilar 1: RESULT",
              description: "Sales Achievement & Growth",
            },
            {
              key: "pilar2",
              title: "Pilar 2: STRATEGIC ALIGNMENT",
              description: "Cross Sell, Outlet, & Repeat Order",
            },
            {
              key: "pilar3",
              title: "Pilar 3: PROCESS",
              description: "Daftar Kunjungan Sales (DKS)",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex justify-between items-center gap-3 bg-slate-50 p-2 rounded border border-slate-100"
            >
              <div>
                <p className="font-bold text-slate-800">
                  {item.title}
                </p>
                <p className="text-[10px] text-slate-500">
                  {item.description}
                </p>
              </div>

              <span className="font-extrabold text-slate-800">
                {formatScore(pilar[item.key])}
              </span>
            </div>
          ))}

          {!hasPilar && (
            <p className="text-[11px] text-slate-400">
              Data breakdown pilar belum tersedia dari backend.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
