# Website Resmi Organisasi Pemuda Pemudi Krekah Utara (OSKAR)

Official Web Application & Admin Dashboard untuk **Organisasi Pemuda Pemudi Krekah Utara (OSKAR)**. Didesain dengan arsitektur modern **Next.js 14 App Router**, **Prisma ORM**, **SQLite Database (`dev.db`)**, dan gaya tampilan **Neo-Brutalism Modern** yang responsif mobile-first.

🌐 **Domain Resmi:** [https://oskar.my.id](https://oskar.my.id)

---

## 🛠️ Tech Stack & Dependencies

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS (Custom Neo-Brutalist utility theme, curated palette & hard shadows)
- **Database Engine & ORM:** Prisma ORM dengan **SQLite Database** (`prisma/dev.db`)
- **Icons:** Lucide Icons & Custom SVG TikTok Component
- **Image Optimization:** Client-side HTML Canvas Compression (`image-compress.ts`)

---

## 📁 Struktur Project

```text
OSKAR/
├── public/                     # Asset statis publik (logo, gambar, dll)
│   └── logo.png                # Logo resmi OSKAR
├── prisma/                     # Konfigurasi ORM Database & Schema
│   ├── schema.prisma           # Skema Prisma Models (Member, Application, Event, News, Umkm, ContactMessage, Setting)
│   └── dev.db                  # Database SQLite (Development & Production)
├── src/
│   ├── app/                    # Next.js 14 App Router Page Routes & API
│   │   ├── api/                # API Server Endpoints Real-Time
│   │   │   └── messages/       # API CRUD Pesan Masuk Publik (/api/messages)
│   │   ├── admin/              # Panel Dashboard Admin (/admin)
│   │   │   ├── anggota/        # Kelola Anggota & Filter (Gender, RT 1-3)
│   │   │   ├── berita/         # Kelola Berita & Upload Gambar (Auto Kompres)
│   │   │   ├── kegiatan/       # Kelola Kegiatan & Upload Dokumentasi
│   │   │   ├── login/          # Halaman Login Admin (Password: artapagedev)
│   │   │   ├── pendaftaran/    # Approval Antrean Pendaftaran Online
│   │   │   ├── pengaturan/     # Pengaturan Kontak, Maps Embed Artapage, & Ubah Password
│   │   │   ├── pesan/          # Dashboard Kelola Pesan Masuk Publik (/admin/pesan)
│   │   │   ├── umkm/           # Kelola Direktori UMKM Dusun
│   │   │   └── page.tsx        # Dashboard Overview Admin
│   │   ├── anggota/            # Halaman Publik Direktori Anggota OSKAR (Short BPH Top)
│   │   ├── berita/             # Halaman Berita & Modal Detail Blurred
│   │   ├── kegiatan/           # Halaman Kegiatan & Dokumentasi GDrive
│   │   ├── kontak/             # Halaman Kontak Sekretariat, Form Pesan, & Peta Google Maps Embed Artapage
│   │   ├── pendaftaran/        # Halaman Form Pendaftaran Anggota Baru Online
│   │   ├── tentang/            # Halaman Profil Sejarah, Visi, Misi & Wilayah RT (RT 1 Tengah, RT 2 Timur, RT 3 Barat)
│   │   ├── umkm/               # Halaman Katalog UMKM Dusun & Direct WhatsApp Order
│   │   ├── globals.css         # Styling global & utility class Neo-Brutalism
│   │   ├── icon.png            # Favicon logo website
│   │   ├── layout.tsx          # Root Layout & Metadata SEO (https://oskar.my.id)
│   │   ├── page.tsx            # Halaman Utama (Home Page)
│   │   ├── robots.ts           # Konfigurasi SEO Robots.txt
│   │   └── sitemap.ts          # Konfigurasi SEO Sitemap.xml
│   │
│   ├── components/             # Reusable UI Components
│   │   ├── AdminLayout.tsx     # Wrapper Sidebar & Header Dashboard Admin (dengan badge Pesan Baru)
│   │   ├── ConfirmModal.tsx    # Modal konfirmasi tindakan (hapus/approve)
│   │   ├── Footer.tsx          # Footer website publik dinamis dari Admin Settings
│   │   ├── Navbar.tsx          # Header & Navigasi Utama website (8 Menu)
│   │   ├── TikTokIcon.tsx      # SVG Component Icon Logo TikTok Resmi
│   │   └── ToastContainer.tsx  # Sistem Notifikasi Toast Interaktif
│   │
│   └── lib/                    # Helper Utilities, Database Singleton & State Store
│       ├── data-store.tsx      # React Context Store, Database API Sync, & LocalStorage Fallback
│       ├── image-compress.ts   # Helper kompresi gambar client-side (HTML Canvas)
│       ├── mock-data.ts        # Initial seed dataset OSKAR
│       ├── prisma.ts           # Client Prisma Database Singleton
│       ├── types.ts            # Definisi Interface TypeScript
│       └── utils.ts            # Helper fungsi (formatRupiah, formatDate, waLink, cn)
│
├── .gitignore                  # Mengabaikan node_modules, build, .env
├── .npmrc                      # Konfigurasi bin-links=false
├── next.config.js              # Konfigurasi Next.js & domain gambar external
├── package.json                # Daftar dependensi & npm scripts
├── postcss.config.js           # Konfigurasi PostCSS & Tailwind
├── tailwind.config.ts          # Tema Neo-Brutalism (Warna, Shadow, Radius)
├── tsconfig.json               # Konfigurasi TypeScript
└── README.md                   # Dokumentasi proyek OSKAR
```

---

## 💾 Skema Database SQLite (`prisma/schema.prisma`)

Seluruh data aplikasi menggunakan **SQLite Database (`prisma/dev.db`)** yang ringan, portabel, dan tidak memerlukan instalasi database server eksternal tambahan.

### Model Database Prisma:
1. **`ContactMessage`**: Menyimpan pesan pengunjung dari form Kontak (`/kontak`).
   - `id`, `name`, `contact`, `message`, `isRead`, `createdAt`.
2. **`Member`**: Menyimpan data anggota resmi.
   - `id`, `fullName`, `gender`, `pob`, `dob`, `whatsapp`, `rt`, `photoUrl`, `roleTitle`, `isApproved`, `createdAt`.
3. **`MemberApplication`**: Menyimpan antrean pendaftaran online publik.
   - `id`, `fullName`, `gender`, `pob`, `dob`, `whatsapp`, `rt`, `photoUrl`, `status`, `note`, `createdAt`.
4. **`Event`**: Menyimpan data kegiatan dusun.
   - `id`, `title`, `date`, `location`, `description`, `category`, `previewPhotos`, `gdriveUrl`, `createdAt`.
5. **`News`**: Menyimpan artikel berita dusun.
   - `id`, `title`, `slug`, `thumbnail`, `content`, `date`, `category`.
6. **`Umkm`**: Menyimpan data direktori usaha warga.
   - `id`, `name`, `owner`, `whatsapp`, `description`, `priceRange`, `location`, `imageUrl`.
7. **`Setting`**: Menyimpan konfigurasi kontak & maps embed dinamis.

---

## 📬 Fitur Pesan Masuk Publik (`/kontak` -> `/admin/pesan`)

1. **Pengiriman oleh Pengunjung:**
   - Pengunjung mengisi form **"Kirim Pesan ke Pengurus OSKAR"** di halaman `/kontak`.
   - Data pesan dikirim via `POST /api/messages` dan tersimpan ke dalam database SQLite `ContactMessage`.
2. **Pengelolaan oleh Admin:**
   - Pengurus dapat membuka halaman **`Admin -> Pesan Masuk` (`/admin/pesan`)**.
   - Admin dapat membaca isi pesan, memfilter status (Belum Dibaca / Sudah Dibaca), menghapus pesan, serta **langsung membalas pengirim via WhatsApp sekali klik**.
   - Sidebar Admin menampilkan **badge notifikasi merah** jika ada pesan baru yang belum dibaca.

---

## 📸 Penjelasan Lokasi Penyimpanan File Foto

1. **Modul Lokal / Browser (Dev Mode):**
   - Saat foto di-upload (profil anggota, preview kegiatan, thumbnail berita), sistem menjalankan **Canvas Image Compression** (`src/lib/image-compress.ts`) secara otomatis di browser.
   - Ukuran file dikompres menjadi Data URL (`data:image/jpeg;base64,...`) yang sangat ringan dan disimpan langsung ke **Browser LocalStorage** (`oskar_members_v2`, `oskar_events_v2`, `oskar_news_v2`).

2. **Foto Dokumentasi Resolusi Tinggi (Google Drive):**
   - Untuk foto-foto kegiatan resolusi tinggi (album lengkap acara), disimpan pada **Folder Google Drive OSKAR** yang link-nya diinput oleh admin. Hal ini menjaga agar server hosting tidak penuh.

3. **Skema Penyimpanan Production Server (`https://oskar.my.id`):**
   - File foto disimpan pada folder server `/public/uploads/` atau cloud storage ringan (misal Vercel Blob / Cloudinary) dan URL-nya disimpan di database SQLite.

---

## 💻 Cara Menjalankan Aplikasi & Database SQLite di Server / Lokal

```bash
# 1. Install dependensi
npm install --no-bin-links

# 2. Inisialisasi Database SQLite Prisma
npx prisma generate
npx prisma db push

# 3. Jalankan server pengembang Next.js
npm run dev

# 4. Buka browser pada URL:
http://localhost:3000

# 5. Akses Dashboard Admin:
http://localhost:3000/admin/login
# Default Password Admin: artapagedev
```

---

## 🌐 Panduan Deployment ke Production Server (`https://oskar.my.id`)

### 1. Deployment ke Server VPS (Ubuntu + Nginx + PM2)
```bash
# Clone repository di server VPS
git clone <repository-url> /var/www/oskar
cd /var/www/oskar

# Install dependensi & build
npm install --no-bin-links
npx prisma generate
npx prisma db push
npm run build

# Jalankan dengan PM2 Process Manager
pm2 start npm --name "oskar-web" -- start
pm2 save
```

### 2. Deployment ke Vercel / Cloud
1. Push repository ke GitHub / GitLab.
2. Hubungkan repository di **Vercel Dashboard**.
3. Set Custom Domain ke `oskar.my.id`.

---

## 🎨 Branding & Credit

- **Organisasi:** Organisasi Pemuda Pemudi Krekah Utara (OSKAR)
- **Domain Resmi:** [https://oskar.my.id](https://oskar.my.id)
- **Wilayah:** Krekah, Gilangharjo, Pandak, Bantul, D.I. Yogyakarta
- **Developer Credit:** `dev by artapage`
