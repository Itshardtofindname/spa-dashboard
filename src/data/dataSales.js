export const salesOfficeList = [
  "S001 - SO SERANG",
  "S002 - SO UTIM",
  "S003 - SO SERPONG",
  "S004 - SO SELATAN",
  "S005 - SO PUSPAR"
];

export const customerList = [
  "1 - ABADI MOTOR",
  "2 - HANSEN MOTOR",
  "3 - MAJU JAYA MOTOR",
  "4 - R3 MOTOR",
  "5 - BUDI MULIYA MOTOR",
];

export const dayList = [
  "SENIN",
  "SELASA",
  "RABU",
  "KAMIS",
  "JUMAT",
  "SABTU"
];

export const monthList = [
  "JANUARI",
  "FEBRUARI",
  "MARET",
  "APRIL",
  "MEI",
  "JUNI",
  "JULI",
  "AGUSTUS",
  "SEPTEMBER",
  "OKTOBER",
  "NOVEMBER",
  "DESEMBER"
];

export const yearList = [
  "2024",
  "2025",
  "2026"
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
  "4225 - IQBAL",
  "5178 - TEGAR",
  "4025 - RIO",
  "2528 - HENDRY",
  "5060 - ANGGA",
  "5207 - AZIZ",
  "4618 - RAVI",
  "4410 - EDI PURWANTO",
  "2451 - ABU YAJID",
  "4402 - BERNARDO",
  "4413 - LUKMAN",
  "4947 - RAHMAT",
  "4405 - KAMAL",
  "1584 - SENO AJI",
  "3474 - MARTINO",
  "4561 - HENDRA",
  "4906 - DAMAR"
];

