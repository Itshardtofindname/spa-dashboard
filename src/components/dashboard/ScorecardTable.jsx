import { useState, useMemo, useEffect, useCallback } from 'react';
import { API_BASE_URL } from "../../api/axiosClient";

const DEFAULT_OFFICE = 'S003 - SO SERPONG';
const DEFAULT_PERIOD = '2026-10-01';

const MONTH_ORDER = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
];

const METRICS = [
  { key: 'perform', label: 'Perform' },
  { key: 'oa', label: 'OA' },
  { key: 'r_order', label: 'R.Order' },
  { key: 'cross_sell', label: 'Cross Sell' },
  { key: 'dks', label: 'DKS' },
];

function normalizeNpk(value) {
  if (value == null) return '';

  const text = String(value).trim();

  return /^\d+\.0+$/.test(text)
    ? text.split('.')[0]
    : text;
}

function parseNumber(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  const parsed = Number(String(value).trim().replace(',', '.'));

  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value, decimals = 1) {
  const number = parseNumber(value);

  if (number === null) return '—';

  return number.toLocaleString('id-ID', {
    minimumFractionDigits: Number.isInteger(number) ? 0 : decimals,
    maximumFractionDigits: decimals,
  });
}

function getMonthNumber(label) {
  const month = String(label).split('-')[0].toLowerCase();

  return MONTH_ORDER.indexOf(month);
}

function getCellColor(value) {
  const number = parseNumber(value);

  if (number === null) {
    return 'bg-slate-100 text-slate-500';
  }

  if (number >= 10) {
    return 'bg-emerald-500 text-white font-semibold';
  }

  if (number >= 8.5) {
    return 'bg-amber-400 text-slate-900 font-semibold';
  }

  return 'bg-red-600 text-white font-semibold';
}

function getMetricColor(value) {
  const number = parseNumber(value);

  if (number === null) {
    return 'bg-slate-100 text-slate-500';
  }

  if (number >= 3) {
    return 'bg-emerald-600 text-white font-semibold';
  }

  if (number >= 2) {
    return 'bg-amber-500 text-white font-semibold';
  }

  return 'bg-red-600 text-white font-semibold';
}

function getMetricStatus(value) {
  const number = parseNumber(value);

  if (number === null) {
    return {
      text: 'BELUM ADA DATA',
      color: 'bg-slate-500',
    };
  }

  if (number >= 3) {
    return {
      text: 'HIGH (3)',
      color: 'bg-emerald-600',
    };
  }

  if (number >= 2) {
    return {
      text: 'MED (2)',
      color: 'bg-amber-600',
    };
  }

  return {
    text: 'LOW (1)',
    color: 'bg-red-600',
  };
}

