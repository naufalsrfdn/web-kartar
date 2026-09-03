# Website Resmi Organisasi Pemuda Pemudi Krekah Utara (OSKAR)

Official Web Application & Admin Dashboard untuk **Organisasi Pemuda Pemudi Krekah Utara (OSKAR)**. Didesain dengan gaya **Neo-Brutalism Modern**, responsif mobile-first, dan dilengkapi fitur pengelolaan keanggotaan, pendaftaran online, direktori UMKM dusun, serta dokumentasi kegiatan.

🌐 **Domain Resmi:** [https://oskar.my.id](https://oskar.my.id)

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS (Custom Neo-Brutalist utility theme & palette)
- **Database Engine:** SQLite (via Prisma ORM)
- **Icons:** Lucide Icons
- **Image Optimization:** Client-side HTML Canvas Compression (`image-compress.ts`)

---

## 🚀 Fitur Utama

### Website Publik
1. **Home (`/`)**: Banner Hero, Ringkasan 3 Statistik Organisasi, Agenda Terdekat, Dokumentasi Kegiatan Terbaru, Highlight UMKM, & CTA Pendaftaran.
2. **Tentang OSKAR (`/tentang`)**: Profil Sejarah, Visi, Misi, dan Cakupan Wilayah RT (RT 1, RT 2, RT 3).
3. **Anggota (`/anggota`)**: Direktori Anggota Terverifikasi dengan pencarian nama, filter per RT, dan **Pengurus BPH (Ketua, Wakil, Sekretaris, Bendahara) otomatis tampil di posisi paling atas**. Kartu anggota menampilkan **Nama Lengkap & Badge Jabatan**.
4. **Pendaftaran Online (`/pendaftaran`)**: Form pendaftaran online (Nama Lengkap, Jenis Kelamin, Tempat/Tgl Lahir, WA, RT, Upload Foto). Integrasi status Buka/Tutup oleh Admin.
5. **Katalog UMKM Dusun (`/umkm`)**: Direktori usaha warga & pemuda dusun lengkap dengan deskripsi, estimasi harga, dan **tombol direct chat WhatsApp**.
6. **Kegiatan (`/kegiatan`)**: Arsip kegiatan diurutkan dari yang terbaru dengan preview foto & tombol akses ke Google Drive.
7. **Berita (`/berita`)**: Berita dusun & pengumuman dengan detail modal scroll-locked & blurred background.
8. **Kontak (`/kontak`)**: Informasi sekretariat, WhatsApp Admin (`083843418369`), Instagram (`@oskar.krekahutara`), TikTok (`@krekahutara`), Google Maps link (`https://maps.app.goo.gl/XXoM8dnfzE9CZJHEA`), dan form kirim pesan.

### Dashboard Admin (`/admin`)
- **Login Admin (`/admin/login`)**: Keamanan password dengan icon mata (*show/hide password*).
- **Pengaturan & Ubah Password (`/admin/pengaturan`)**:
  - **Password Default Admin:** `artapagedev`
  - **Menu Ubah Password Admin:** Mengubah kata sandi admin secara dinamis langsung dari dashboard.
  - **Toggle Pendaftaran:** Buka/Tutup sistem pendaftaran anggota publik.
- **Approval Pendaftaran (`/admin/pendaftaran`)**: Approve / Reject antrean calon anggota baru.
- **Kelola Anggota (`/admin/anggota`)**: CRUD data anggota, **Filter berdasarkan Gender & RT (1-3)**, set Jabatan BPH, & update foto.
- **Kelola UMKM, Kegiatan, & Berita**: Upload foto langsung dengan **kompresi otomatis Canvas** agar ukuran file sangat ringan.

---

## 📸 Penjelasan Lokasi Penyimpanan File Foto (PENTING)

Foto-foto pada sistem ini (foto profil anggota, preview foto kegiatan, dan thumbnail berita) dikelola dengan skema berikut:

### 1. Penyimpanan Foto di Modus Lokal / Browser (Dev Mode)
- Ketika foto di-upload melalui formulir (di Pendaftaran, Admin Anggota, Admin Kegiatan, atau Admin Berita), sistem menjalankan **Canvas Compression** (`src/lib/image-compress.ts`) secara otomatis di browser.
- Foto dikompres menjadi format Data URL (`data:image/jpeg;base64,...`) yang sangat ringan dan disimpan langsung ke **Browser LocalStorage** (`oskar_members_v2`, `oskar_events_v2`, `oskar_news_v2`).

### 2. Foto Dokumentasi Resolusi Tinggi (Google Drive)
- Untuk foto-foto kegiatan resolusi tinggi (album lengkap acara), disimpan pada **Folder Google Drive OSKAR** yang link-nya diinput oleh admin. Hal ini menjaga agar server hosting tidak penuh.

### 3. Skema Penyimpanan untuk Production Server (`https://oskar.my.id`)
Saat website di-deploy ke server live, file foto dapat disimpan dengan 2 pilihan arsitektur:
- **Opsi A (Hosting VPS / Server Sendiri):** File foto di-upload dan disimpan di direktori server `/public/uploads/` (misalnya `/public/uploads/members/` atau `/public/uploads/events/`).
- **Opsi B (Cloud Storage / Recommended Serverless):** File foto di-upload ke layanan cloud storage seperti **Vercel Blob**, **AWS S3**, atau **Cloudinary**, kemudian URL gambar disimpan ke database SQLite/PostgreSQL.

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

## 🎨 Branding & Credit

- **Organisasi:** Organisasi Pemuda Pemudi Krekah Utara (OSKAR)
- **Domain Resmi:** [https://oskar.my.id](https://oskar.my.id)
- **Wilayah:** Krekah, Gilangharjo, Pandak, Bantul, D.I. Yogyakarta
- **Developer Credit:** `dev by artapage`
