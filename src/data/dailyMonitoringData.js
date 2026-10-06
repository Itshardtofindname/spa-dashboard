export const getDailyMonitoringData = (salesmanName, officeName, index = 0) => {
  // Parsing nama dan NPK dari string salesman (misal: "NPK4225 - IQBAL")
  const [npkRaw, ...nameParts] = salesmanName.split(" - ");
  const npk = npkRaw ? npkRaw.replace("NPK", "") : "4225";
  const nama = nameParts.length > 0 ? nameParts.join(" ") : salesmanName;

  const cleanOffice = officeName.replace(/^S\d+\s*-\s*/, "");

  return {
    salesmanInfo: `${nama} (NPK ${npk} / ${4800 + (index % 50)})`,
    soArea: `SO ${cleanOffice}`,
    routeInfo: `Rute Senin SSD - Serpong (Pukan ${(index % 3) + 1})`,
    date: "Senin, 15 Des 2025",
    
    summaryCards: {
      kunjunganOnTrack: { count: `${7 + (index % 3)} / 10`, percentage: "70% Selesai", sub: "1 Sedang Visit, 2 Menunggu" },
      omzetHarian: { value: `Rp ${25 + (index % 8)},45`, unit: "Juta", capai: `${80 + (index % 10)}% Capai`, target: "Target Rp 35.000.000", sisa: "Sisa Rp 6,55M" },
      efektifitasWaktu: { value: `${30 + (index % 5)}`, unit: "Menit / Outlet", target: "Target < 35 min", status: "SPA Guided" },
      crossSellHitRate: { value: `${85 + (index % 10)}%`, hit: "7/8 Store Ok", items: "Bearing, Pad Set, Shoe" },
      statusSoBosnet: { valid: "6 Faktur Valid", limit: "Plafon 100% Aman" }
    },

    callPlanRutes: [
      {
        id: 1, time: "08:30", storeName: `TOTO MOTOR ${nama.toUpperCase()}`, storeId: `100000${2996 + index}`,
        address: "Jl. Raya Serpong No. 44, Serpong Utara",
        status: "Selesai - PO Terbit", statusColor: "bg-emerald-100 text-emerald-800",
        omzet: `Rp ${8 + (index % 3)}.872.083`, durasi: "34 Menit", notes: "8 SKU - Cross-sell OK", gps: "GPS Valid"
      },
      {
        id: 2, time: "09:20", storeName: "REJEKI MOTOR", storeId: `100000${3112 + index}`,
        address: "Jl. Pahlawan Serpong Kav. 12",
        status: "Selesai", statusColor: "bg-emerald-100 text-emerald-800",
        omzet: "Rp 4.250.000", durasi: "28 Menit", notes: "4 SKU Reguler", gps: "GPS Valid"
      },
      {
        id: 3, time: "10:15", storeName: "BINTANG OTOMOTIF", storeId: `100000${4280 + index}`,
        address: "Jl. Letnan Sutopo Ruko Boulevard No. 8",
        status: "Selesai", statusColor: "bg-emerald-100 text-emerald-800",
        omzet: "Rp 5.120.000", durasi: "32 Menit", notes: "Cross-sell Pad Set", gps: "GPS Valid"
      },
      {
        id: 4, time: "11:10", storeName: "JAYA ABADI MOTOR", storeId: `100000${1890 + index}`,
        address: "Jl. Griya Loka Sektor 11 No. 5",
        status: "Selesai", statusColor: "bg-emerald-100 text-emerald-800",
        omzet: "Rp 3.650.000", durasi: "29 Menit", notes: "Faktur BOSNET OK", gps: "GPS Valid"
      },
      {
        id: 5, time: "13:00", storeName: "CAHAYA MOTOR", storeId: `100000${7021 + index}`,
        address: "Jl. Datar Raya Blok C No. 9",
        status: "Selesai", statusColor: "bg-emerald-100 text-emerald-800",
        omzet: "Rp 2.800.000", durasi: "30 Menit", notes: "3 SKU Reguler", gps: "GPS Valid"
      },
      {
        id: 6, time: "13:45", storeName: "MAKMUR SPEED", storeId: `100000${6919 + index}`,
        address: "Ruko Tol Boulevard Blok B-2",
        status: "Selesai", statusColor: "bg-emerald-100 text-emerald-800",
        omzet: "Rp 2.757.917", durasi: "33 Menit", notes: "Faktur BOSNET OK", gps: "GPS Valid"
      },
      {
        id: 7, time: "14:30", storeName: `OUTLET UTAMA ${nama.toUpperCase()}`, storeId: `100000${5510 + index}`,
        address: "Jl. Raya BSD Sektor 7 Blok RM-20",
        status: "ACTIVE VISIT", statusColor: "bg-blue-600 text-white animate-pulse",
        omzet: "Rp 3.200.000", durasi: "Berjalan: 38:47 [0m]", notes: "Draft Order Terkumpul. Plafon Sisa: Rp 14,5 Juta", gps: "GPS Valid",
        isCurrentVisit: true,
        recommendation: `Tambah Drive Chain FN1 (+4 Pcs untuk bonus Vaganza oleh ${nama})`
      },
      {
        id: 8, time: "15:30", storeName: "BENGKEL KURNIA JAYA", storeId: "NEXT VISIT",
        address: "Jl. Taman Tekno Blok G-1, BSD",
        status: "Menunggu", statusColor: "bg-slate-200 text-slate-700",
        notes: "Notion: Piutang Jatuh Tempo 1 hari lagi", gps: "Jarak Estimasi: 1.6 KM (2 mnt)"
      },
      {
        id: 9, time: "16:30", storeName: "PRIMA MOTOR SPORT", storeId: "Menunggu",
        address: "Jl. Raya Serpong Kav. Komersial 2",
        status: "Menunggu", statusColor: "bg-slate-200 text-slate-700",
        notes: "Rute Sesuai"
      },
      {
        id: 10, time: "17:15", storeName: "ANUGERAH OTOPARTS", storeId: "Menunggu",
        address: "Kawasan Ruko Golden Boulevard Blok W",
        status: "Menunggu", statusColor: "bg-slate-200 text-slate-700",
        notes: "Target Penurunan Rute DKS"
      }
    ],

    skuFokus: [
      { name: "Bearing Roda (FG6)", progress: "40 / 40 Pcs", percentage: "100%", target: "Target: 40 Unit", statusColor: "bg-emerald-500", note: "Target Tercapai ✓" },
      { name: "Pad Set Disc (FM2/FN7)", progress: "30 / 25 Pcs", percentage: "120%", target: "Target: 25 Unit", statusColor: "bg-blue-600", note: "Cross-Sell Surplus +5 Pcs" },
      { name: "Brake Shoe (FM8/FN6)", progress: "28 / 30 Pcs", percentage: "93%", target: "Target: 30 Unit", statusColor: "bg-amber-500", note: "Sisa 2 Unit (Order siap)" },
      { name: "Drive Chain Kit (FN1/FN2)", progress: "22 / 20 Unit", percentage: "110%", target: "Target: 20 Unit", statusColor: "bg-purple-600", note: "+2 Unit over target" },
      { name: "Shock Absorber (FMA/FNA)", progress: "12 / 15 Unit", percentage: "80%", target: "Target: 15 Unit", statusColor: "bg-red-500", note: "Sisa 3 Unit (Prospek)" },
      { name: "Battery Maintenance Free", progress: "11 / 10 Unit", percentage: "110%", target: "Target: 10 Unit", statusColor: "bg-emerald-600", note: "Program Bundling Aktif" }
    ]
  };
};