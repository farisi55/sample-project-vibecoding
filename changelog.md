# Project Changelog & Task Tracker

## [CURRENT TASK IN PROGRESS]
- **Task ID**: #004
- **Deskripsi**: Tambahkan tombol "Hapus Riwayat Chat" di pojok kanan atas UI.
- **Target File**: `index.html`, `style.css`, `script.js`
- **Status**: Menunggu (Pending)

---

## [NEXT TASKS]
- [ ] #005 Optimasi sistem pembatasan token agar chat lama otomatis terhapus dari memori jika melebihi 10 pesan.

---

## [HISTORY OF CHANGES]

### [v0.3.0] - 2026-06-27
**Perubahan**: Implementasi sistem riwayat pesan (chat history) menggunakan Puter KV Store.
- **File Dimodifikasi**:
  - `script.js`: Menambahkan fungsi `saveConversationToKV()` dan `loadConversationFromKV()` menggunakan `puter.kv.set`/`puter.kv.get`. Memodifikasi `waitForPuter` untuk memuat riwayat dari KV saat inisialisasi. Auto-save riwayat setelah setiap respons bot.
  - `index.html`: Menambahkan `id="defaultGreeting"` pada pesan sambutan awal agar bisa dihapus saat riwayat dimuat.
- **Hasil Testing**: OK (Syntax valid, load/save flow sesuai dengan dokumentasi Puter KV API)

### [v0.2.0] - 2026-06-27
**Perubahan**: Integrasi Puter AI Chat SDK dan komponen UI Chat basic.
- **File Dimodifikasi**:
  - `index.html`: Menambahkan CDN Tailwind, CDN Puter.js, dan container chat box.
  - `app.js`: Membuat fungsi `fetchBotResponse()` menggunakan `puter.ai.chat`.
- **Hasil Testing**: OK (Berhasil menerima respons dari AI dan tampil di layar).

### [v0.1.0] - 2026-06-26
**Perubahan**: Inisialisasi struktur folder dasar proyek chatbot.
- **File Dimodifikasi**: `index.html` (Struktur HTML5 kosong), `app.js` (Log inisialisasi).
- **Hasil Testing**: OK.
