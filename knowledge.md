# Knowledge & Coding Rules: Puter.ai Chatbot Web

Dokumen ini berisi panduan teknis, batasan, dan standar penulisan kode untuk AI Agent dalam mengembangkan aplikasi Web Chatbot berbasis hosting dan arsitektur Node/JS dari Puter.ai.

## 1. Tech Stack & Environment
- **Environment**: Puter.ai Cloud Environment (Vanilla JS / Node.js standard).
- **Frontend**: HTML5, Tailwind CSS (via CDN), dan JavaScript murni (ES6+).
- **SDK Utama**: Puter.js SDK (`<script src="https://puter.com"></script>`).
- **AI Model**: Puter AI Chat Completion API (Model default: `gpt-4o` atau model gratis bawaan Puter).

## 2. Coding Rules & Puter.js Standards

### A. Inisialisasi SDK
- Selalu pastikan SDK Puter dimuat sebelum script utama berjalan.
- Gunakan objek global `puter` yang disediakan oleh SDK. Jangan melakukan instalasi npm jika aplikasi dideploy langsung sebagai static hosting di Puter.

### B. Pemanggilan AI Chat
- Gunakan sintaks `puter.ai.chat()` untuk interaksi chatbot.
- Jangan gunakan library pihak ketiga seperti `openai` atau `axios` untuk memanggil LLM. Manfaatkan fitur native bawaan Puter.
- Gunakan format `async/await` untuk menangani *asynchronous requests*.

Contoh struktur kode yang benar:
```javascript
async function fetchBotResponse(userMessage) {
    try {
        const response = await puter.ai.chat(userMessage, {
            system_prompt: "Anda adalah asisten chatbot yang ramah dan membantu."
        });
        return response;
    } catch (error) {
        console.error("Puter AI Error:", error);
        return "Maaf, terjadi kesalahan koneksi.";
    }
}
```

### C. Manajemen Data (Puter Key-Value / Database)
- Jika chatbot membutuhkan penyimpanan memori riwayat chat (*chat history*), gunakan **Puter Key-Value Store**.
- Gunakan `puter.kv.set(key, value)` dan `puter.kv.get(key)` untuk menyimpan sesi chat pengguna.

## 3. UI/UX & DOM Manipulation
- Desain antarmuka wajib responsif (mobile-friendly) menggunakan utilitas Tailwind CSS.
- Komponen chat harus memiliki fitur *auto-scroll* ke bawah setiap kali ada pesan baru masuk.
- Tampilkan indikator *loading* (efek mengetik/animasi *dots*) saat menunggu respons dari `puter.ai.chat`.
- Semua teks input dari pengguna wajib melalui sanitasi sederhana mencegah XSS sebelum dimasukkan ke dalam elemen DOM (`textContent` lebih disukai daripada `innerHTML`).

## 4. Constraints & Keamanan (Security)
- **Tanpa API Key**: Puter.js menggunakan sistem otentikasi otomatis berbasis konteks browser/hosting. Jangan pernah menuliskan API Key OpenAI, Anthropic, atau token eksternal lainnya di dalam kode.
- **Keterbatasan Kuota**: Karena akun Puter memiliki batas token/kredit gratis, optimalkan jumlah prompt teks. Jangan mengirimkan riwayat chat yang terlalu panjang dalam satu *request*.
- **Penyimpanan Berkas**: Jika aplikasi membutuhkan penyimpanan aset gambar/ikon chatbot, gunakan fitur **Puter KV** atau simpan langsung di folder lokal aplikasi, bukan link eksternal yang tidak stabil.
