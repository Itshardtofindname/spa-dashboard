
import { useCallback, useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const APP_ID = import.meta.env.VITE_GOOGLE_APP_ID;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const IMPORT_TOKEN = import.meta.env.VITE_SCORECARD_IMPORT_TOKEN || '';

const XLSX_MIME =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

function getSyncEndpoint() {
  const base = API_BASE_URL.replace(/\/+$/, '');

  return /\/api$/i.test(base)
    ? `${base}/scorecard/sync-drive`
    : `${base}/api/scorecard/sync-drive`;
}

function getProductivityEndpoint() {
  const base = API_BASE_URL.replace(/\/+$/, '');

  return /\/api$/i.test(base)
    ? `${base}/scorecard/productivity`
    : `${base}/api/scorecard/productivity`;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);

    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve();
        return;
      }

      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener(
        'error',
        () => reject(new Error(`Gagal memuat script: ${src}`)),
        { once: true },
      );
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };

    script.onerror = () => {
      script.remove();
      reject(new Error(`Gagal memuat script: ${src}`));
    };

    document.head.appendChild(script);
  });
}

async function loadGooglePicker() {
  await loadScript('https://apis.google.com/js/api.js');
  await loadScript('https://accounts.google.com/gsi/client');

  await new Promise((resolve, reject) => {
    if (!window.gapi?.load) {
      reject(new Error('Google API belum tersedia.'));
      return;
    }

    window.gapi.load('picker', {
      callback: resolve,
      onerror: () => reject(new Error('Google Picker gagal dimuat.')),
      timeout: 15000,
      ontimeout: () => reject(new Error('Google Picker timeout.')),
    });
  });
}

