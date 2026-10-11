# SPA Dashboard

Dashboard aplikasi sales performance dan monitoring toko berbasis React + Vite. Aplikasi ini dirancang untuk membantu tim sales memantau performa, mengecek pencapaian target, melihat aktivitas toko, serta mengelola store visit dan summary mingguan/bulanan dalam satu antarmuka.

## Ringkasan

SPA Dashboard adalah sistem dashboard internal yang berfokus pada:

- monitoring performa salesman
- pengecekan scorecard KPI per area dan produk
- review achievement program dan target sales
- store visit / selling toolkit
- aktivitas daily monitoring dan rute DKS
- summary mingguan dan bulanan
- login sederhana untuk simulasi akses internal

Aplikasi ini menggunakan data statis (dummy/mock data) sehingga cocok untuk demo UI, prototype dashboard, atau kebutuhan presentasi internal.

## Fitur Utama

### 1. Dashboard Performa Sales
- pemilihan Sales Office
- pemilihan Grup Product
- pemilihan Salesman
- profile sales
- scorecard KPI
- monthly track record
- action plan section

### 2. Selling Toolkit (Store Visit)
- informasi toko / outlet
- monitoring achievement program
- kredit dan limit finansial
- cross-sell & up-sell recommendations
- pilihan salesman, customer, dan jadwal visit

### 3. Sales Daily Monitoring & Rute DKS
- monitoring harian sales activity
- rute dan jadwal kerja sales
- tampilan progres kegiatan operasional

### 4. Weekly & Monthly Summary
- evaluasi performa mingguan dan bulanan
- target, pencapaian, dan progress summary
- filter periode, minggu, dan kalender custom

### 5. Login Sederhana
- halaman login awal sebelum masuk dashboard
- validasi dasar username dan password
- representasi alur akses user internal

## Teknologi yang Digunakan

- React 19
- Vite
- JavaScript
- Tailwind CSS
- ESLint

## Prasyarat

Pastikan perangkat Anda sudah memiliki:

- Node.js 18+
- npm atau pnpm

## Instalasi

Clone repository:

```bash
git clone https://github.com/itshardtofindname/spa-dashboard.git
cd spa-dashboard
```

Install dependencies:

```bash
npm install
```

## Menjalankan Aplikasi

Untuk mode development:

```bash
npm run dev
```

Setelah perintah dijalankan, Vite biasanya akan menampilkan URL seperti:

```bash
http://localhost:5173
```

## Build untuk Produksi

```bash
npm run build
```

Hasil build akan dibuat ke folder `dist/`.

## Preview Hasil Build

```bash
npm run preview
```

## Script yang Tersedia

```bash
npm run dev      # menjalankan aplikasi dalam mode development
npm run build    # membuat build produksi
npm run preview  # menampilkan build hasil produksi
npm run lint     # mengecek kualitas kode dengan ESLint
npm run deploy   # deploy ke gh-pages
```

## Struktur Folder

```text
spa-dashboard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── package-lock.json
```

## Catatan Penting

- Data yang ditampilkan saat ini bersifat mock/static dan dibuat untuk kebutuhan demo dashboard.
- Belum ada integrasi backend atau database nyata.
- Login yang ada bersifat frontend-only untuk simulasi akses aplikasi.
- Aplikasi ini cocok untuk prototype sales dashboard internal, presentasi, atau pengembangan lebih lanjut ke versi production.

## Kontribusi

Anda dapat melakukan fork, kembangkan fitur baru, atau menyesuaikan logika bisnis pada data dan komponen sesuai kebutuhan tim sales.

## Lisensi

Proyek ini belum menentukan lisensi resmi. Silakan cek dengan tim pengelola repositori untuk kebijakan lisensinya.