const createSalesData = (salesOffice, grupProduct, salesman, index) => {
  const [npkRaw, ...nameParts] = salesman.split(" - ");
  const npk = npkRaw.replace("NPK", "");
  const nama = nameParts.join(" ");

  const officeName = salesOffice
    .replace(/^S\d+\s*-\s*/, "")
    .replace("SO ", "");

  const achievement = 70 + ((index * 7) % 25);
  const salesScore =
    achievement >= 85 ? "3.0" :
    achievement >= 75 ? "2.0" :
    "1.0";

  const activeOutletScore =
    index % 3 === 0 ? "3.0" :
    index % 3 === 1 ? "2.0" :
    "1.0";

  const repeatOrderScore =
    index % 2 === 0 ? "2.0" : "1.0";

  const crossSellScore =
    index % 3 === 0 ? "3.0" : "2.0";

  const dksScore =
    index % 4 === 0 ? "3.0" : "2.0";

  const finalScore =
    Number(salesScore) +
    Number(activeOutletScore) +
    Number(repeatOrderScore) +
    Number(crossSellScore) +
    Number(dksScore);

  const finalStatus =
    finalScore >= 11
      ? "HIGH"
      : finalScore >= 9
        ? "MEDIUM"
        : "LOW";

  return {
    salesOffice,
    grupProduct,
    salesman,

    identity: {
      nama,
      npk,
      jabatan: "Field Salesman Domestic",
      wilayah: `SO ${officeName}`,
      totalOutlet: `${30 + (index % 25)} Outlet Aktif`,
      rankSo: `#${(index % 18) + 1} dari 18 Sales`,
      avgAchievement: `${achievement}.0%`
    },

    finalGrade: {
      score: finalScore.toFixed(1).replace(".", ","),
      status: finalStatus,
      batasLulus: "≥ 9.0",
      keterangan:
        finalStatus === "HIGH"
          ? "Performa individu sangat baik dan melampaui target standar operasional."
          : finalStatus === "MEDIUM"
            ? "Performa individu memenuhi standar operasional, namun masih terdapat beberapa pilar yang perlu ditingkatkan."
            : "Performa individu masih di bawah standar dan memerlukan perhatian serta evaluasi lebih lanjut."
    },

    breakdownPilar: {
      pilar1: salesScore,
      pilar2: (
        Number(activeOutletScore) +
        Number(repeatOrderScore) +
        Number(crossSellScore)
      ).toFixed(1),
      pilar3: dksScore
    },

    scorecard: [
      {
        aspect: "RESULT",
        indicator: "Sales Achievement & Growth",
        statusColor:
          salesScore === "3.0"
            ? "bg-emerald-600"
            : salesScore === "2.0"
              ? "bg-amber-600"
              : "bg-red-600",
        statusText:
          salesScore === "3.0"
            ? "HIGH (3)"
            : salesScore === "2.0"
              ? "MED (2)"
              : "LOW (1)",
        value: salesScore
      },
      {
        aspect: "STRATEGIC ALIGNMENT",
        indicator: "Cross Selling - Up Selling",
        statusColor:
          crossSellScore === "3.0"
            ? "bg-emerald-600"
            : "bg-amber-600",
        statusText:
          crossSellScore === "3.0"
            ? "HIGH (3)"
            : "MED (2)",
        value: crossSellScore
      },
      {
        aspect: "STRATEGIC ALIGNMENT",
        indicator: "Active Outlet (OA)",
        statusColor:
          activeOutletScore === "3.0"
            ? "bg-emerald-600"
            : activeOutletScore === "2.0"
              ? "bg-amber-600"
              : "bg-red-600",
        statusText:
          activeOutletScore === "3.0"
            ? "HIGH (3)"
            : activeOutletScore === "2.0"
              ? "MED (2)"
              : "LOW (1)",
        value: activeOutletScore
      },
      {
        aspect: "STRATEGIC ALIGNMENT",
        indicator: "Repeat Order",
        statusColor:
          repeatOrderScore === "2.0"
            ? "bg-amber-600"
            : "bg-red-600",
        statusText:
          repeatOrderScore === "2.0"
            ? "MED (2)"
            : "LOW (1)",
        value: repeatOrderScore
      },
      {
        aspect: "PROCESS",
        indicator: "DKS (Daftar Kunjungan Sales)",
        statusColor:
          dksScore === "3.0"
            ? "bg-emerald-600"
            : "bg-amber-600",
        statusText:
          dksScore === "3.0"
            ? "HIGH (3)"
            : "MED (2)",
        value: dksScore
      }
    ],

    trackRecord: [
      {
        territory: `SO ${officeName}`,
        jan: `${70 + (index % 15)}%`,
        feb: `${72 + (index % 15)}%`,
        mar: `${75 + (index % 15)}%`,
        q1Avg: `${72 + (index % 15)}%`,
        apr: `${74 + (index % 15)}%`,
        mei: `${76 + (index % 15)}%`,
        jun: `${78 + (index % 15)}%`,
        jul: `${80 + (index % 10)}%`,
        aug: `${82 + (index % 8)}%`,
        sep: "AKTIF",
        salesScore,
        daScore: activeOutletScore,
        rOrder: repeatOrderScore,
        crossSell: crossSellScore,
        dks: dksScore,
        avgTotal: finalScore.toFixed(1).replace(".", ","),
        rank: `${(index % 18) + 1}`
      }
    ],

    repeatOrderLow: [
      {
        store: `Outlet ${nama}`,
        detail: `${officeName} • PO Terakhir: ${10 + (index % 20)} Ags`
      }
    ],

    supervisorNotes: {
      notes:
        finalStatus === "HIGH"
          ? `${nama} menunjukkan performa yang konsisten dan mampu memenuhi target pada beberapa pilar utama.`
          : finalStatus === "MEDIUM"
            ? `${nama} memiliki performa yang cukup baik namun masih terdapat beberapa indikator yang perlu ditingkatkan.`
            : `${nama} membutuhkan evaluasi dan pendampingan lebih lanjut untuk meningkatkan pencapaian.`,

      recommendation:
        finalStatus === "HIGH"
          ? [
              "Pertahankan performa dan kunjungan rutin.",
              "Tingkatkan konsistensi repeat order."
            ]
          : finalStatus === "MEDIUM"
            ? [
                "Tingkatkan active outlet.",
                "Fokus meningkatkan repeat order.",
                "Pertahankan kedisiplinan DKS."
              ]
            : [
                "Lakukan evaluasi terhadap outlet yang pasif.",
                "Tingkatkan frekuensi kunjungan.",
                "Fokus pada peningkatan sales achievement."
              ]
    }
  };
};

export const databaseSales = [];

let index = 0;

salesOfficeList.forEach((salesOffice) => {
  grupProductList.forEach((grupProduct) => {
    salesmanList.forEach((salesman) => {
      databaseSales.push(
        createSalesData(
          salesOffice,
          grupProduct,
          salesman,
          index
        )
      );
      index++;
    });
  });
});