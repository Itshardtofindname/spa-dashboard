
import { useState } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const APP_ID = import.meta.env.VITE_GOOGLE_APP_ID;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const XLSX_MIME =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);

    if (existing?.dataset.loaded === 'true') {
      resolve();
      return;
    }

    const script = existing || document.createElement('script');

    script.src = src;
    script.async = true;

    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };

    script.onerror = () => reject(
      new Error('Gagal memuat pustaka Google.')
    );

    if (!existing) document.head.appendChild(script);
  });
}

export default function GoogleDriveScorecardImport() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [importToken, setImportToken] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function chooseFile() {
    setError('');
    setResult(null);

    try {
      if (!API_KEY || !APP_ID || !CLIENT_ID) {
        throw new Error(
          'Konfigurasi Google Picker belum lengkap. Periksa .env.'
        );
      }

      await Promise.all([
        loadScript('https://apis.google.com/js/api.js'),
        loadScript('https://accounts.google.com/gsi/client'),
      ]);

      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/drive.readonly',
        callback: (tokenResponse) => {
          if (tokenResponse.error) {
            setError('Izin Google Drive tidak berhasil diberikan.');
            return;
          }

          window.gapi.load('picker', {
            callback: () => {
              const view = new window.google.picker.DocsView(
                window.google.picker.ViewId.DOCS
              )
                .setMimeTypes(XLSX_MIME)
                .setIncludeFolders(false);

              const picker = new window.google.picker.PickerBuilder()
                .setAppId(APP_ID)
                .setDeveloperKey(API_KEY)
                .setOAuthToken(tokenResponse.access_token)
                .setOrigin(window.location.origin)
                .addView(view)
                .setCallback((data) => {
                  if (
                    data.action ===
                    window.google.picker.Action.PICKED
                  ) {
                    const file = data.docs?.[0];

                    if (file) {
                      setSelectedFile({
                        id: file.id,
                        name: file.name,
                      });
                      setResult(null);
                    }
                  }
                })
                .build();

              picker.setVisible(true);
            },
          });
        },
      });

      tokenClient.requestAccessToken();
    } catch (err) {
      setError(err.message || 'Google Picker gagal dibuka.');
    }
  }

  async function validateFile() {
    if (!selectedFile) {
      setError('Pilih file Excel terlebih dahulu.');
      return;
    }

    if (!importToken.trim()) {
      setError('Masukkan token impor backend.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const baseUrl = (
        import.meta.env.VITE_API_BASE_URL ||
        'http://127.0.0.1:8000/api'
      ).replace(/\/+$/, '').replace(/\/api$/i, '');

      const params = new URLSearchParams({
        sales_office: 'S003 - SO SERPONG',
        report_period: '2026-10-01',
        dry_run: 'true',
        file_id: selectedFile.id,
      });

      const response = await fetch(
        `${baseUrl}/api/scorecard/sync-drive?${params}`,
        {
          method: 'POST',
          headers: {
            'X-Import-Token': importToken.trim(),
          },
        }
      );

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          body.detail || `Validasi gagal (${response.status}).`
        );
      }

      setResult(body);
    } catch (err) {
      setError(err.message || 'Validasi file gagal.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-base font-bold text-slate-800">
          Import Scorecard dari Google Drive
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Pilih file Excel periode Oktober 2026 dan validasi
          sebelum melakukan perubahan database.
        </p>
      </div>

      <button
        type="button"
        onClick={chooseFile}
        className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
      >
        Pilih File Excel
      </button>

      {selectedFile && (
        <div className="rounded-md bg-slate-50 p-3 text-sm">
          <p className="font-semibold">{selectedFile.name}</p>
          <p className="mt-1 break-all text-slate-500">
            File ID: {selectedFile.id}
          </p>
        </div>
      )}

      <div>
        <label
          htmlFor="scorecard-import-token"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Token impor backend
        </label>
        <input
          id="scorecard-import-token"
          type="password"
          autoComplete="off"
          value={importToken}
          onChange={(event) => setImportToken(event.target.value)}
          placeholder="Masukkan token dari konfigurasi backend"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-slate-500">
          Tidak disimpan ke localStorage atau file .env frontend.
        </p>
      </div>

      <button
        type="button"
        disabled={!selectedFile || !importToken || loading}
        onClick={validateFile}
        className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Memvalidasi...' : 'Validasi tanpa impor'}
      </button>

      {error && (
        <p role="alert" className="text-sm text-rose-700">
          {error}
        </p>
      )}

      {result && (
        <pre className="max-h-96 overflow-auto rounded-md bg-slate-50 p-3 text-xs">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </section>
  );
}
