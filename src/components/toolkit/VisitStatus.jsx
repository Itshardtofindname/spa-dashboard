
export default function VisitStatus({storeProfile, selectedStore, data}) {
  return (
    <>
{/* STATUS VISIT */}
      <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
        {storeProfile?.visit_status ||
          (selectedStore
            ? data.visitStatus
            : "Status kunjungan belum tersedia")}
      </div>
    </>
  );
}
