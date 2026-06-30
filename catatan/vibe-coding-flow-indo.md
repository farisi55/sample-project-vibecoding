freebuff agent vibecoding

Buat Changelog → Inisialisasi Proyek → Siklus Koding Berulang

siklus Cek Task → Coding → Testing → Tulis Changelog

#first prompt

Tolong baca @prd Ekstrak dokumen tersebut menjadi berkas @knowledge baru yang ringkas, berfokus hanya pada aturan teknis, tech stack, arsitektur kode, standar penulisan fungsi, dan batasan UI agar bisa dipahami oleh AI agent secara efisien

#second prompt

Tolong baca berkas @knowledge yang berisi aturan proyek ini. Berdasarkan teknologi dan fitur yang tertulis di sana, tolong buatkan sebuah berkas baru bernama changelog.md di root directory.Berkas changelog.md tersebut harus mengikuti struktur berikut secara ketat:Bagian [CURRENT TASK IN PROGRESS]: Isi dengan Task #001 untuk inisialisasi struktur file dasar proyek ini (seperti setup konfigurasi atau pembuatan file awal) sesuai dengan panduan teknologi di berkas knowledge.Bagian [NEXT TASKS]: Pecah seluruh fitur, komponen, atau tahapan pengembangan yang ada di berkas knowledge menjadi daftar tugas mandiri yang terpisah secara berurutan (misal: Task #002 untuk UI, Task #003 untuk Integrasi API/Logika, Task #004 untuk Database/Penyimpanan, dst).Bagian [HISTORY OF CHANGES]: Beri keterangan awal bahwa proyek baru saja dimulai dan belum ada perubahan kode.Tolong buatkan berkas changelog.md ini sekarang dan fokus hanya pada pembuatan dokumen pelacak tugas ini sebelum melakukan penulisan kode lainnya

#third prompt

Tolong baca @knowledge dan @changelog. Saat ini proyek masih kosong dan berada di tahap awal.Sesuai dengan instruksi pada Task #001 yang tertera di changelog, tolong buatkan berkas-berkas pertama yang dibutuhkan untuk inisialisasi dasar proyek ini. Pastikan struktur kode dan pustaka (library) yang disisipkan di dalam file-file awal tersebut mematuhi standar teknologi yang ada di berkas knowledge.Setelah selesai membuat file-file dasar tersebut, lakukan pengujian internal (testing) untuk memastikan tidak ada kesalahan sintaks atau error konfigurasi.Jika pengujian berstatus OK, perbarui berkas @changelog dengan alur berikut:Pindahkan Task #001 ke bagian [HISTORY OF CHANGES] lengkap dengan daftar file yang dibuat dan status OK.Naikkan tugas berikutnya (Task #002) dari daftar rencana ke bagian [CURRENT TASK IN PROGRESS].Mari mulai eksekusi inisialisasi ini!

#fourth prompt

Tolong baca berkas @changelog dan @knowledge. Lihat bagian [CURRENT TASK IN PROGRESS] untuk mengetahui tugas spesifik yang harus diselesaikan saat ini.Jalankan alur kerja berikut secara ketat dan berurutan:Coding: Selesaikan penulisan kode atau modifikasi fitur untuk tugas berjalan tersebut pada file-file yang menjadi target, dengan tetap mematuhi batasan di berkas knowledge.Testing: Lakukan verifikasi, simulasi, atau uji coba internal untuk memastikan fitur baru berfungsi lancar dan tidak merusak kode yang sudah ada.Update Changelog: Jika hasil testing OK, perbarui berkas @changelog dengan memindahkan tugas aktif tersebut ke bagian [HISTORY OF CHANGES] (cantumkan detail file yang diubah dan hasil tesnya).Next Task: Naikkan tugas berikutnya dari daftar [NEXT TASKS] ke posisi [CURRENT TASK IN PROGRESS] agar proyek siap dilanjutkan pada sesi berikutnya.Mari mulai kerjakan tugas aktif yang tertera di changelog. Apa langkah pertama atau analisis awal yang akan kamu lakukan?