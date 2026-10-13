import { CheckCircle2 } from 'lucide-react';

export default function ActionChecklist() {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3 text-xs">
      <h3 className="font-bold text-slate-800">Frontline Action Checklist:</h3>

      <ul className="space-y-2 text-slate-600 text-[11px]">
        <li className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            Prioritaskan penawaran paket ban <strong>Tubeless Matic (Target 34 pcs)</strong> untuk mencukupi kuota reward ATI Rp 134.737.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            Lakukan bundling cross-selling <strong>Oli Mesin Aspira + Baterai GTZ-5S</strong> saat kunjungan fisik.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            Plafon kredit masih aman (Rp 12.4M), dapat mengajukan PO tempo 14 hari kerja via BOSNET DMS.
          </span>
        </li>
      </ul>
    </div>
  );
}