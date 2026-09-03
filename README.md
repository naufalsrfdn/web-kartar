# Website Resmi Organisasi Pemuda Pemudi Krekah Utara (OSKAR)

Official Web Application & Admin Dashboard untuk **Organisasi Pemuda Pemudi Krekah Utara (OSKAR)**. Didesain dengan gaya **Neo-Brutalism Modern**, responsif mobile-first, dan dilengkapi fitur pengelolaan keanggotaan, pendaftaran online, direktori UMKM dusun, dokumentasi kegiatan, serta laporan kas transparan.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS (Custom Neo-Brutalist utility theme & palette)
- **Database Engine:** SQLite (via Prisma ORM)
- **Icons:** Lucide Icons
- **Deployment & Media:** Local Storage Persisted Client State & Next.js Image Optimization

---

## 🚀 Fitur Utama

### Website Publik
1. **Home (`/`)**: Banner Hero, Ringkasan Statistik Organisasi, Agenda Terdekat, Kegiatan Terbaru, Highlight UMKM, & CTA Pendaftaran.
2. **Tentang OSKAR (`/tentang`)**: Profil Sejarah, Visi, Misi, dan Tujuan Organisasi.
3. **Anggota (`/anggota`)**: Direktori Anggota Terverifikasi dengan pencarian nama, filter per RT (RT 1, RT 2, RT 3), dan **Pengurus BPH otomatis tampil di posisi paling atas**.
4. **Pendaftaran Online (`/pendaftaran`)**: Form pendaftaran online (Nama Lengkap, Jenis Kelamin, POB/DOB, WA, RT, Upload Foto). Integrasi status Buka/Tutup oleh Admin.
5. **Katalog UMKM Dusun (`/umkm`)**: Direktori usaha warga & pemuda dusun lengkap dengan deskripsi, estimasi harga, dan **tombol direct chat WhatsApp**.
6. **Kegiatan (`/kegiatan`)**: Arsip kegiatan diurutkan dari yang terbaru dengan preview foto & tombol akses ke Google Drive.
7. **Berita (`/berita`)**: Berita dusun & pengumuman dengan detail modal scroll-locked & blurred background.
8. **Kontak (`/kontak`)**: Informasi sekretariat, WhatsApp Admin (`083843418369`), Instagram (`@oskar.krekahutara`), TikTok (`@krekahutara`), Google Maps link (`https://maps.app.goo.gl/XXoM8dnfzE9CZJHEA`), dan form kirim pesan.

### Dashboard Admin (`/admin`)
- **Login Admin (`/admin/login`)**: Keamanan password dengan icon mata (*show/hide password*).
- **Pengaturan & Ubah Password (`/admin/pengaturan`)**:
  - **Password Default Admin:** `artapagedev`
  - **Menu Ubah Password:** Mengubah kata sandi admin secara dinamis langsung dari dashboard.
  - **Toggle Pendaftaran:** Buka/Tutup sistem pendaftaran anggota publik.
- **Approval Pendaftaran (`/admin/pendaftaran`)**: Approve / Reject antrean calon anggota.
- **Kelola Anggota (`/admin/anggota`)**: CRUD anggota, set Jabatan BPH (**Ketua**, **Wakil Ketua**, **Sekretaris**, **Bendahara**), & update foto (dengan pembersihan otomatis foto lama).
- **Kelola UMKM, Kegiatan, Berita, & Keuangan**: Upload foto langsung dengan **kompresi otomatis Canvas** agar ringan.

---

## 💻 Cara Menjalankan Aplikasi di Lokal

```bash
# 1. Install dependensi
npm install --no-bin-links

# 2. Jalankan server pengembang
npm run dev

# 3. Buka browser pada URL:
http://localhost:3000

# 4. Akses Dashboard Admin:
http://localhost:3000/admin/login
# Default Password Admin: artapagedev
```

---

## 🛡️ Git Ignore Configuration

File `.gitignore` telah dikonfigurasi untuk mencegah file berikut di-upload ke repository git:
- `node_modules/`
- `.next/` / `build/`
- `.env` / `.env.local`
- `prisma/dev.db`
- Log & cache files

---

## 🎨 Branding & Credit

- **Organisasi:** Organisasi Pemuda Pemudi Krekah Utara (OSKAR)
- **Wilayah:** Krekah, Gilangharjo, Pandak, Bantul, D.I. Yogyakarta
- **Developer Credit:** `dev by artapage`
