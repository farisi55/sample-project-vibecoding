# Product Requirement Document (PRD): Web Chatbot Puter.ai

## 1. Latar Belakang & Tujuan
Kami ingin membangun sebuah aplikasi web chatbot interaktif yang ringan dan responsif. Chatbot ini akan memanfaatkan ekosistem Puter.ai (Puter.js SDK) untuk kecerdasan buatannya (LLM) sekaligus untuk penyimpanan datanya. Tujuannya adalah menyediakan asisten virtual yang instan, gratis, tanpa memerlukan setup server backend yang rumit.

## 2. Target Pengguna
- Pengguna umum yang membutuhkan jawaban cepat dari asisten AI melalui peramban (browser) web.
- Pengguna yang ingin riwayat obrolannya tetap tersimpan meskipun halaman web dimuat ulang (refresh) atau browser ditutup.

## 3. Fitur Utama Aplikasi (Core Features)

### A. Antarmuka Obrolan (Chat Interface UI)
- Desain halaman harus bersih, modern, dan minimalis (seperti tampilan ChatGPT atau Claude).
- Harus fully-responsive (bagus di layar HP maupun laptop/desktop).
- Memiliki area pesan yang otomatis bergulir (auto-scroll) ke bawah setiap kali ada pesan baru masuk.
- Dilengkapi tombol kirim dan input teks yang nyaman digunakan.
- Menampilkan animasi "sedang mengetik" atau loading dots saat AI sedang memproses jawaban agar pengguna tahu sistem sedang bekerja.

### B. Integrasi Kecerdasan Buatan (Puter AI Integration)
- Menggunakan fungsi bawaan dari Puter.js SDK untuk memanggil model AI (secara native).
- AI harus memiliki kepribadian atau instruksi dasar (system prompt): *"Anda adalah asisten chatbot yang ramah, profesional, dan ahli teknologi."*
- Penanganan error yang baik: Jika kuota habis atau jaringan terputus, chatbot harus menampilkan pesan error yang ramah di layar (bukan cuma di konsol log).

### C. Sistem Ingatan Chat (Chat History & Persistence)
- Chatbot tidak boleh lupa ingatan saat browser di-refresh.
- Menggunakan fitur Key-Value Store bawaan Puter (`puter.kv`) untuk menyimpan riwayat pesan pengguna berdasarkan sesi browser mereka.
- Menyediakan tombol "Hapus Riwayat" untuk membersihkan data obrolan yang tersimpan dan mengosongkan layar kembali ke kondisi awal.

## 4. Persyaratan Teknis & Batasan (Technical Requirements)
- **Arsitektur**: Aplikasi web statis (Single Page Application - SPA). Tanpa database eksternal, tanpa server Node.js terpisah (semuanya berjalan di client-side lewat Puter).
- **Teknologi**: HTML5 murni, JavaScript (ES6+), dan Tailwind CSS untuk styling agar pembuatan UI cepat.
- **Kunci Keamanan**: Dilarang menggunakan API Key eksternal apa pun (OpenAI, Anthropic, dll) demi keamanan. Semua otentikasi harus mengandalkan sistem otomatis dari hosting/browser Puter.js.
