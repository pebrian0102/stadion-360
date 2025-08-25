# Stadion 360° - Frontend Dashboard

Aplikasi frontend modern untuk monitoring real-time stadion dengan fitur keamanan, kebersihan, simulasi data, visualisasi grafik, dan sistem PoinSuporter.

## 🚀 Tech Stack

- **Framework**: React.js dengan Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Charts**: Recharts untuk visualisasi data
- **Icons**: React Icons (Feather Icons)
- **Font**: Inter & Poppins
- **State Management**: React Context API

## 📦 Instalasi

1. **Clone atau setup project**

   ```bash
   cd fe
   ```

2. **Install dependensi**

   ```bash
   npm install
   npm install recharts  # Library untuk visualisasi grafik
   ```

3. **Jalankan development server**

   ```bash
   npm run dev
   ```

4. **Buka di browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Struktur Project

```
app/
├── components/           # Komponen reusable
│   ├── Sidebar.tsx      # Navigasi sidebar
│   ├── StatCard.tsx     # Kartu statistik
│   ├── StadiumMap.tsx   # Peta stadion SVG interaktif dengan tooltip
│   ├── ActivityLog.tsx  # Log aktivitas real-time
│   └── MainLayout.tsx   # Layout utama
├── pages/               # Halaman aplikasi
│   ├── DashboardPage.tsx    # Halaman dashboard utama dengan grafik
│   ├── SimulatorPage.tsx    # Halaman simulator kontrol
│   ├── SecurityPage.tsx     # Halaman monitoring keamanan
│   └── CleanlinessPage.tsx  # Halaman monitoring kebersihan
├── routes/              # Route handlers
│   ├── home.tsx        # Home route
│   └── profile.$userId.tsx  # Halaman profil suporter dengan PoinSuporter
├── context/             # State management
│   └── SimulationContext.tsx # Context dengan data grafik dan profil user
├── app.css             # Global styles
├── root.tsx            # Root component
└── routes.ts           # Konfigurasi routing
```

## 🎨 Fitur Utama

### 1. Dashboard (/)

- **StatCards**: Menampilkan total penonton, status keamanan, level sampah, dan alert aktif
- **📊 Charts & Analytics**:
  - **LineChart**: Tren Peringatan Keamanan (7 Hari Terakhir)
  - **BarChart**: Tingkat Kebersihan per Sektor dengan warna berbeda
- **StadiumMap**: Peta stadion SVG interaktif dengan:
  - **Hover Tooltips**: Informasi detail saat hover pada marker
  - **Visual Alerts**: Animasi pulse dan ping untuk alert keamanan
  - **Gate Markers**: Pin location dengan status color-coded
  - **Trash Bin Markers**: Indikator level dengan persentase
- **ActivityLog**: Log aktivitas real-time dengan filter berdasarkan tipe
- **Quick Stats**: Status gerbang, statistik harian, dan quick actions

### 2. Profil Suporter (/profile/:userId)

- **📱 User Profile Card**:
  - Avatar pengguna dengan placeholder
  - Saldo PoinSuporter dengan tampilan besar
  - Tombol "Tukarkan Poin" untuk redemption
  - Statistik aktivitas positif dan penukaran poin
- **📋 Riwayat PoinSuporter**:
  - Event log dengan deskripsi lengkap
  - Perubahan poin (+/-) dengan color coding
  - Timestamp aktivitas dalam format Indonesia
  - Load more functionality untuk riwayat panjang
- **💎 Demo Data**:
  - Profil: "Budi Santoso" dengan 2,450 poin
  - Aktivitas: Gerbang keamanan (+10), Buang sampah (+25), dll.

### 3. Simulator (/simulator)

- **Security Alert Simulation**: Memicu alert keamanan di gerbang acak dengan efek visual
- **Trash Level Control**: Slider kontrol level sampah 0-100%
- **Visitor Exit Simulation**: Simulasi pengunjung keluar stadion
- **Real-time Updates**: Semua perubahan terupdate di seluruh aplikasi termasuk grafik

### 4. Security (/security)

- **Gate Monitoring**: Status real-time semua gerbang
- **Security Events**: Log event keamanan dengan timestamp
- **Quick Controls**: Kontrol manual untuk pemindaian dan alert

### 5. Cleanliness (/cleanliness)

- **Trash Bins Status**: Monitoring level sampah semua lokasi
- **Cleaning Schedule**: Jadwal pembersihan dengan status
- **Analytics**: Statistik kebersihan harian

## 🎯 Komponen Detail

### StadiumMap Component

- **🗺️ Interactive SVG Stadium**: Denah stadion dengan field dan tribun
- **📍 Smart Gate Markers**:
  - Pin-shaped markers dengan status color-coded
  - Hover tooltips dengan info "Gerbang X - Status: Aman/Peringatan/Alert"
  - Alert animation dengan double-ring pulse effect
- **🗑️ Trash Bin Markers**:
  - Square markers dengan level indicator dan persentase
  - Hover tooltips dengan info "Tribun X - Terisi: Y%"
  - Color coding berdasarkan level (hijau<50%, biru<75%, kuning<90%, merah≥90%)
- **🎨 Visual Enhancements**:
  - Background pattern dengan titik-titik halus
  - Enhanced legend dengan visual icons
  - Real-time status synchronization dengan SimulationContext
- **⚡ Real-time Updates**: Status berubah berdasarkan simulasi dengan efek visual

**Features:**

