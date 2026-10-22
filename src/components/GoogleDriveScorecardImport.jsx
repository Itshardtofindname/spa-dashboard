import { useState } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const APP_ID = import.meta.env.VITE_GOOGLE_APP_ID;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GOOGLE_API_SCRIPT = 'https://apis.google.com/js/api.js';
const GOOGLE_IDENTITY_SCRIPT = 'https://accounts.google.com/gsi/client';

const XLSX_MIME =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

function loadScript(src, isReady) {
  if (isReady()) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    let script = document.querySelector(`script[src="${src}"]`);

    if (script?.dataset.loaded === 'true') {
      if (isReady()) {
        resolve();
        return;
      }
    }

    const handleLoad = () => {
      script.dataset.loaded = 'true';
      cleanup();

      if (isReady()) {
        resolve();
      } else {
        reject(new Error(`Pustaka Google tidak siap: ${src}`));
      }
    };

    const handleError = () => {
      cleanup();
      reject(new Error(`Gagal memuat pustaka Google: ${src}`));
    };

    const cleanup = () => {
      script?.removeEventListener('load', handleLoad);
      script?.removeEventListener('error', handleError);
    };

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    }

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });
  });
}

function getApiEndpoint() {
  const configuredBaseUrl =
    import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

  const baseUrl = configuredBaseUrl.replace(/\/+$/, '');

  if (/\/api$/i.test(baseUrl)) {
    return `${baseUrl}/scorecard/sync-drive`;
  }

  return `${baseUrl}/api/scorecard/sync-drive`;
}

