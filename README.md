# Compro UI — Autocatalog Frontend

Aplikasi frontend untuk platform **Autocatalog** — company profile showroom mobil modern yang menyediakan katalog kendaraan interaktif, booking test drive, dan AI Assistant untuk rekomendasi mobil.

## Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [Vue Router 4](https://router.vuejs.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Alert/Dialog**: [SweetAlert2](https://sweetalert2.github.io/)
- **Calendar**: [V-Calendar](https://vcalendar.io/)
- **Dropdown Select**: [Vue Select](https://vue-select.org/)
- **Deployment**: [Vercel](https://vercel.com/)

## Struktur Direktori

```
compro-ui/
├── src/
│   ├── main.js              # Entry point Vue
│   ├── App.vue              # Root component
│   ├── style.css            # Global styles
│   ├── router/
│   │   └── index.js         # Definisi routing & navigation guard
│   ├── components/
│   │   ├── Navbar.vue           # Navbar (halaman setelah login)
│   │   ├── NavbarLanding.vue    # Navbar untuk landing page
│   │   ├── AdminSidebar.vue     # Sidebar navigasi admin
│   │   └── AdminTopbar.vue      # Topbar panel admin
│   └── views/
│       ├── HomePage.vue         # Landing page (tanpa login)
│       ├── HomePage2.vue        # Home setelah login
│       ├── AboutPage.vue        # Halaman tentang kami
│       ├── KatalogPage.vue      # Katalog mobil (filter & search)
│       ├── DetailCar.vue        # Detail satu unit mobil
│       ├── AiPage.vue           # AI Assistant chat
│       ├── JadwalPage.vue       # Form booking test drive
│       ├── SuccessJadwal.vue    # Konfirmasi booking berhasil
│       ├── MyAppointments.vue   # Daftar janji temu (landing)
│       ├── MyAppointments2.vue  # Daftar janji temu (after login)
│       ├── Reschedule.vue       # Form reschedule janji temu
│       ├── SuccessReschedule.vue# Konfirmasi reschedule berhasil
│       ├── Profile.vue          # Edit profil user
│       ├── Profile2.vue         # Profil ringkas
│       ├── ViewProfile.vue      # Lihat profil user
│       ├── loginUser.vue        # Halaman login
│       ├── RegisterUser.vue     # Halaman registrasi
│       └── admin/
│           ├── Dashboard.vue        # Dashboard admin
│           ├── Katalog.vue          # Manajemen katalog mobil
│           ├── TambahKatalog.vue    # Tambah unit mobil baru
│           ├── EditKatalog.vue      # Edit data mobil
│           ├── DetailProduk.vue     # Detail produk (admin view)
│           ├── SuccessAddKatalog.vue# Konfirmasi tambah mobil
│           ├── ApointmentsAdmin.vue # Daftar semua janji temu
│           ├── DetailApo.vue        # Detail appointment admin
│           ├── JadwalAdmin.vue      # Manajemen jadwal (slot waktu)
│           ├── TambahJadwal.vue     # Tambah slot jadwal baru
│           ├── EditJadwal.vue       # Edit slot jadwal
│           ├── Statistik.vue        # Halaman statistik & laporan
│           ├── BlankNotif.vue       # Notifikasi kosong
│           ├── FilledNotif.vue      # Notifikasi ada isi
│           ├── profileAdmin.vue     # Profil admin
│           └── editProfileAdmin.vue # Edit profil admin
├── public/                  # Asset publik statis
├── index.html               # HTML template
├── vite.config.js           # Konfigurasi Vite
├── vercel.json              # Konfigurasi deployment Vercel
└── package.json
```

## Halaman & Routing

### Publik (Tanpa Login)
| Path | Komponen | Keterangan |
|------|----------|------------|
| `/` | `HomePage` | Landing page showroom |
| `/login` | `loginUser` | Halaman login |
| `/register` | `RegisterUser` | Halaman registrasi |
| `/about` | `AboutPage` | Tentang perusahaan |
| `/katalog` | `KatalogPage` | Katalog mobil dengan filter |
| `/detail/:id` | `DetailCar` | Detail unit mobil |
| `/ai` | `AiPage` | AI Assistant rekomendasi mobil |

### User (Membutuhkan Login)
| Path | Komponen | Keterangan |
|------|----------|------------|
| `/home` | `HomePage2` | Beranda setelah login |
| `/jadwal/:id` | `JadwalPage` | Booking test drive |
| `/success/:id` | `SuccessJadwal` | Konfirmasi booking |
| `/appointments` | `MyAppointments` | Daftar janji temu |
| `/reschedule/:id` | `Reschedule` | Reschedule janji temu |
| `/successreschedule/:id` | `SuccessReschedule` | Konfirmasi reschedule |
| `/profile` | `Profile` | Edit profil user |
| `/viewprofile` | `ViewProfile` | Lihat profil user |

### Admin (Membutuhkan Login + Role Admin)
| Path | Komponen | Keterangan |
|------|----------|------------|
| `/admin/dashboard` | `Dashboard` | Ringkasan statistik |
| `/admin/katalog` | `Katalog` | Manajemen daftar mobil |
| `/admin/addkatalog` | `TambahKatalog` | Tambah mobil baru |
| `/admin/editkatalog/:id` | `EditKatalog` | Edit data mobil |
| `/admin/detail/:id` | `DetailProduk` | Detail produk |
| `/admin/appointment` | `ApointmentsAdmin` | Semua appointment user |
| `/admin/detailapo/:id` | `DetailApo` | Detail appointment |
| `/admin/jadwal` | `JadwalAdmin` | Manajemen slot waktu |
| `/admin/tambahjadwal` | `TambahJadwal` | Tambah slot waktu baru |
| `/admin/editjadwal/:id` | `EditJadwal` | Edit slot waktu |
| `/admin/statistik` | `Statistik` | Laporan & statistik |
| `/admin/profileadmin` | `profileAdmin` | Profil admin |
| `/admin/editprofile` | `EditProfileAdmin` | Edit profil admin |

## Cara Menjalankan

### Development

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (default Vite).

### Build Production

```bash
npm run build
```

Output akan tersedia di folder `dist/`.

### Preview Build

```bash
npm run preview
```

## Konfigurasi

Pastikan backend sudah berjalan dan sesuaikan base URL API di konfigurasi Axios (biasanya ada di `src/main.js` atau file axios instance).

Backend default berjalan di: `http://localhost:8000`

## Autentikasi

Aplikasi menggunakan JWT token yang disimpan di `localStorage` dengan key `token`. Navigation guard di `router/index.js` otomatis mengarahkan pengguna ke halaman `/login` jika mengakses halaman yang membutuhkan autentikasi namun belum login.

## Deployment

Project ini sudah dikonfigurasi untuk deployment ke **Vercel**. File `vercel.json` mengatur SPA routing agar semua path di-redirect ke `index.html`.

```bash
# Deploy via Vercel CLI
vercel --prod
```