- **Dark Theme**: Custom styling sesuai tema aplikasi
- **Responsive**: Auto-resize berdasarkan container
- **Tooltips**: Custom tooltip dengan background gelap
- **Color Coding**: Setiap sektor memiliki warna berbeda
- **Real-time Data**: Terintegrasi dengan SimulationContext

### ActivityLog Component

- **Real-time Logging**: Aktivitas terbaru ditampilkan di atas
- **Type-based Icons**: Icon berbeda untuk success, info, warning, error
- **Location Tags**: Tag lokasi untuk setiap aktivitas
- **Timestamp**: Waktu relatif (misal: "2 menit lalu")

## 🎨 Design System

### Colors

- **Primary Blue**: `#3b82f6` (blue-500)
- **Success Green**: `#22c55e` (green-500)
- **Warning Yellow**: `#f59e0b` (yellow-500)
- **Error Red**: `#ef4444` (red-500)
- **Purple**: `#8b5cf6` (purple-500)

### Dark Theme

- **Background**: `#111827` (gray-900)
- **Surface**: `#1f2937` (gray-800)
- **Border**: `#374151` (gray-700)
- **Text Primary**: `#f9fafb` (gray-100)
- **Text Secondary**: `#9ca3af` (gray-400)

### Typography

- **Primary Font**: Inter
- **Secondary Font**: Poppins
- **Weights**: 300, 400, 500, 600, 700

## 🎉 Demo Data

Aplikasi dilengkapi dengan data dummy realistis:

### 📊 Dashboard Data

- 45,231 total penonton
- 4 gerbang dengan status berbeda
- 4 tempat sampah dengan level bervariasi (45%, 65%, 32%, 58%)
- 10+ log aktivitas dengan timestamp
- Grafik tren keamanan 7 hari (15-22 Juli)
- Data kebersihan 5 sektor (A: 92%, B: 78%, C: 85%, D: 69%, E: 94%)

### 👤 User Profile Data

- **Nama**: Budi Santoso
- **Avatar**: Generated avatar dengan inisial
- **Current Points**: 2,450 PoinSuporter
- **Event Log**:
  - Melewati Gerbang Keamanan (+10 poin)
  - Membuang Sampah pada Tempatnya (+25 poin)
  - Menukar Poin untuk Merchandise (-100 poin)
  - Check-in Tepat Waktu (+15 poin)
  - Melaporkan Fasilitas Rusak (+50 poin)

### 📈 Chart Data

- **Security Trend**: Data 8 hari dengan variasi 0-4 alerts per hari
- **Cleanliness**: 5 sektor dengan warna berbeda dan persentase realistis

## 🚨 Tips Penggunaan

1. **📊 Dashboard Analytics**:

   - Lihat grafik tren keamanan untuk pola waktu alert
   - Monitor tingkat kebersihan per sektor dengan bar chart
   - Hover pada peta untuk detail informasi marker

2. **🗺️ Interactive Map**:

   - Hover mouse pada gerbang/tempat sampah untuk tooltip
   - Perhatikan animasi ring pada gerbang yang alert
   - Gunakan legend untuk memahami color coding

3. **👤 Profile Management**:

   - Akses profil suporter via sidebar
   - Track riwayat PoinSuporter dengan filter earned/spent
   - Simulasi sistem reward untuk engagement penonton

4. **⚡ Simulator Testing**:

   - Gunakan halaman Simulator untuk testing real-time updates
   - Lihat efek visual di peta saat trigger security alert
   - Test responsive charts dengan perubahan data

5. **🎨 Visual Feedback**:

   - Color coding: hijau=normal, kuning=peringatan, merah=alert
   - Animasi pulse untuk menarik perhatian
   - Tooltips untuk informasi detail

6. **📱 Responsive Design**: Test di berbagai ukuran layar
7. **⚡ Performance**: Aplikasi dioptimasi untuk update real-time tanpa lag

## 🔗 Navigasi

- **🏠 Dashboard** (`/`): Overview lengkap stadion dengan grafik analytics
- **🛡️ Security** (`/security`): Detail monitoring keamanan
- **🧹 Cleanliness** (`/cleanliness`): Detail monitoring kebersihan
- **⚡ Simulator** (`/simulator`): Kontrol simulasi dan testing
- **👤 Profil Suporter** (`/profile/123`): Sistem PoinSuporter dan riwayat aktivitas

## 🆕 Fitur Terbaru (v2.0)

### 📊 Data Visualization

- **Recharts Integration**: LineChart dan BarChart dengan dark theme
- **Security Trend Analysis**: Grafik tren peringatan 7 hari terakhir
- **Cleanliness Analytics**: Bar chart perbandingan kebersihan per sektor

### 🗺️ Enhanced Stadium Map

- **Interactive Tooltips**: Hover information untuk setiap marker
- **Visual Alert Effects**: Double-ring animation untuk security alerts
- **Improved Design**: Pin-shaped gates dan enhanced trash bin markers

### 👤 User Profile System

- **PoinSuporter**: Sistem reward dengan tracking riwayat
- **Event Logging**: Detail aktivitas dengan timestamp dan poin
- **Profile Management**: Avatar, statistik, dan redemption interface

### 🎨 UI/UX Improvements

- **Enhanced Animations**: Pulse, ping, dan hover effects
- **Better Typography**: Font weights dan hierarchy yang lebih jelas
- **Responsive Charts**: Auto-resize visualisasi data
- **Improved Legend**: Visual icons untuk better understanding

---

**Stadion 360°** - _Real-time Stadium Analytics Dashboard with Advanced Visualization_