export default function GoogleDriveScorecardImport() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [importToken, setImportToken] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Siap memilih file.');
  const [loading, setLoading] = useState(false);
  const [pickerLoading, setPickerLoading] = useState(false);

  function showError(message) {
    setError(message);
    setStatus('Proses gagal.');
    setPickerLoading(false);
  }

  async function chooseFile() {
    setError('');
    setResult(null);
    setSelectedFile(null);
    setPickerLoading(true);
    setStatus('Memuat pustaka Google...');

    try {
      if (!API_KEY || !APP_ID || !CLIENT_ID) {
        throw new Error(
          'Konfigurasi Google Picker belum lengkap. Periksa ' +
            'VITE_GOOGLE_API_KEY, VITE_GOOGLE_APP_ID, dan ' +
            'VITE_GOOGLE_CLIENT_ID.'
        );
      }

      await Promise.all([
        loadScript(
          GOOGLE_API_SCRIPT,
          () => Boolean(window.gapi)
        ),
        loadScript(
          GOOGLE_IDENTITY_SCRIPT,
          () => Boolean(window.google?.accounts?.oauth2)
        ),
      ]);

      if (!window.gapi || !window.google?.accounts?.oauth2) {
        throw new Error('Pustaka autentikasi Google tidak tersedia.');
      }

      setStatus('Meminta izin akses Google Drive...');

      const tokenClient =
        window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/drive.file',

          callback: (tokenResponse) => {
            if (
              tokenResponse.error ||
              !tokenResponse.access_token
            ) {
              console.error('Google OAuth gagal:', {
                error: tokenResponse.error,
                description: tokenResponse.error_description,
              });

              showError(
                'Autentikasi Google gagal: ' +
                  (tokenResponse.error_description ||
                    tokenResponse.error ||
                    'Token akses tidak tersedia.')
              );
              return;
            }

            setStatus('Membuka Google Picker...');

            window.gapi.load('picker', {
              callback: () => {
                try {
                  if (!window.google?.picker) {
                    throw new Error(
                      'Pustaka Google Picker tidak tersedia.'
                    );
                  }

                  const pickerApi = window.google.picker;

                  const view = new pickerApi.DocsView(
                    pickerApi.ViewId.DOCS
                  )
                    .setMimeTypes(XLSX_MIME)
                    .setIncludeFolders(false);

                  const picker = new pickerApi.PickerBuilder()
                    .setAppId(APP_ID)
                    .setDeveloperKey(API_KEY)
                    .setOAuthToken(tokenResponse.access_token)
                    .setOrigin(window.location.origin)
                    .addView(view)
                    .setCallback((data) => {
                      const action = data?.action;

                      console.info('Google Picker action:', action);

                      if (action === pickerApi.Action.CANCEL) {
                        setStatus('Pemilihan file dibatalkan.');
                        setPickerLoading(false);
                        return;
                      }

                      if (action === pickerApi.Action.PICKED) {
                        const documents =
                          data[pickerApi.Response.DOCUMENTS] ||
                          data.docs ||
                          [];

                        const file = documents[0];

                        if (!file?.id) {
                          showError(
                            'Google Picker tidak mengembalikan ID file.'
                          );
                          return;
                        }

                        setSelectedFile({
                          id: file.id,
                          name: file.name || 'File Excel',
                        });

                        setResult(null);
                        setError('');
                        setStatus(
                          'File dipilih. Tekan "Validasi tanpa impor" untuk menguji backend.'
                        );
                        setPickerLoading(false);

                        console.info('File berhasil dipilih:', {
                          name: file.name || 'File Excel',
                          hasId: Boolean(file.id),
                        });

                        return;
                      }

                      if (
                        action === pickerApi.Action.ERROR ||
                        action === 'error'
                      ) {
                        console.error('Google Picker error:', {
                          action,
                          message:
                            data.errorMessage || data.error || null,
                        });

                        showError(
                          'Google Picker gagal memproses permintaan. ' +
                            'Periksa API key, OAuth, dan Console.'
                        );
                      }
                    })
                    .build();

                  picker.setVisible(true);
                  setStatus('Pilih file Excel dari Google Drive.');
                  setPickerLoading(false);
                } catch (err) {
                  console.error('Picker initialization failed:', err);
                  showError(
                    err.message || 'Google Picker gagal diinisialisasi.'
                  );
                }
              },
            });
          },

          error_callback: (oauthError) => {
            // Jangan mencatat access token atau data rahasia.
            console.error('Google OAuth popup gagal:', {
              type: oauthError?.type,
              message: oauthError?.message,
            });

            showError(
              'Jendela autentikasi Google gagal dibuka. ' +
                'Periksa popup, OAuth Client ID, dan Console.'
            );
          },
        });

      tokenClient.requestAccessToken();
    } catch (err) {
      console.error('Google Picker setup gagal:', err);
      showError(err.message || 'Google Picker gagal dibuka.');
    }
  }

  async function validateFile() {
    if (!selectedFile?.id) {
      showError('Pilih file Excel terlebih dahulu.');
      return;
    }

    if (!importToken.trim()) {
      showError('Masukkan token impor backend.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setStatus('Mengirim permintaan validasi ke backend...');

    try {
      const endpoint = getApiEndpoint();

      const params = new URLSearchParams({
        sales_office: 'S003 - SO SERPONG',
        report_period: '2026-10-01',
        dry_run: 'true',
        file_id: selectedFile.id,
      });

      console.info('Mengirim validasi scorecard:', {
        endpoint,
        fileName: selectedFile.name,
        dryRun: true,
      });

      const response = await fetch(
        `${endpoint}?${params.toString()}`,
        {
          method: 'POST',
          headers: {
            'X-Import-Token': importToken.trim(),
          },
        }
      );

      const responseText = await response.text();

      let body = {};

      try {
        body = responseText ? JSON.parse(responseText) : {};
      } catch {
        body = { detail: responseText };
      }

      if (!response.ok) {
        throw new Error(
          body.detail ||
            body.message ||
            `Validasi gagal dengan HTTP ${response.status}.`
        );
      }

      setResult(body);
      setStatus('Validasi backend selesai.');
    } catch (err) {
      console.error('Scorecard validation failed:', err);

      showError(
        `${err.message || 'Validasi file gagal.'} ` +
          'Periksa URL backend, token, dan log backend.'
      );
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
        disabled={pickerLoading}
        className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pickerLoading ? 'Memproses Google...' : 'Pilih File Excel'}
      </button>

      {selectedFile && (
        <div className="rounded-md bg-slate-50 p-3 text-sm">
          <p className="font-semibold">{selectedFile.name}</p>
          <p className="mt-1 text-slate-600">
            File berhasil dipilih.
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
      </div>

      <button
        type="button"
        disabled={!selectedFile || !importToken.trim() || loading}
        onClick={validateFile}
        className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Memvalidasi...' : 'Validasi tanpa impor'}
      </button>

      <p className="text-sm text-slate-600" role="status">
        Status: {status}
      </p>

      {error && (
        <p role="alert" className="break-words text-sm text-rose-700">
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