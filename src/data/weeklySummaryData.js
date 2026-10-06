export const weeklySummaryData = {
  header: {
    title: "Weekly & Monthly Summary",
    subtitle: "Agregasi performa rute penjualan & evaluasi 3 pilar SPA domestik secara terukur.",
    cluster: "GCC JALILAH 2026",
    soArea: "SO Jakarta Central (TL48)",
    period: "01 Des 2025 – 30 Des 2025"
  },
  salesman: {
    name: "Seno Aji Sobirin",
    npk: "1584 / 4831",
    circle: "Circle JALI JALI",
    area: "Area Penjualan: Central DKI (Kec. Kebayoran, Gambir, Sawah Besar, Senen)",
    supervisor: "Budi Santoso",
    targetBulanan: "Rp 165.000.000",
    sisaHariKerja: "6 Hari",
    closingStatus: "W3 (Active)"
  },
  weeklyCards: [
    { week: "W1 (01-07 Des)", omzet: "Rp 38,00 Juta", pencapaian: "92%", status: "Tercapai", statusColor: "bg-emerald-100 text-emerald-800" },
    { week: "W2 (08-14 Des)", omzet: "Rp 40,15 Juta", pencapaian: "98%", status: "Tercapai", statusColor: "bg-emerald-100 text-emerald-800" },
    { week: "W3 (15-21 Des) [Aktif]", omzet: "Rp 39,40 Juta", pencapaian: "94%", status: "Berjalan", statusColor: "bg-blue-100 text-blue-800", isCurrent: true },
    { week: "W4 (22-30 Des) [Proyeksi]", omzet: "Rp 47,45 Juta", pencapaian: "105%", status: "Proyeksi", statusColor: "bg-purple-100 text-purple-800" }
  ],
  threePillars: {
    totalScore: "10.8",
    status: "Kompetitif",
    pillar1: { title: "Pillar 1: Result", score: "1.5", max: "3.0 Bobot", badge: "Needs Improvement", badgeColor: "bg-amber-100 text-amber-800", desc1: "Pencapaian Omzet: 88.6%", desc2: "Volume SKU Kritis: 75.4% (V-Bolt)", desc3: "Quota Focus: Lintas", note: "Kejar sisa gap Rp 22.15 Juta pada 6 outlet utama di W4 untuk mencapai target skoring 2.5+" },
    pillar2: { title: "Pillar 2: Strategic", score: "7.5", max: "3.0 Bobot", badge: "High Discipline", badgeColor: "bg-emerald-100 text-emerald-800", desc1: "Cross-Sell Hit Rate Sekunder: 100%", desc2: "Active Outlet Coverage: 96.0%", desc3: "Potensi PO Multi-SKU: 88.0%", note: "Pemanfaatan Selling Tool Kits berhasil meningkatkan konversi SKU komplementer ke bengkel rekanan." },
    pillar3: { title: "Pillar 3: Process", score: "2.8", max: "3.0 Bobot", badge: "Premier", badgeColor: "bg-purple-100 text-purple-800", desc1: "Kepatuhan Geo-tagging: 99.6% (0 deviasi)", desc2: "Durasi Rata-rata: 31.4 mnt (<35 mnt)", desc3: "Akurasi Error BOSNET: 99.2% Zero Retur", note: "Rute kunjungan presisi dan bebas deviasi. Proses administrasi PO lebih efisien 10 menit per toko." }
  },
  skuStrategies: [
    { category: "Bearing FG6 Series", targetMonth: "1.200 Pcs", realMtd: "1.260 Pcs (28.35 Juta)", ach: "105.0%", status: "Tercapai", topOutlet: "Sentosa Motor (Kemayoran)" },
    { category: "Pad Set FM2 / FN7", targetMonth: "850 Set", realMtd: "810 Set (24.30 Juta)", ach: "95.3%", status: "Tercapai", topOutlet: "ASS Motor (Gambir)" },
    { category: "Brake Shoe FM8 / FN6", targetMonth: "700 Set", realMtd: "640 Set (16.64 Juta)", ach: "91.4%", status: "Tercapai", topOutlet: "Kurnia Motor Mandiri" },
    { category: "V-Bolt FM1 Scooter", targetMonth: "600 Pcs", realMtd: "435 Pcs (23.92 Juta)", ach: "72.5%", status: "Perlu Eksekusi", statusColor: "bg-red-100 text-red-700", topOutlet: "Sumber Rezeki Motor" },
    { category: "Drive Chain FN1 / FN2", targetMonth: "400 Set", realMtd: "358 Set (19.69 Juta)", ach: "89.5%", status: "Strategis", statusColor: "bg-amber-100 text-amber-800", topOutlet: "Bintang Terang Motor" },
    { category: "Shock Absorber FMA/FNA", targetMonth: "150 Set", realMtd: "122 Set (13.86 Juta)", ach: "81.3%", status: "Perlu Eksekusi", statusColor: "bg-purple-100 text-purple-700", topOutlet: "Jaya Abadi Spareparts" },
    { category: "Filter Udara FM6 / FN6", targetMonth: "800 Pcs", realMtd: "780 Pcs (11.70 Juta)", ach: "97.5%", status: "Tercapai", topOutlet: "ASS Motor & Sentosa" },
    { category: "Gasket Kit FM2 / FN8", targetMonth: "500 Set", realMtd: "480 Set (15.76 Juta)", ach: "96.0%", status: "Tercapai", topOutlet: "Mega Jaya Speed" }
  ]
};