function formatPeriod(period) {
  if (!period) return 'Periode tidak tersedia';

  const parsed = new Date(`${period}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return period;
  }

  return parsed.toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  });
}

function getMonthLabel(value) {
  const text = String(value).trim();
  const match = text.match(/^([A-Za-z]+)[- /]+(\d{2,4})$/);

  if (!match) return text;

  const month = match[1].slice(0, 3).toLowerCase();
  const monthIndex = MONTH_ORDER.indexOf(month);

  if (monthIndex < 0) return text;

  let year = match[2];

  if (year.length === 4) {
    year = year.slice(-2);
  }

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  return `${monthNames[monthIndex]}-${year}`;
}

function getScorecardsForSalesman(row, reportPeriod) {
  if (!row) return [];

  const months = row.monthly_values || {};
  const periodDate = new Date(`${reportPeriod}T00:00:00`);
  const targetMonth = Number.isNaN(periodDate.getTime())
    ? 8
    : periodDate.getMonth();

  const periodMonthKey = Object.keys(months).find(
    (key) => getMonthNumber(key) === targetMonth
  );

  return [
    {
      aspect: 'Achievement Sales',
      indicator: 'Pencapaian target penjualan bulanan',
      value: periodMonthKey ? months[periodMonthKey] : null,
    },
    {
      aspect: 'Performance Index (Perform)',
      indicator: 'Indeks kinerja komprehensif',
      value: row.perform,
    },
    {
      aspect: 'Outlet Active (OA)',
      indicator: 'Aktivasi toko dan pelanggan aktif baru',
      value: row.oa,
    },
    {
      aspect: 'Regular Order (R.Order)',
      indicator: 'Konsistensi frekuensi order berkala',
      value: row.r_order,
    },
    {
      aspect: 'Cross Selling',
      indicator: 'Diversifikasi penjualan produk lain',
      value: row.cross_sell,
    },
    {
      aspect: 'Daily KPI System (DKS)',
      indicator: 'Kepatuhan dan laporan kinerja harian',
      value: row.dks,
    },
  ];
}

function getErrorMessage(error) {
  if (error instanceof Error) return error.message;

  return 'Terjadi kesalahan saat mengambil data scorecard.';
}

function normalizeRecords(result) {
  const records = Array.isArray(result)
    ? result
    : Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result?.records)
        ? result.records
        : Array.isArray(result?.scorecards)
          ? result.scorecards
          : null;

  if (!records) {
    throw new Error(
      'Format response API tidak sesuai. Backend harus mengembalikan array data scorecard.'
    );
  }

  return records.map((row) => ({
    ...row,
    npk: normalizeNpk(row.npk),
    salesman: row.salesman || row.name || '',
    ph: String(row.ph || '').toUpperCase(),
    monthly_values:
      row.monthly_values &&
      typeof row.monthly_values === 'object' &&
      !Array.isArray(row.monthly_values)
        ? row.monthly_values
        : {},
  }));
}

export default function App({
  salesOffice = DEFAULT_OFFICE,
  reportPeriod = DEFAULT_PERIOD,
  selectedNpk = null,
}) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [phFilter, setPhFilter] = useState('ALL');
  const [selectedSalesman, setSelectedSalesman] = useState(null);
  const [dismissedNpk, setDismissedNpk] = useState(null);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const notify = useCallback((message) => {
    setNotification(message);
  }, []);

  useEffect(() => {
    if (!notification) return undefined;

    const timeoutId = setTimeout(() => {
      setNotification('');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [notification]);

  // Fetch data tidak mengubah state secara sinkron sebelum request dimulai.
  const fetchScorecard = useCallback(async (signal) => {
    // setLoading(true);
    // setError('');
    try {
      const query = new URLSearchParams({
        sales_office: salesOffice,
        report_period: reportPeriod,
      });

      
      const response = await fetch(
        `${API_BASE_URL}/api/scorecard/productivity?${query.toString()}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal,
        }
      );


      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          `Gagal mengambil scorecard (${response.status}). ${
            message || 'Periksa endpoint backend.'
          }`
        );
      }

      const result = await response.json();

      if (signal.aborted) return;

      const records = normalizeRecords(result);

      setData(records);
      setError('');
    } catch (fetchError) {
      if (fetchError.name === 'AbortError' || signal.aborted) {
        return;
      }

      setError(getErrorMessage(fetchError));
      setData([]);
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, [salesOffice, reportPeriod]);

  useEffect(() => {
    const controller = new AbortController();

    Promise.resolve().then(() => {
      if (!controller.signal.aborted) {
        fetchScorecard(controller.signal);
      }
    });

    return () => {
      controller.abort();
    };
  }, [fetchScorecard, refreshKey]);

  const monthColumns = useMemo(() => {
    const labels = new Set();

    data.forEach((row) => {
      Object.keys(row.monthly_values || {}).forEach((label) => {
        labels.add(getMonthLabel(label));
      });
    });

    return Array.from(labels).sort((a, b) => {
      const difference = getMonthNumber(a) - getMonthNumber(b);

      return difference !== 0
        ? difference
        : a.localeCompare(b);
    });
  }, [data]);

  const phOptions = useMemo(() => {
    return Array.from(
      new Set(data.map((row) => row.ph).filter(Boolean))
    ).sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );
  }, [data]);

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();

    return data.filter((row) => {
      const matchesSearch =
        row.npk.toLowerCase().includes(query) ||
        row.salesman.toLowerCase().includes(query);

      const matchesPh =
        phFilter === 'ALL' || row.ph === phFilter;

      return matchesSearch && matchesPh;
    });
  }, [data, search, phFilter]);

  // Tentukan salesman untuk modal tanpa setState di dalam useEffect.
  const activeSalesman = useMemo(() => {
    if (selectedSalesman) {
      return selectedSalesman;
    }

    if (
      !selectedNpk ||
      normalizeNpk(selectedNpk) === dismissedNpk
    ) {
      return null;
    }

    return (
      data.find(
        (row) => normalizeNpk(row.npk) === normalizeNpk(selectedNpk)
      ) || null
    );
  }, [selectedSalesman, selectedNpk, dismissedNpk, data]);

  const openSalesmanModal = (row) => {
    setSelectedSalesman(row);
    setDismissedNpk(null);
  };

  const closeSalesmanModal = () => {
    setSelectedSalesman(null);

    if (selectedNpk) {
      setDismissedNpk(normalizeNpk(selectedNpk));
    }
  };

  const refreshScorecard = () => {
    setError('');
    setLoading(true);
    setRefreshKey((value) => value + 1);
  };

  const exportIndividualReport = () => {
    if (!activeSalesman) return;

    const row = activeSalesman;
    const detailRows = getScorecardsForSalesman(row, reportPeriod);

    const csvRows = [
      ['NPK', row.npk],
      ['Salesman', row.salesman],
      ['PH', row.ph],
      ['Periode', formatPeriod(reportPeriod)],
      [],
      ['Aspek', 'Indikator', 'Nilai'],
      ...detailRows.map((item) => [
        item.aspect,
        item.indicator,
        item.value ?? '',
      ]),
    ];

    const csvContent = csvRows
      .map((line) =>
        line
          .map((value) => {
            const text = String(value ?? '');
            return `"${text.replace(/"/g, '""')}"`;
          })
          .join(',')
      )
      .join('\r\n');

    const blob = new Blob(
      ['\uFEFF', csvContent],
      { type: 'text/csv;charset=utf-8;' }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `scorecard-${row.npk}-${reportPeriod}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    notify(`Laporan ${row.salesman} berhasil diekspor.`);
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-12 font-sans text-slate-900">
      {notification && (
        <div
          role="status"
          className="fixed right-5 top-5 z-[70] flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-xs text-white shadow-xl"
        >
          <span>✓</span>
          {notification}
        </div>
      )}

      <header className="flex flex-col items-center justify-between gap-4 bg-slate-900 px-4 py-4 text-white shadow-md sm:px-6 md:flex-row">
        <div className="min-w-0">
          <h1 className="flex items-center gap-2 text-sm font-bold sm:text-base">
            <span>📊</span>
            Salesman Performance Master Matrix &amp; Scorecard
          </h1>

          <p className="mt-1 text-xs text-slate-400">
            Periode: {formatPeriod(reportPeriod)}
            {' • '}
            {salesOffice}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
          <input
            type="search"
            placeholder="Cari NPK atau nama salesman..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-400 focus:border-blue-500 sm:w-64"
            aria-label="Cari NPK atau nama salesman"
          />

          <select
            value={phFilter}
            onChange={(event) => setPhFilter(event.target.value)}
            className="rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
            aria-label="Filter product hierarchy"
          >
            <option value="ALL">Semua PH</option>
            {phOptions.map((ph) => (
              <option key={ph} value={ph}>
                {ph}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={refreshScorecard}
            disabled={loading}
            className="rounded bg-blue-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Memuat...' : '↻ Refresh'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] p-3 sm:p-4 md:p-6">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 bg-slate-50 p-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-sm font-extrabold uppercase text-slate-800">
                Detail Scorecard Produktivitas &amp; Penilaian
              </h2>

              <p className="mt-1 text-[11px] text-slate-500">
                Data sumber: RAPOT Produktifitas dari Supabase
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm bg-emerald-500" />
                Tinggi (≥ 10)
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm bg-amber-400" />
                Sedang (8,5–9,9)
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm bg-red-600" />
                Rendah (&lt; 8,5)
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-b border-slate-200 px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p className="text-slate-600">
              Menampilkan{' '}
              <strong className="text-blue-700">
                {filteredData.length}
              </strong>
              {' dari '}
              <strong className="text-slate-900">{data.length}</strong>
              {' salesman'}
            </p>

            {loading && (
              <p className="text-blue-700" role="status">
                Mengambil data scorecard...
              </p>
            )}
          </div>

          {error && (
            <div className="m-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <p className="font-bold">Gagal memuat data scorecard</p>
              <p className="mt-1 break-words text-xs">{error}</p>
              <p className="mt-2 text-xs">
                Periksa URL API, nama endpoint, dan log backend.
              </p>

              <button
                type="button"
                onClick={refreshScorecard}
                className="mt-3 rounded bg-red-700 px-3 py-2 text-xs font-bold text-white hover:bg-red-800"
              >
                Coba lagi
              </button>
            </div>
          )}

          {!loading && !error && data.length === 0 && (
            <div className="p-10 text-center">
              <p className="text-sm font-bold text-slate-700">
                Data scorecard belum tersedia
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Pastikan data sudah masuk ke tabel scorecard_productivity
                dan filter periode serta sales office sesuai.
              </p>
            </div>
          )}

          {data.length > 0 && (
            <>
              <p className="px-4 pt-3 text-[10px] text-slate-500 md:hidden">
                Geser tabel ke samping untuk melihat semua bulan dan indikator.
              </p>

              <div
                className="max-h-[560px] max-w-full overflow-auto"
                role="region"
                aria-label="Tabel scorecard seluruh salesman"
                tabIndex={0}
              >
                <table className="w-max min-w-full border-collapse whitespace-nowrap text-[11px]">
                  <thead className="sticky top-0 z-30 bg-slate-900 text-center font-bold text-white">
                    <tr>
                      <th className="sticky left-0 z-40 min-w-[68px] border border-slate-700 bg-slate-900 px-3 py-3">
                        NPK
                      </th>

                      <th className="sticky left-[68px] z-40 min-w-[190px] border border-slate-700 bg-slate-900 px-3 py-3 text-left">
                        SALESMAN
                      </th>

                      <th className="min-w-[70px] border border-slate-700 px-3 py-3">
                        PH
                      </th>

                      {monthColumns.map((month) => (
                        <th
                          key={month}
                          className="min-w-[76px] border border-slate-700 px-3 py-3"
                        >
                          {month}
                        </th>
                      ))}

                      <th className="min-w-[72px] border border-slate-700 bg-slate-700 px-3 py-3">
                        Q1
                      </th>

                      {METRICS.map((metric) => (
                        <th
                          key={metric.key}
                          className="min-w-[85px] border border-slate-700 bg-slate-800 px-3 py-3"
                        >
                          {metric.label}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.map((row) => {
                      const isSelected =
                        activeSalesman &&
                        normalizeNpk(activeSalesman.npk) ===
                          normalizeNpk(row.npk);

                      const normalizedMonths = {};

                      Object.entries(row.monthly_values || {}).forEach(
                        ([key, value]) => {
                          normalizedMonths[getMonthLabel(key)] = value;
                        }
                      );

                      return (
                        <tr
                          key={`${row.sales_office || salesOffice}-${row.report_period || reportPeriod}-${row.npk}`}
                          onClick={() => openSalesmanModal(row)}
                          className={`cursor-pointer border-b border-slate-200 text-center transition-colors hover:bg-blue-50 ${
                            isSelected ? 'ring-1 ring-inset ring-blue-400' : ''
                          }`}
                        >
                          <td
                            className={`sticky left-0 z-10 border border-slate-200 px-3 py-2 font-bold ${
                              isSelected
                                ? 'bg-blue-100 text-blue-900'
                                : 'bg-white text-slate-800'
                            }`}
                          >
                            {row.npk}
                          </td>

                          <td
                            className={`sticky left-[68px] z-10 border border-slate-200 px-3 py-2 text-left font-semibold ${
                              isSelected
                                ? 'bg-blue-100 text-blue-900'
                                : 'bg-white text-slate-800'
                            }`}
                          >
                            {row.salesman || '—'}
                          </td>

                          <td className="border border-slate-200 bg-slate-50 px-3 py-2 font-medium">
                            {row.ph || '—'}
                          </td>

                          {monthColumns.map((month) => (
                            <td
                              key={month}
                              className={`border border-slate-200 px-3 py-2 ${getCellColor(normalizedMonths[month])}`}
                            >
                              {formatValue(normalizedMonths[month])}
                            </td>
                          ))}

                          <td className="border border-slate-200 bg-slate-100 px-3 py-2 font-bold text-slate-800">
                            {formatValue(row.q1)}
                          </td>

                          {METRICS.map((metric) => (
                            <td
                              key={metric.key}
                              className={`border border-slate-200 px-3 py-2 ${getMetricColor(row[metric.key])}`}
                            >
                              {formatValue(row[metric.key], 0)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}

                    {!filteredData.length && (
                      <tr>
                        <td
                          colSpan={monthColumns.length + METRICS.length + 3}
                          className="px-4 py-10 text-center text-xs text-slate-500"
                        >
                          Tidak ada salesman yang cocok dengan pencarian atau filter PH.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </main>

      {activeSalesman && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-5"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeSalesmanModal();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="scorecard-modal-title"
            className="my-auto max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-800">
                    NPK: {activeSalesman.npk}
                  </span>

                  <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-800">
                    PH: {activeSalesman.ph || '—'}
                  </span>
                </div>

                <h2
                  id="scorecard-modal-title"
                  className="mt-2 text-base font-extrabold uppercase text-slate-900"
                >
                  {activeSalesman.salesman}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {formatPeriod(activeSalesman.report_period || reportPeriod)}
                </p>
              </div>

              <button
                type="button"
                onClick={closeSalesmanModal}
                className="shrink-0 rounded-full bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-800 transition hover:bg-slate-300"
              >
                ✕ Tutup
              </button>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200">
              <div className="border-b border-slate-200 bg-slate-50 p-3">
                <h3 className="text-xs font-bold uppercase text-slate-800">
                  Detail Scorecard Aspek &amp; Key Performance Indicators
                </h3>

                <p className="mt-1 text-[10px] text-slate-500">
                  Nilai diambil langsung dari data scorecard yang tersimpan.
                </p>
              </div>

              <div className="max-w-full overflow-x-auto">
                <table className="w-full min-w-[650px] border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="border border-slate-700 p-3 text-left">
                        ASPECTS
                      </th>
                      <th className="border border-slate-700 p-3 text-left">
                        KEY INDICATORS
                      </th>
                      <th className="border border-slate-700 p-3 text-center">
                        STATUS
                      </th>
                      <th className="border border-slate-700 p-3 text-center">
                        FINAL VALUE
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {getScorecardsForSalesman(
                      activeSalesman,
                      reportPeriod
                    ).map((item) => {
                      const status = getMetricStatus(item.value);

                      return (
                        <tr
                          key={item.aspect}
                          className="border-b border-slate-200 hover:bg-slate-50"
                        >
                          <td className="border border-slate-200 p-3 font-bold text-slate-700">
                            {item.aspect}
                          </td>

                          <td className="border border-slate-200 p-3 text-slate-600">
                            {item.indicator}
                          </td>

                          <td className="border border-slate-200 p-3 text-center">
                            <span
                              className={`inline-block rounded px-2 py-1 text-[10px] font-bold text-white ${status.color}`}
                            >
                              {status.text}
                            </span>
                          </td>

                          <td className="border border-slate-200 bg-slate-50 p-3 text-center font-extrabold text-slate-800">
                            {formatValue(item.value)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col justify-between gap-2 bg-slate-50 p-3 text-xs sm:flex-row sm:items-center">
                <span className="font-bold text-slate-700">
                  DATA SALESMAN: {activeSalesman.salesman}
                </span>

                <span className="text-slate-500">
                  NPK {activeSalesman.npk} • {activeSalesman.ph}
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col-reverse justify-end gap-2 sm:flex-row">
              <button
                type="button"
                onClick={closeSalesmanModal}
                className="rounded bg-slate-800 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-900"
              >
                Tutup
              </button>

              <button
                type="button"
                onClick={exportIndividualReport}
                className="rounded bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow transition hover:bg-blue-700"
              >
                📥 Export Laporan CSV
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
