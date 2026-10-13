# SPA Dashboard

SPA Dashboard (*Salesforce Performance Assistance System*) adalah aplikasi frontend untuk demo pemantauan performa salesman, aktivitas kunjungan toko, pencapaian program, dan ringkasan penjualan. Aplikasi dibangun menggunakan React dan Vite, dengan komponen UI yang ditulis dalam JSX dan styling berbasis Tailwind CSS.

> **Status data dan autentikasi:** aplikasi saat ini menggunakan data statis/mock di dalam source code. Form login hanya memeriksa bahwa username dan password tidak kosong; tidak ada autentikasi server, database, atau penyimpanan sesi.

## Daftar Isi

- [Fitur](#fitur)
- [Teknologi](#teknologi)
- [Menjalankan Proyek](#menjalankan-proyek)
- [Alur Aplikasi](#alur-aplikasi)
- [Struktur Folder](#struktur-folder)
- [Penjelasan File](#penjelasan-file)
- [Data dan Perilaku UI](#data-dan-perilaku-ui)
- [Build dan Deploy](#build-dan-deploy)
- [Pengembangan Lanjutan](#pengembangan-lanjutan)

## Fitur

- **Dashboard Performa Sales:** memilih sales office, grup produk, dan salesman untuk menampilkan profil, nilai KPI, rekam bulanan, dan rekomendasi tindak lanjut.
- **Selling Toolkit (Store Visit):** menampilkan profil toko, plafon kredit, pencapaian program, serta rekomendasi cross-sell dan up-sell.
- **Sales Daily Monitoring & Rute DKS:** menampilkan ringkasan aktivitas, rute kunjungan, status toko, dan pencapaian SKU.
- **Weekly & Monthly Summary:** menampilkan target bulanan, performa mingguan, evaluasi tiga pilar, dan strategi SKU.
- **Login dan logout demo:** menyediakan layar masuk sederhana dan tombol logout.
- **Tampilan responsif:** layout menggunakan utility class Tailwind untuk menyesuaikan lebar layar.

## Teknologi

- React 19 dan React DOM
- Vite 8 dengan plugin React
- JavaScript (ES modules) dan JSX
- Tailwind CSS 3, PostCSS, dan Autoprefixer
- ESLint
- `gh-pages` untuk script publikasi ke GitHub Pages

## Menjalankan Proyek

### Prasyarat

- Node.js versi 20.19+ atau 22.12+ yang didukung Vite 8.
- npm.

Periksa versi Node.js dan npm:

```bash
node --version
npm --version
```

### Instalasi

```bash
git clone https://github.com/itshardtofindname/spa-dashboard.git
cd spa-dashboard
npm install
```

### Development server

```bash
npm run dev
```

Buka alamat lokal yang ditampilkan Vite di terminal (umumnya `http://localhost:5173`).

## Alur Aplikasi

1. `index.html` menyediakan elemen root dengan ID `root` dan memuat `src/main.jsx`.
2. `src/main.jsx` memuat stylesheet global, lalu merender komponen `App` di dalam `React.StrictMode`.
3. `src/App.jsx` mengatur status login, tab yang dipilih, serta filter dashboard. Sebelum login, aplikasi merender `LoginPage`.
4. Setelah login, `App` merender `Navbar`, tab navigasi, dan isi tab aktif.
5. Komponen halaman membaca data dari modul di `src/data/`. Beberapa pilihan dropdown mengubah state lokal, sedangkan data contoh yang ditampilkan tidak terhubung ke backend.

## Struktur Folder

```text
spa-dashboard/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── logo.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── ActionPlanSection.jsx
│   │   ├── CalendarPicker.jsx
│   │   ├── DailyMonitoring.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MonthlyTrackRecord.jsx
│   │   ├── Navbar.jsx
│   │   ├── SalesProfileCard.jsx
│   │   ├── ScorecardTable.jsx
│   │   ├── SellingToolkit.jsx
│   │   └── WeeklyMonthlySummary.jsx
│   ├── composables/
│   ├── data/
│   │   ├── dailyMonitoringData.js
│   │   ├── dataSales.js
│   │   ├── mockData.js
│   │   ├── sellingToolkitData.js
│   │   └── weeklySummaryData.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

`dist/` adalah direktori hasil build produksi dan bukan tempat untuk mengubah source aplikasi. Isi `node_modules/` juga dibuat oleh npm dan tidak perlu diedit langsung.

## Penjelasan File

### Entry point dan aplikasi

| File | Tanggung jawab |
|---|---|
| `index.html` | Dokumen HTML awal. Menyediakan `<div id="root">`, metadata viewport, judul halaman, favicon, dan entry script `/src/main.jsx`. |
| `src/main.jsx` | Entry point React. Memanggil `createRoot`, merender `<App />` dalam `React.StrictMode`, dan memuat `index.css`. |
| `src/App.jsx` | Komponen root dan pengatur alur halaman. Menyimpan state login, tab aktif, office, grup produk, dan salesman. Memilih data sales yang cocok dari `databaseSales`, lalu menyusun komponen dashboard atau halaman tab lainnya. |
| `src/index.css` | Memuat directive dasar, komponen, dan utility Tailwind CSS. |
| `src/App.css` | Berisi aturan CSS bergaya template Vite (contohnya `.hero`, `#next-steps`, dan `.counter`). File ini tidak diimpor oleh `main.jsx` atau `App.jsx` pada alur saat ini. |

### Komponen UI (`src/components/`)

| File | Tanggung jawab |
|---|---|
| `LoginPage.jsx` | Form login demo. Memvalidasi input agar username dan password tidak kosong, lalu memanggil callback `onLogin`. Menggunakan logo dari `src/assets/logo.png`. |
| `Navbar.jsx` | Menampilkan logo, nama sistem, dropdown periode, tombol berlabel Export PDF, dan tombol profil yang memicu logout. Dropdown periode dan tombol export saat ini hanya berupa UI; belum mengubah data atau menghasilkan PDF. |
| `SalesProfileCard.jsx` | Menampilkan identitas salesman, nilai akhir, status grade, keterangan, dan breakdown tiga pilar dari prop `data`. |
| `ScorecardTable.jsx` | Membuat tabel aspek dan indikator KPI dari prop `scorecards`. Ringkasan total skor/status di bagian bawah masih ditulis statis di JSX. |
| `MonthlyTrackRecord.jsx` | Menampilkan tabel rekam bulanan dan komponen skor dari prop `records`. |
| `ActionPlanSection.jsx` | Menampilkan daftar repeat order rendah, kekuatan salesman, catatan supervisor, dan rekomendasi dari prop `data`. |
| `SellingToolkit.jsx` | Menyusun halaman store visit: pilihan salesman/customer/hari, status visit, informasi outlet dan kredit, kartu achievement program, tabel rekomendasi cross-sell/up-sell, serta ringkasan order. Sumber utama konten adalah `sellingToolkitData.js`. |
| `DailyMonitoring.jsx` | Menampilkan kontrol salesman/customer/tanggal, kartu ringkasan monitoring, rute kunjungan, dan SKU strategis menggunakan `getDailyMonitoringData`. |
| `WeeklyMonthlySummary.jsx` | Menyajikan informasi salesman, target bulanan, kartu performa mingguan, evaluasi tiga pilar, dan tabel SKU dari `weeklySummaryData.js`. Menggunakan `CalendarPicker` untuk input rentang tanggal. |
| `CalendarPicker.jsx` | Komponen kalender popup mandiri. Membangun grid kalender, menyediakan pilihan bulan/tahun, dan mengirim tanggal terpilih melalui prop `onDateChange`. |

Sebagian tombol seperti ekspor, cetak/kirim order, filter, pencarian, dan live tracking saat ini hanya menampilkan tampilan kontrol; implementasi aksi bisnisnya belum tersedia.

### Data aplikasi (`src/data/`)

| File | Tanggung jawab |
|---|---|
| `dataSales.js` | Mendefinisikan daftar sales office, customer, hari, bulan, tahun, grup produk, dan salesman. Fungsi `createSalesData` membentuk data dashboard (identitas, grade, scorecard, track record, repeat order, dan catatan supervisor); kombinasi office/grup/salesman kemudian dibangun ke `databaseSales`. |
| `sellingToolkitData.js` | Menyimpan satu objek contoh untuk Selling Toolkit, termasuk profil outlet, status kunjungan, plafon kredit, achievement program, dan item cross-sell/up-sell. |
| `dailyMonitoringData.js` | Mengekspor fungsi `getDailyMonitoringData` yang membentuk data contoh untuk header salesman/area, kartu ringkasan, daftar rute kunjungan, dan SKU fokus. |
| `weeklySummaryData.js` | Menyimpan data contoh ringkasan mingguan/bulanan: header periode, identitas salesman, target, kartu mingguan, evaluasi tiga pilar, dan strategi SKU. |
| `mockData.js` | Berisi data profil, pilar, scorecard, outlet repeat order rendah, serta catatan supervisor. File ini tidak diimpor oleh komponen aktif saat ini. |

### Aset, file publik, dan konfigurasi

| File/folder | Tanggung jawab |
|---|---|
| `src/assets/logo.png` | Logo yang dipakai halaman login dan navbar. |
| `src/assets/hero.png` | Aset gambar; tidak ditemukan pemakaian pada alur komponen aktif. |
| `src/assets/react.svg`, `src/assets/vite.svg` | Aset bawaan/template; tidak ditemukan pemakaian pada alur komponen aktif. |
| `public/favicon.svg`, `public/icons.svg` | File statis yang disajikan langsung dari root situs. `index.html` menunjuk favicon ke `/favicon.svg`. |
| `package.json` | Metadata proyek, daftar dependency, dan script npm seperti `dev`, `build`, `lint`, `preview`, serta `deploy`. |
| `package-lock.json` | Mengunci versi dependency untuk instalasi npm yang konsisten. |
| `vite.config.js` | Mengaktifkan plugin React dan menetapkan base path `/spa-dashboard/` untuk build/publikasi yang berada di subpath tersebut. |
| `tailwind.config.js` | Menentukan file HTML/JSX yang dipindai Tailwind untuk menghasilkan class CSS. |
| `postcss.config.js` | Menghubungkan Tailwind CSS dan Autoprefixer ke proses CSS. |
| `eslint.config.js` | Mengatur linting JavaScript/JSX, aturan React Hooks/Refresh, global browser, dan pengecualian folder `dist`. |
| `.gitignore` | Menentukan file/folder lokal atau hasil generate yang tidak dilacak Git. |
| `src/composables/` | Direktori tersedia, tetapi belum berisi modul yang dipakai aplikasi pada versi saat ini. |

## Data dan Perilaku UI

- Seluruh data bisnis pada `src/data/` adalah contoh statis yang dikodekan di source, bukan data live dari SAP, BOSNET, API, atau database.
- Form login menerima **sembarang** username dan password selama keduanya tidak kosong. Jangan gunakan sebagai kontrol keamanan untuk deployment produksi.
- Dropdown pada dashboard mengubah state filter. `App.jsx` mencari kombinasi yang dipilih dalam `databaseSales`; jika tidak ditemukan, data pertama digunakan sebagai fallback.
- Dropdown salesman/customer/hari di Selling Toolkit dan monitoring menyimpan pilihan di state lokal. Beberapa isi halaman masih menggunakan objek contoh tetap, bukan record yang dicari berdasarkan pilihan.
- Sejumlah angka, label periode, progress bar, dan ringkasan skor ditulis statis di komponen. Perubahan data model mungkin memerlukan pembaruan komponen terkait.
- Tidak ada backend, autentikasi, persistensi, integrasi GPS, pengiriman order, atau fitur ekspor laporan yang benar-benar diimplementasikan saat ini.

## Build dan Deploy

```bash
npm run build
```

Vite menghasilkan file produksi di `dist/`.

Untuk menjalankan preview build lokal:

```bash
npm run preview
```

Untuk memeriksa source dengan ESLint:

```bash
npm run lint
```

Script deploy yang tersedia:

```bash
npm run deploy
```

Script tersebut menjalankan `gh-pages -d dist`, dengan `npm run build` terlebih dahulu melalui lifecycle `predeploy`. Konfigurasi `base` Vite saat ini diarahkan ke `/spa-dashboard/`; sesuaikan jika lokasi publikasi berbeda. Pastikan remote, branch publikasi, dan konfigurasi GitHub Pages sudah benar sebelum menjalankan deploy.

## Pengembangan Lanjutan

Untuk menjadikan aplikasi siap produksi, pertimbangkan untuk:

1. Mengganti data mock dengan API/backend dan menangani loading/error state.
2. Memindahkan autentikasi ke layanan server yang aman; jangan menganggap validasi form frontend sebagai autentikasi.
3. Menghubungkan kontrol tanggal, filter, ekspor, tracking, dan order ke aksi nyata.
4. Memisahkan nilai yang masih ditulis statis di komponen ke data model yang sama agar tampilan konsisten.
5. Menambahkan pengujian untuk logika pembentukan data dan perilaku interaksi.

## Lisensi

Repository ini belum mencantumkan lisensi proyek. Pastikan kebijakan penggunaan dan distribusi dikonfirmasi dengan pemilik repository.
