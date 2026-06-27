# Project Changelog & Task Tracker

## [CURRENT TASK IN PROGRESS]
- **Task ID**: #003
- **Deskripsi**: Logika Chat & Integrasi AI — Implementasi fungsi: kirim pesan (form submit + Enter key), auto-resize textarea, send button state (nonaktif saat kosong/processing), dan integrasi `puter.ai.chat()` dengan system prompt, multi-turn conversation history, typing indicator (animasi 3 dots), auto-scroll, serta error handling ramah di layar.
- **Target File**: `script.js`, `index.html` (minor)
- **Status**: Menunggu (Pending)

---

## [NEXT TASKS]
- [ ] #004 **Chat History Persistence (Puter KV Store)** — Implementasi fitur penyimpanan dan pemuatan riwayat percakapan: `saveConversationToKV()` dan `loadConversationFromKV()` menggunakan `puter.kv.set`/`puter.kv.get`. Muat riwayat saat inisialisasi (di dalam `waitForPuter`), simpan otomatis setiap kali bot selesai merespons.
- [ ] #005 **Tombol Hapus Riwayat** — Menambahkan tombol "Hapus Riwayat Chat" di pojok kanan atas header. Fungsi: hapus data dari KV Store, kosongkan `conversationHistory`, reset UI chat (kembali ke greeting awal).
- [ ] #006 **Optimasi & Final Testing** — Optimasi panjang prompt/kompaksi riwayat agar tidak melebihi batas token. Uji responsif di layar HP dan desktop. Final polish pada animasi, transisi, dan konsistensi styling.

---

## [HISTORY OF CHANGES]

### [v0.2.0] - 2026-06-27
**Perubahan**: Implementasi UI Chat Box lengkap.
- **File Diubah**:
  - `index.html` — Menambahkan struktur UI chat: header (avatar, judul, status dot + tombol hapus), suggestion chips (4 chip), messages container (dengan greeting bawaan), typing indicator (3 dots animasi), input form (textarea + send button), dan footer (Powered by Puter.ai).
  - `style.css` — Menambahkan custom styling: header & avatar gradient, status dot pulsing, chip hover effects, message bubbles (bot gradient + user gradient), typing bounce animation, input wrapper focus, send button active state, footer, responsive mobile (<520px), scrollbar styling, dan animasi fade-in/scale.
- **Hasil Testing**: OK (Sintaks JS valid, semua komponen CSS terverifikasi).

### [v0.1.0] - 2026-06-27
**Perubahan**: Inisialisasi struktur file dasar proyek.
- **File Dibuat**:
  - `index.html` — Boilerplate HTML5, CDN Tailwind CSS, CDN Puter.js v2, link style.css & script.js.
  - `script.js` — IIFE pattern, strict mode, fungsi `waitForPuter()` (polling 500ms, 20 retry), log inisialisasi.
  - `style.css` — Reset CSS, dark gradient background, glassmorphism container, max-width 480px.
- **Hasil Testing**: OK (Sintaks JS valid, semua elemen HTML terpasang, CSS terverifikasi).
