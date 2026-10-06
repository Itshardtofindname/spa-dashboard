export const sellingToolkitData = {
  storeId: "1000002996",
  storeName: "ASS MOTOR",
  owner: "2000008870 (Bp. Asyik)",
  npkSalesman: "4831 - Seno Aji Sobirin",
  visitSchedule: "Senin (Weekly DKS)",
  visitStatus: "Visit Aktif - GPS Terverifikasi (-6.2088, 106.8454)",
  
  // Section 1: Informasi Toko
  creditLimit: {
    status: "Kredit > Aman",
    usedAmount: "Rp 24.157.116 (41.6%)",
    totalLimit: "Rp 58.000.000",
    remainingCredit: "Rp 33.842.884",
    percentage: "68.4% Longgar",
    manualBlock: "Aman (None)",
    overdueInvoices: "0 Dokumen"
  },
  
  // Section 2: Monitoring Achievement Program
  programs: [
    {
      title: "Vaganza Tahunan",
      period: "Periode: Apr 2025 - Mar 2026",
      target: "Rp 250.000.000",
      realization: "78.4%",
      status: "On-Track",
      statusColor: "bg-emerald-600 text-white",
      reward: "Logam Mulia 50 Gram"
    },
    {
      title: "Vaganza 2 Bulanan",
      period: "Periode: Okt - Nov 2026",
      target: "Rp 20.815.140",
      realization: "Rp 5.815.140",
      status: "Defisit Target",
      statusColor: "bg-red-600 text-white",
      balance: "-Rp 15.000.000"
    },
    {
      title: "Add-On Fast Moving (FP2)",
      period: "Periode: November 2025",
      target: "Rp 14.000.000",
      realization: "Rp 0 [0%]",
      status: "Belum Ada Order",
      statusColor: "bg-amber-500 text-white",
      defisit: "Rp 14.000.000"
    },
    {
      title: "Monitoring D1 Sparepart",
      period: "Pencapaian Pusat Belanja",
      target: "Rp 14.000.000",
      realization: "Rp 9.872.083",
      status: "Capaian 70.5%",
      statusColor: "bg-emerald-600 text-white",
      reward: "Reward: Rp 507.000"
    }
  ],

  // Section 3: Cross-Sell & Up-Sell Table
  crossSellItems: [
    { category: "BEARING", sku: "F05", avg24m: 58, reqMin: 40, actual: 40, selisih: 0, growth: "-31%", type: "UP-SELL", actionVal: 40 },
    { category: "PAD SET (DISC PAD)", sku: "FM2 / FN7", avg24m: "-", reqMin: "-", actual: 0, selisih: 0, growth: "0%", type: "CROSS-SELL", actionText: "Tawarkan SKU" },
    { category: "BRAKE SHOE", sku: "FM8 / FN6", avg24m: 33, reqMin: 45, actual: 45, selisih: 0, growth: "+35%", type: "UP-SELL", actionVal: 45 },
    { category: "V-BELT", sku: "FM1", avg24m: "-", reqMin: "-", actual: 0, selisih: 0, growth: "0%", type: "CROSS-SELL", actionText: "Tawarkan SKU" },
    { category: "DRIVE CHAIN", sku: "FN1 / FN2", avg24m: 37, reqMin: 55, actual: 41, selisih: 14, growth: "+11%", type: "UP-SELL", actionVal: 41 },
    { category: "SHOCK ABSORBER", sku: "FMA / FNA", avg24m: 20, reqMin: 13, actual: 12, selisih: 1, growth: "-41%", type: "UP-SELL", actionVal: 12 },
    { category: "FILTER UDARA", sku: "FMG / FNG", avg24m: "-", reqMin: "-", actual: 0, selisih: 0, growth: "0%", type: "CROSS-SELL", actionText: "Tawarkan SKU" },
    { category: "GASKET", sku: "FME / FNE", avg24m: 33, reqMin: 40, actual: 37, selisih: 3, growth: "+14%", type: "UP-SELL", actionVal: 37 }
  ]
};