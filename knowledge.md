# Knowledge & Coding Rules: Web Chatbot Puter.ai

Dokumen ini berisi panduan teknis dan standar penulisan kode untuk pengembangan aplikasi Web Chatbot berbasis Puter.ai.

## 1. Tech Stack & Environment
- **Arsitektur**: Single Page Application (SPA) statis — 100% client-side, tanpa server backend.
- **Frontend**: HTML5, Tailwind CSS (via CDN), JavaScript ES6+ murni.
- **SDK Utama**: Puter.js (`<script src="https://js.puter.com/v2/"></script>`).
- **AI Model**: Puter AI Chat Completion — `puter.ai.chat()`.
- **Penyimpanan**: Puter Key-Value Store — `puter.kv.set()` / `puter.kv.get()`.
- **Keamanan**: DILARANG menggunakan API Key eksternal (OpenAI, Anthropic, dll). Otentikasi sepenuhnya via sistem otomatis browser/hosting Puter.

## 2. Coding Rules & Standar Penulisan Fungsi

### A. Inisialisasi SDK
- Gunakan `waitForPuter()` untuk memastikan objek global `puter` siap sebelum menjalankan fitur apa pun.
- Format: polling `typeof puter !== 'undefined' && puter.ai` dengan interval 500ms (maks 20 kali percobaan).

### B. Pemanggilan AI Chat
- Wajib menggunakan `puter.ai.chat()` — dilarang menggunakan library pihak ketiga (`openai`, `axios`, dll).
- Format `async/await` untuk semua asynchronous request.
- Gunakan parameter opsi: `system_prompt`, `stream: false`, `compaction: true`.
- Sertakan riwayat percakapan (multi-turn) dalam array `conversationHistory` dengan format `{ role, content }`.

Contoh standar:
```javascript
async function fetchBotResponse(messages) {
    try {
        const response = await puter.ai.chat(messages, {
            system_prompt: "Anda adalah asisten chatbot yang ramah, profesional, dan ahli teknologi.",
            stream: false,
            compaction: true
        });
        return response?.message?.content || response?.result?.message?.content;
    } catch (error) {
        return "⚠️ Maaf, terjadi kesalahan. Silakan coba lagi.";
    }
}
```

### C. Manajemen Riwayat Chat (Puter KV Store)
- Simpan riwayat percakapan ke KV Store setiap kali bot selesai merespons.
- Muat riwayat dari KV Store saat halaman dimuat (di dalam `waitForPuter`).
- Gunakan satu key tetap, misal: `'chatbot_history'`.
- Data disimpan sebagai JSON string dari array `conversationHistory`.

## 3. Arsitektur Kode & DOM Manipulation

### A. Struktur File
- `index.html` — Struktur HTML, container chat, form input, CDN.
- `script.js` — Semua logika JavaScript (IIFE pattern, strict mode).
- `style.css` — Gaya kustom (opsional, jika Tailwind belum mencukupi).

### B. Manajemen DOM
- **Sanitasi input**: Gunakan `textContent` daripada `innerHTML` untuk mencegah XSS.
- **Auto-scroll**: `container.scrollTop = container.scrollHeight` setiap pesan baru.
- **Typing indicator**: Tampilkan animasi 3 dots saat menunggu respons AI.
- **Animasi**: Efek fade-in/scale untuk setiap pesan baru.
- **CSS**: Tailwind via CDN + kustom CSS jika diperlukan (misal: gradient latar, glassmorphism).

### C. State Management
- Array `conversationHistory` menyimpan seluruh percakapan (system prompt + user + assistant).
- Flag `isProcessing` mencegah pengiriman ganda saat respons sedang diproses.
- Flag `puterReady` menandakan SDK sudah siap digunakan.

## 4. Fitur Aplikasi (Dari PRD)

| Fitur | Implementasi |
|-------|-------------|
| Chat Interface UI | Header, suggestions chips, messages container, input form, footer |
| Kirim pesan | Form submit + Enter (tanpa Shift) |
| Auto-resize textarea | `style.height` = `Math.min(scrollHeight, 120) + 'px'` |
| Tombol kirim | Dinonaktifkan saat input kosong atau sedang processing |
| AI Integration | `puter.ai.chat(conversationHistory, { system_prompt, stream, compaction })` |
| Chat History | Simpan/muat dari `puter.kv` dengan key tetap |
| Hapus Riwayat | Tombol di header untuk clear KV + reset UI + reload greeting |
| Error Handling | Pesan error ramah di layar (bukan hanya console.log) |
| Responsive | Mobile-friendly penuh, maks-width container 480px |

## 5. Batasan & Constraints
- **Tanpa server**: Semua kode berjalan di browser, tidak ada backend.
- **Tanpa API key eksternal**: Hanya mengandalkan otentikasi bawaan Puter.
- **Batas token/kuota**: Optimalkan panjang prompt — jangan kirim riwayat terlalu panjang dalam satu request.
- **Penyimpanan**: Gunakan Puter KV untuk persistence; tidak ada database lain.
