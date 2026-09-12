# 🌿 OSKAR (Organisasi Pemuda Pemudi Krekah Utara) - Web Application

Repository ini berisi kode sumber (*source code*) platform aplikasi web dan dashboard manajemen internal untuk **Organisasi Pemuda Pemudi Krekah Utara (OSKAR)** yang berlokasi di Dusun Krekah, Kelurahan Gilangharjo, Kapanewon Pandak, Kabupaten Bantul, D.I. Yogyakarta.

Aplikasi ini berfungsi sebagai portal informasi publik, direktori anggota, katalog usaha (UMKM) warga dusun, sistem registrasi anggota baru, arsip dokumentasi kegiatan, serta panel dashboard pengelolaan admin.

🌐 **Domain Resmi:** [https://oskar.my.id](https://oskar.my.id)

---

## 💡 Mengapa Platform Ini Dibuat?

Organisasi pemuda di tingkat dusun membutuhkan wadah informasi digital yang independen, cepat, dan mudah diakses oleh warga maupun pemuda setempat. Website OSKAR hadir untuk mempermudah:

1. **Transparansi & Dokumentasi:** Mengarsipkan seluruh program kerja, kegiatan sosial, kebudayaan, dan olahraga pemuda beserta foto dokumentasi resolusi tinggi.
2. **Pemberdayaan Ekonomi Dusun:** Mempromosikan unit usaha (UMKM) milik pemuda dan warga Krekah Utara agar dapat dengan mudah dipesan via WhatsApp.
3. **Pendaftaran Anggota Terintegrasi:** Membuka pendaftaran anggota baru secara online dengan sistem verifikasi langsung oleh pengurus (Admin).
4. **Komunikasi Publik:** Menyediakan sarana kirim pesan langsung dari warga ke pengurus yang terintegrasi dengan balasan otomatis WhatsApp.

---

## 🎨 Desain & Tampilan (Neo-Brutalism Style)

Website ini mengusung gaya **Modern Neo-Brutalism** yang cerah, kontras, dinamis, dan ramah pengguna di perangkat *mobile* maupun *desktop*. Ciri khas desain yang diterapkan:
- Palette warna khas OSKAR (Merah, Kuning, Orange, dan Slate Gelap).
- Garis tepi tegas (*hard borders*) dan bayangan retro (*neo-shadows*).
- Komposisi kartu interaktif (*neo-card hover*) dan animasi mikro yang halus.

---

## 📱 Fitur-Fitur Utama Website

### 🌐 Fitur Halaman Publik
- **Beranda (`/`)**:
  - Banner pengumuman dinamis (*Hero Notice*) yang bisa diatur oleh pengurus.
  - Kartu statistik real-time (Jumlah Anggota Aktif, Kegiatan Dusun, Katalog UMKM).
  - **Agenda Kegiatan Utama**: Otomatis menampilkan kegiatan dengan tanggal paling terbaru.
  - Dokumentasi kegiatan terbaru & highlight produk UMKM favorit warga.
- **Tentang OSKAR (`/tentang`)**:
  - Sejarah singkat, Visi & Misi organisasi, serta penjelasan wilayah dusun (RT 1 Tengah, RT 2 Timur, RT 3 Barat).
- **Direktori Anggota (`/anggota`)**:
  - Daftar anggota aktif yang terverifikasi.
  - Highlight Badan Pengurus Harian (BPH) di bagian atas.
  - Fitur pencarian nama & filter berdasarkan RT maupun Jenis Kelamin.
- **Kegiatan & Dokumentasi (`/kegiatan`)**:
  - Arsip kegiatan dusun yang diurutkan otomatis dari tanggal terbaru.
  - Galeri foto preview dan tautan langsung ke folder Google Drive resmi untuk dokumentasi resolusi tinggi.
- **Berita & Artikel (`/berita`)**:
  - Kabar terkini dan artikel pengumuman seputar kegiatan dusun dengan tampilan baca detail modal yang nyaman.
- **Katalog UMKM Dusun (`/umkm`)**:
  - Etalase produk & jasa buatan pemuda/warga dusun lengkap dengan estimasi harga, lokasi RT, dan tombol **Pesan via WhatsApp** 1-klik.
- **Pendaftaran Anggota (`/pendaftaran`)**:
  - Form pendaftaran online mandiri. Status pendaftaran dapat dibuka atau ditutup secara fleksibel dari panel admin.
- **Kontak & Sekretariat (`/kontak`)**:
  - Informasi kontak resmi, alamat sekretariat, sosial media (Instagram `@oskar.krekahutara` & TikTok `@krekahutara`), form kirim pesan langsung, serta peta lokasi Google Maps interaktif.

---

### 🔑 Panel Dashboard Admin (`/admin`)
Dapat diakses oleh pengurus melalui `/admin/login` (Password default: `artapagedev`):
- **Overview Dashboard (`/admin`)**:
  - Ringkasan cepat metric organisasi (Jumlah Anggota, Antrean Pendaftaran Pending, Pesan Masuk Baru, Total Kegiatan, dan UMKM).
- **Kelola Anggota (`/admin/anggota`)**:
  - Menambah, mengedit, atau menghapus data anggota secara langsung.
- **Verifikasi Pendaftaran (`/admin/pendaftaran`)**:
  - Menyetujui (*Approve*) atau Menolak (*Reject*) calon anggota baru. Pendaftar yang disetujui otomatis berpindah ke daftar anggota aktif.
- **Kelola Kegiatan (`/admin/kegiatan`)**:
  - Mempublikasikan acara baru, memasukkan tautan Google Drive, dan mengunggah foto preview acara.
- **Kelola Berita (`/admin/berita`)**:
  - Menulis dan mengedit artikel berita dusun.
- **Kelola UMKM (`/admin/umkm`)**:
  - Memasukkan data usaha warga ke direktori produk dusun.
- **Pesan Masuk (`/admin/pesan`)**:
  - Membaca pesan masuk publik dari halaman Kontak, menandai status dibaca, serta membalas pengirim via WhatsApp secara instan. Notifikasi badge merah akan muncul di sidebar jika ada pesan baru.
- **Pengaturan Sistem (`/admin/pengaturan`)**:
  - Membuka/menutup sistem pendaftaran online.
  - Mengubah kata sandi akses admin secara dinamis.
  - Mengatur teks banner hero, alamat sekretariat, nomor WA admin, handle sosial media, dan peta lokasi.
  - **Reset Database**: Fitur pembersihan database total jika ingin memulai aplikasi dengan database baru yang bersih (kosong).

---

## ⚡ Teknologi & Arsitektur Teknis

- **Framework Utama:** [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **Styling UI:** [Tailwind CSS](https://tailwindcss.com/) dengan skema kustom Neo-Brutalism.
- **Database Engine & ORM:** [Prisma ORM](https://www.prisma.io/) menggunakan **SQLite Database** (`prisma/dev.db`). Ringan, portabel, dan tidak membutuhkan instalasi database server terpisah.
- **Kompresi Gambar Otomatis:** Menggunakan HTML Canvas Compression (`src/lib/image-compress.ts`) di sisi browser agar ukuran file tetap ringan sebelum diunggah ke server.
- **Icon Set:** [Lucide Icons](https://lucide.dev/) & Komponen SVG TikTok resmi.
- **SEO & Meta:** Didukung OpenGraph, Favicon, `robots.txt`, dan `sitemap.xml` terintegrasi.

---

## 🗂️ Struktur Direktori Proyek

```text
OSKAR/
├── public/                     # Asset statis publik (logo, gambar, favicon)
│   └── logo.png                # Logo resmi OSKAR
├── prisma/                     # Konfigurasi ORM Database & Schema
│   ├── schema.prisma           # Skema Prisma Models
│   └── dev.db                  # Database SQLite
├── src/
│   ├── app/                    # Next.js 14 App Router (Page Routes & API)
│   │   ├── api/                # API Server Endpoints (SQLite DB Integration)
│   │   │   ├── applications/   # CRUD Pendaftaran Anggota
│   │   │   ├── events/         # CRUD Kegiatan & Dokumentasi
│   │   │   ├── members/        # CRUD Data Anggota
│   │   │   ├── messages/       # CRUD Pesan Masuk Publik
│   │   │   ├── news/           # CRUD Artikel & Berita
│   │   │   ├── reset/          # Endpoint Reset Database Clean & Empty
│   │   │   ├── settings/       # CRUD Pengaturan Sistem & Kontak
│   │   │   └── umkm/           # CRUD Katalog UMKM
│   │   ├── admin/              # Panel Dashboard Admin (/admin)
│   │   │   ├── anggota/        # Kelola Anggota & Filter
│   │   │   ├── berita/         # Kelola Berita & Publikasi
│   │   │   ├── kegiatan/       # Kelola Kegiatan & Foto
│   │   │   ├── login/          # Halaman Login Admin
│   │   │   ├── pendaftaran/    # Approval Antrean Pendaftaran Online
│   │   │   ├── pengaturan/     # Pengaturan Kontrol, Password, & Reset DB
│   │   │   ├── pesan/          # Kelola Pesan Masuk & Balas WA
│   │   │   ├── umkm/           # Kelola Direktori UMKM
│   │   │   └── page.tsx        # Dashboard Overview Admin
│   │   ├── anggota/            # Direktori Publik Anggota OSKAR
│   │   ├── berita/             # Halaman Berita Dusun
│   │   ├── kegiatan/           # Halaman Arsip Kegiatan & GDrive
│   │   ├── kontak/             # Halaman Kontak & Form Pesan
│   │   ├── pendaftaran/        # Halaman Form Pendaftaran Anggota Online
│   │   ├── tentang/            # Profil Sejarah, Visi, Misi & Wilayah RT
│   │   ├── umkm/               # Halaman Katalog UMKM & WA Order
│   │   ├── globals.css         # Styling global & utility class Neo-Brutalism
│   │   ├── layout.tsx          # Root Layout & Metadata SEO
│   │   └── page.tsx            # Halaman Utama (Home Page)
│   │
│   ├── components/             # Reusable UI Components (Navbar, Footer, AdminLayout, ConfirmModal, Toast)
│   └── lib/                    # Helper Utilities, Prisma Singleton, & State Management Store
│
├── tailwind.config.ts          # Konfigurasi Tema Neo-Brutalism
├── package.json                # Dependensi & NPM Scripts
└── README.md                   # Dokumentasi Resmi Proyek
```

---

## 🛠️ Cara Menjalankan Aplikasi di Lokal (Development)

Pastikan Node.js (v18+) sudah terinstall di komputer Anda.

```bash
# 1. Clone repository ini
git clone <repository-url>
cd OSKAR

# 2. Install dependensi proyek
npm install

# 3. Setup & push skema database SQLite
npm run db:push

# 4. Jalankan server pengembang (Development mode)
npm run dev

# 5. Buka di browser
# Website Publik: http://localhost:3000
# Panel Admin:    http://localhost:3000/admin/login
# (Default Password Admin: artapagedev)
```

---

## 🤝 Pengembang & Informasi Organisasi

- **Organisasi:** Pemuda Pemudi Krekah Utara (OSKAR)
- **Lokasi:** Krekah, Gilangharjo, Pandak, Bantul, D.I. Yogyakarta
- **Domain Resmi:** [https://oskar.my.id](https://oskar.my.id)
- **Developer Credit:** `dev by artapage`