export default function GoogleDriveScorecardImport() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [salesOffice, setSalesOffice] = useState('S003 - SO SERPONG');
  const [reportPeriod, setReportPeriod] = useState('2026-10-01');

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState(null);
  const [validated, setValidated] = useState(false);
  const [sourceFiles, setSourceFiles] = useState([]);
  const [sourceLoading, setSourceLoading] = useState(true);
  const [sourceRefresh, setSourceRefresh] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      sales_office: salesOffice.trim(),
      report_period: reportPeriod,
    });

    async function loadSourceFile() {
      setSourceLoading(true);

      try {
        const response = await fetch(
          `${getProductivityEndpoint()}?${params.toString()}`,
          { headers: { Accept: 'application/json' }, signal: controller.signal },
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const body = await response.json();
        const records = Array.isArray(body)
          ? body
          : Array.isArray(body?.data)
            ? body.data
            : [];
        const files = [...new Set(
          records.map((row) => row.source_file).filter(Boolean),
        )];

        if (!controller.signal.aborted) setSourceFiles(files);
      } catch {
        if (!controller.signal.aborted) setSourceFiles([]);
      } finally {
        if (!controller.signal.aborted) setSourceLoading(false);
      }
    }

    loadSourceFile();
    return () => controller.abort();
  }, [salesOffice, reportPeriod, sourceRefresh]);

  const resetValidation = () => {
    setValidated(false);
    setResult(null);
  };

  const chooseFile = useCallback(async () => {
    setStatus('');
    resetValidation();

    if (!API_KEY || !APP_ID || !CLIENT_ID) {
      setStatus(
        'Konfigurasi Google belum lengkap. Periksa VITE_GOOGLE_API_KEY, VITE_GOOGLE_APP_ID, dan VITE_GOOGLE_CLIENT_ID.',
      );
      return;
    }

    setBusy(true);

    try {
      await loadGooglePicker();

      const tokenClient =
        window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/drive.file',

          callback: (tokenResponse) => {
            if (
              tokenResponse.error ||
              !tokenResponse.access_token
            ) {
              setBusy(false);
              setStatus(
                `Login Google gagal: ${
                  tokenResponse.error || 'token tidak diterima'
                }`,
              );
              return;
            }

            try {
              const pickerApi = window.google.picker;

              const view = new pickerApi.DocsView(
                pickerApi.ViewId.DOCS,
              );

              view.setMimeTypes(XLSX_MIME);
              view.setIncludeFolders(false);

              const picker = new pickerApi.PickerBuilder()
                .setAppId(APP_ID)
                .setDeveloperKey(API_KEY)
                .setOAuthToken(tokenResponse.access_token)
                .setOrigin(window.location.origin)
                .addView(view)
                .setTitle('Pilih file Scorecard Excel')
                .setCallback((data) => {
                  const action = data[pickerApi.Response.ACTION];

                  if (action === pickerApi.Action.PICKED) {
                    const docs =
                      data[pickerApi.Response.DOCUMENTS] ||
                      data.docs ||
                      [];

                    const doc = docs[0];

                    if (!doc?.id) {
                      setSelectedFile(null);
                      resetValidation();
                      setStatus(
                        'File dipilih, tetapi ID file tidak ditemukan.',
                      );
                      setBusy(false);
                      return;
                    }

                    setSelectedFile({
                      id: doc.id,
                      name:
                        doc[pickerApi.Document.NAME] ||
                        doc.name ||
                        'File Excel terpilih',
                      mimeType:
                        doc[pickerApi.Document.MIME_TYPE] ||
                        doc.mimeType ||
                        XLSX_MIME,
                    });

                    resetValidation();

                    setStatus(
                      'File dipilih. Klik "Validasi Excel" untuk melanjutkan.',
                    );
                  } else if (
                    action === pickerApi.Action.CANCEL
                  ) {
                    setStatus('Pemilihan file dibatalkan.');
                  } else if (
                    action === pickerApi.Action.ERROR ||
                    action === 'error'
                  ) {
                    setStatus(
                      'Google Picker melaporkan error. Periksa konfigurasi Google API dan respons Network.',
                    );
                  }

                  setBusy(false);
                })
                .build();

              picker.setVisible(true);
            } catch (error) {
              setBusy(false);
              setStatus(
                error.message || 'Gagal membuka Google Picker.',
              );
            }
          },
        });

      tokenClient.requestAccessToken({ prompt: 'consent' });
    } catch (error) {
      setBusy(false);
      setStatus(error.message || 'Gagal memuat Google Picker.');
    }
  }, []);

  const validateFile = async () => {
    setStatus('');
    resetValidation();

    if (!selectedFile?.id) {
      setStatus(
        'Pilih file Excel dari Google Drive terlebih dahulu.',
      );
      return;
    }

    if (!IMPORT_TOKEN) {
      setStatus(
        'Token impor belum dikonfigurasi. Periksa VITE_SCORECARD_IMPORT_TOKEN pada environment frontend, lalu restart Vite.',
      );
      return;
    }

    if (!salesOffice.trim() || !reportPeriod) {
      setStatus('Sales office dan periode laporan wajib diisi.');
      return;
    }

    setBusy(true);

    const params = new URLSearchParams({
      sales_office: salesOffice.trim(),
      report_period: reportPeriod,
      dry_run: 'true',
      file_id: selectedFile.id,
    });

    try {
      const response = await fetch(
        `${getSyncEndpoint()}?${params.toString()}`,
        {
          method: 'POST',
          headers: {
            'X-Import-Token': IMPORT_TOKEN,
          },
        },
      );

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        const detail =
          typeof body.detail === 'string'
            ? body.detail
            : JSON.stringify(body.detail || body);

        throw new Error(
          `HTTP ${response.status}: ${
            detail || response.statusText
          }`,
        );
      }

      if (body.dry_run !== true) {
        throw new Error(
          'Backend tidak mengonfirmasi hasil validasi dry-run.',
        );
      }

      setResult(body);
      setValidated(true);

      setStatus(
        `Validasi berhasil. ${
          body.sheet_rows_imported ?? 0
        } baris siap diimpor. Database belum diubah.`,
      );
    } catch (error) {
      setStatus(
        `Validasi gagal: ${error.message}. Pastikan backend aktif, URL API benar, token sesuai, dan CORS mengizinkan origin frontend.`,
      );
    } finally {
      setBusy(false);
    }
  };

  const importFile = async () => {
    if (!selectedFile?.id) {
      setStatus(
        'Pilih file Excel dari Google Drive terlebih dahulu.',
      );
      return;
    }

    if (!validated || result?.dry_run !== true) {
      setStatus(
        'Validasi file harus berhasil sebelum impor.',
      );
      return;
    }

    if (!IMPORT_TOKEN) {
      setStatus('Token impor belum dikonfigurasi.');
      return;
    }

    if (!salesOffice.trim() || !reportPeriod) {
      setStatus('Sales office dan periode laporan wajib diisi.');
      return;
    }

    const confirmed = window.confirm(
      `Impor ${result.sheet_rows_imported ?? 0} baris ke database?\n\n` +
        `Sales office: ${salesOffice}\n` +
        `Periode: ${reportPeriod}\n` +
        `File: ${selectedFile.name}\n\n` +
        'Pastikan kantor, periode, dan file sudah benar. Database akan diubah.',
    );

    if (!confirmed) return;

    setBusy(true);
    setStatus('Sedang mengimpor data ke database...');

    const params = new URLSearchParams({
      sales_office: salesOffice.trim(),
      report_period: reportPeriod,
      dry_run: 'false',
      file_id: selectedFile.id,
    });

    try {
      const response = await fetch(
        `${getSyncEndpoint()}?${params.toString()}`,
        {
          method: 'POST',
          headers: {
            'X-Import-Token': IMPORT_TOKEN,
          },
        },
      );

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        const detail =
          typeof body.detail === 'string'
            ? body.detail
            : JSON.stringify(body.detail || body);

        throw new Error(
          `HTTP ${response.status}: ${
            detail || response.statusText
          }`,
        );
      }

      setResult(body);
      setValidated(false);
      if (body.sync_status === 'synced') {
        setSourceRefresh((value) => value + 1);
      }

      if (body.sync_status === 'synced') {
        setStatus(
          'Impor selesai. Backend melaporkan sinkronisasi berhasil.',
        );
      } else if (body.changed === false) {
        setStatus(
          body.message ||
            'Tidak ada perubahan yang diperlukan. Periksa detail hasil impor.',
        );
      } else {
        setStatus(
          body.message ||
            'Permintaan impor berhasil diproses. Periksa detail respons backend.',
        );
      }
    } catch (error) {
      setStatus(
        `Impor gagal: ${error.message}. Periksa respons backend sebelum mencoba kembali.`,
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-4xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Import Scorecard dari Google Drive
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Pilih workbook, validasi data, lalu impor ke database
          setelah hasil validasi dinyatakan benar.
        </p>
      </header>

      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm">
          <p className="font-semibold text-slate-800">Excel yang digunakan bersama</p>
          <p className="mt-1 break-words text-slate-700">
            {sourceLoading
              ? 'Memeriksa sumber Excel...'
              : sourceFiles.length
                ? sourceFiles.join(', ')
                : 'Belum ada nama Excel pada data periode ini.'}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Sumber diambil dari data Scorecard yang tersimpan di database untuk kantor dan periode terpilih.
          </p>
        </div>

        <div>
          <label
            htmlFor="scorecard-office"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Sales office
          </label>

          <input
            id="scorecard-office"
            value={salesOffice}
            onChange={(event) => {
              setSalesOffice(event.target.value);
              resetValidation();
            }}
            disabled={busy}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 disabled:bg-slate-100"
          />
        </div>

        <div>
          <label
            htmlFor="scorecard-period"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Periode laporan
          </label>

          <input
            id="scorecard-period"
            type="date"
            value={reportPeriod}
            onChange={(event) => {
              setReportPeriod(event.target.value);
              resetValidation();
            }}
            disabled={busy}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 disabled:bg-slate-100"
          />

          <p className="mt-1 text-xs text-slate-500">
            Pilih tanggal pertama pada bulan laporan, misalnya
            1 Oktober 2026.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={chooseFile}
            disabled={busy}
            className="rounded-lg bg-slate-800 px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? 'Memproses...' : 'Pilih file Google Drive'}
          </button>

          <button
            type="button"
            onClick={validateFile}
            disabled={busy || !selectedFile}
            className="rounded-lg bg-blue-700 px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Validasi Excel
          </button>

          {validated && result?.dry_run === true && (
            <button
              type="button"
              onClick={importFile}
              disabled={busy}
              className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? 'Memproses...' : 'Impor ke Database'}
            </button>
          )}
        </div>

        {selectedFile && (
          <div className="rounded-lg bg-slate-50 p-3 text-sm">
            <p className="font-semibold text-slate-800">
              File terpilih
            </p>

            <p className="mt-1 break-words text-slate-700">
              {selectedFile.name}
            </p>

            <p className="mt-1 break-all text-xs text-slate-500">
              ID: {selectedFile.id}
            </p>
          </div>
        )}

        {status && (
          <div
            role="status"
            aria-live="polite"
            className="whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
          >
            {status}
          </div>
        )}
      </div>

      {result && (
        <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Hasil {result.dry_run === true ? 'validasi' : 'proses impor'}
          </h2>

          <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-slate-950 p-4 text-xs text-slate-100">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </section>
  );
}
