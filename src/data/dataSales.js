export const salesOfficeList = [
  "S001 - SO SERANG",
  "S002 - SO UTIM",
  "S003 - SO SERPONG",
  "S004 - SO SELATAN",
  "S005 - SO PUSPAR"
];

export const grupProductList = [
  "TL1 - AP2",
  "TL2 - ATI-ATU-CCO-OA2",
  "TL3 - AB4-ATD-OA4",
  "TL4A - AP4-F/NF",
  "TL4B - INB-TI4-TU4",
  "TL5 - GS2-KY2-KYZ",
  "TL6 - GS4-KY4-AKB",
  "TL7 - FP2-FTU-FBO"
];

export const salesmanList = [
  "NPK4225 - IQBAL",
  "NPK5178 - TEGAR",
  "NPK4025 - RIO",
  "NPK2528 - HENDRY",
  "NPK5060 - ANGGA",
  "NPK5207 - AZIZ",
  "NPK4618 - RAVI",
  "NPK4410 - EDI PURWANTO",
  "NPK2451 - ABU YAJID",
  "NPK4402 - BERNARDO",
  "NPK4413 - LUKMAN",
  "NPK4947 - RAHMAT",
  "NPK4405 - KAMAL",
  "NPK1584 - SENO AJI",
  "NPK3474 - MARTINO",
  "NPK4561 - HENDRA",
  "NPK4906 - DAMAR"
];

export const databaseSales = [
  // 1. Data untuk Iqbal
  {
    salesOffice: "S001 - SO SERANG",
    grupProduct: "TL1 - AP2",
    salesman: "NPK4225 - IQBAL",
    identity: {
      nama: "IQBAL",
      npk: "4225",
      jabatan: "Field Salesman Domestic",
      wilayah: "SO Serang",
      totalOutlet: "42 Outlet Aktif",
      rankSo: "#3 dari 18 Sales",
      avgAchievement: "82.4%"
    },
    finalGrade: {
      score: "11,5",
      status: "HIGH",
      batasLulus: "≥ 9.0",
      keterangan: "Performa individu sangat baik dan melampaui target standar operasional di berbagai pilar."
    },
    breakdownPilar: { pilar1: "2.0", pilar2: "7.5", pilar3: "2.0" },
    scorecard: [
      { aspect: "RESULT", indicator: "Sales Achievement & Growth", statusColor: "bg-amber-600", statusText: "MED (2)", value: "2.0" },
      { aspect: "STRATEGIC ALIGNMENT", indicator: "Cross Selling - Up Selling", statusColor: "bg-emerald-600", statusText: "HIGH (3)", value: "3.0" },
      { aspect: "STRATEGIC ALIGNMENT", indicator: "Active Outlet (OA)", statusColor: "bg-emerald-600", statusText: "HIGH (3)", value: "3.0" },
      { aspect: "STRATEGIC ALIGNMENT", indicator: "Repeat Order", statusColor: "bg-amber-600", statusText: "MED (2)", value: "2.0" },
      { aspect: "PROCESS", indicator: "DKS (Daftar Kunjungan Sales)", statusColor: "bg-amber-600", statusText: "MED (2)", value: "2.0" }
    ],
    trackRecord: [
      {
        territory: "SO Serang",
        jan: "80%", feb: "82%", mar: "85%", q1Avg: "82%",
        apr: "83%", mei: "84%", jun: "86%", jul: "85%", aug: "88%",
        sep: "AKTIF",
        salesScore: "2.0", daScore: "3.0", rOrder: "2.0", crossSell: "3.0", dks: "2.0",
        avgTotal: "11,5", rank: "3"
      }
    ],
    repeatOrderLow: [
      { store: "Toko Berkah Jaya", detail: "Serang Kota • PO Terakhir: 18 Ags" }
    ],
    supervisorNotes: {
      notes: "Iqbal menunjukkan konsistensi tinggi pada area Active Outlet dan Cross Selling.",
      recommendation: ["Pertahankan kunjungan rutin mingguan."]
    }
  },

  // 2. Data untuk Seno Aji
  {
    salesOffice: "S001 - SO SERANG",
    grupProduct: "TL1 - AP2",
    salesman: "NPK1584 - SENO AJI",
    identity: {
      nama: "SENO AJI SOBIRIN",
      npk: "1584",
      jabatan: "Field Salesman Domestic",
      wilayah: "SO Jakarta",
      totalOutlet: "48 Outlet Aktif",
      rankSo: "#1 dari 18 Sales",
      avgAchievement: "76.9%"
    },
    finalGrade: {
      score: "10,0",
      status: "MEDIUM",
      batasLulus: "≥ 9.0",
      keterangan: "Performa individu berada pada kategori MEDIUM. Memenuhi target standar operasional, namun pilar RESULT memerlukan eskalasi intensif di bulan depan."
    },
    breakdownPilar: { pilar1: "1.0", pilar2: "7.0", pilar3: "2.0" },
    scorecard: [
      { aspect: "RESULT", indicator: "Sales Achievement & Growth", statusColor: "bg-red-600", statusText: "LOW (1)", value: "1.0" },
      { aspect: "STRATEGIC ALIGNMENT", indicator: "Cross Selling - Up Selling", statusColor: "bg-emerald-600", statusText: "HIGH (3)", value: "3.0" },
      { aspect: "STRATEGIC ALIGNMENT", indicator: "Active Outlet (OA)", statusColor: "bg-amber-600", statusText: "MED (2)", value: "2.0" },
      { aspect: "STRATEGIC ALIGNMENT", indicator: "Repeat Order", statusColor: "bg-amber-600", statusText: "MED (2)", value: "2.0" },
      { aspect: "PROCESS", indicator: "DKS (Daftar Kunjungan Sales)", statusColor: "bg-amber-600", statusText: "MED (2)", value: "2.0" }
    ],
    trackRecord: [
      {
        territory: "SO Jakarta",
        jan: "-", feb: "-", mar: "-", q1Avg: "-",
        apr: "-", mei: "-", jun: "-", jul: "-", aug: "-",
        sep: "AKTIF",
        salesScore: "1.0", daScore: "2.0", rOrder: "2.0", crossSell: "3.0", dks: "2.0",
        avgTotal: "10,0", rank: "1"
      }
    ],
    repeatOrderLow: [
      { store: "Toko Rejeki Jaya", detail: "Kuningan Barat • PO Terakhir: 12 Ags" },
      { store: "TB Sinar Makmur", detail: "Mampang Prapatan • PO Terakhir: 19 Ags" }
    ],
    supervisorNotes: {
      notes: "Seno Aji Sobirin mempertahankan kedisiplinan rule (DKS) yang sangat solid dan cross selling sempurna. Namun, volume achievement bulan September tertahan pada level 85%.",
      recommendation: [
        "Prioritaskan 16 outlet pasif untuk memicu Repeat Order minimal 2 karton.",
        "Tawarkan skema term of payment khusus untuk menaikkan skor RESULT ke range MEDIUM / HIGH (≥ 2.0)."
      ]
    }
  }
];