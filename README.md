# Konstruksi dan Evolusi Perangkat Lunak

Proyek ini merupakan bagian dari tugas pembelajaran mata kuliah **Konstruksi dan Evolusi Perangkat Lunak**.

---

## Tech Stack

- **Framework**: [Laravel 13](https://laravel.com/) (PHP 8.3+)
- **Build**: [Vite](https://vite.dev/) & [Laravel Vite Plugin](https://laravel.com/docs/vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [PHPUnit](https://phpunit.de/)
- **Code Formatter / Linter**: [Laravel Pint](https://laravel.com/docs/pint)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)

---

## Getting Started

### Must have
- [PHP](https://www.php.net/) (versi 8.3 ke atas)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) (versi 18 ke atas)
- [npm](https://www.npmjs.com/)

### Instalasi & Running Apps

1. **Clone repositori**:
   ```bash
   git clone <URL_REPOSITORY>
   cd laravel-app
   ```

2. **Install dependensi**:
   ```bash
   composer install
   npm install
   ```

3. **Konfigurasi Environment**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Jalankan Migrasi Database**:
   ```bash
   php artisan migrate
   ```

5. **Jalankan development**:
   ```bash
   composer run dev
   ```
   *Atau jalankan secara terpisah:*
   ```bash
   php artisan serve
   npm run dev
   ```
   Buka browser di `http://localhost:8000`.

---

## Scripts

Di dalam direktori project, kamu dapat menggunakan beberapa skrip berikut:

| Perintah | Deskripsi |
| --- | --- |
| `composer run dev` | Menjalankan server Laravel, queue worker, logs, dan Vite secara bersamaan |
| `php artisan serve` | Menjalankan server pengembangan lokal Laravel |
| `npm run dev` | Menjalankan server pengembangan lokal Vite dengan Hot Module Replacement (HMR) |
| `npm run build` | Melakukan kompilasi dan optimasi bundle untuk produksi |
| `php artisan test` | Menjalankan unit & feature test secara otomatis menggunakan PHPUnit |
| `./vendor/bin/pint` | Memeriksa dan memformat standar kode PHP menggunakan Laravel Pint |

---

## Struktur Direktori

```text
laravel-app/
├── .github/
│   └── workflows/
│       └── ci.yml             # Workflow GitHub Actions
├── app/                       # Logika inti aplikasi (Models, Controllers, Providers)
├── bootstrap/                 # Inisialisasi dan konfigurasi framework Laravel
├── config/                    # File konfigurasi aplikasi
├── database/                  # Skema database, migrasi, factories, dan seeders
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── public/                    # Entry point aplikasi (index.php) dan aset statis publik
├── resources/                 # Sumber daya frontend (Views Blade, CSS, JS)
│   ├── css/                   # Stylesheet & konfigurasi Tailwind CSS
│   ├── js/                    # Script frontend
│   └── views/                 # Template Blade
├── routes/                    # Definisi rute aplikasi (web.php, console.php)
├── storage/                   # File log, cache, dan berkas terkompilasi
├── tests/                     # Berkas pengujian otomatis (Feature & Unit tests)
│   ├── Feature/
│   └── Unit/
├── .env.example               # Contoh konfigurasi environment
├── artisan                    # CLI executable Laravel
├── composer.json              # Daftar dependensi PHP & script Composer
├── package.json               # Daftar dependensi & script npm
├── phpunit.xml                # Konfigurasi pengujian PHPUnit
├── vite.config.js             # Konfigurasi Vite & Tailwind CSS plugin
└── README.md                  # Dokumentasi proyek
```

---

## Conventional Git Commits

Proyek ini menerapkan standar **Conventional Commits** untuk menjaga message git tetap terstruktur dan informatif:

- `feat:` Menambahkan fitur baru bagi pengguna (contoh: `feat(auth): add login functionality`)
- `fix:` Memperbaiki bug atau kesalahan fungsi (contoh: `fix(auth): prevent invalid credentials submission`)
- `docs:` Perubahan atau penambahan dokumentasi (contoh: `docs: update setup guide in readme`)
- `chore:` Perubahan build tooling, konfigurasi, atau dependensi (contoh: `chore(deps): update composer dependencies`)
- `test:` Penambahan atau perbaikan unit/feature test (contoh: `test(auth): add unit test for user registration`)
- `ci:` Konfigurasi workflow atau otomasi CI/CD (contoh: `ci: add github actions test workflow`)

---

## Alur CI/CD (Continuous Integration)

Setiap *push* atau *pull request* yang dilakukan ke branch `main` akan secara otomatis memicu pipeline **GitHub Actions** berikut:
1. Menyiapkan environment PHP dan Node.js.
2. Menginstall dependensi (`composer install` & `npm ci`).
3. Menjalankan seluruh Unit/Feature Tests (`php artisan test`).
4. Memeriksa kesesuaian format kode (`./vendor/bin/pint --test`).
5. Memvalidasi bahwa aplikasi/aset dapat di-build dengan sukses (`npm run build`).
