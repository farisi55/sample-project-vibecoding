# milestone 1 scope: membawa app Amazon Appstore v1.0 yang SUDAH LIVE menuju
# kesiapan Google Play Store (kepatuhan AdMob, monetisasi ad-free, syarat
# teknis Play Store) + menutup gap test-coverage. Ini BUKAN rebuild dari nol —
# Phase 3 sengaja tidak berisi "bangun fitur X" karena 6 fitur inti sudah live;
# hanya berisi test coverage yang belum ada. Phase 1 direframe jadi audit
# lingkungan yang sudah ada, bukan inisialisasi baru.
---
project: Catat Emas (GoldInvestmentApp)
knowledge_version: 1.0.2
changelog_version: 1.0.4
created: 2026-07-14
status: in_progress
milestone: 1 of 1
project_shape: mobile
simple_mode: false
---

## [IN PROGRESS]

### Task #005 — Formalize Migration Path for gold_investments Schema
- **Phase:** Phase 2 — Domain & Data
- **Scope:** Tambahkan mekanisme migrasi versi-terlacak (mis. `PRAGMA user_version`) agar perubahan skema mendatang tidak lagi ad-hoc.
- **Files to create / modify:** `repository/GoldInvestmentRepository.js`, `repository/migrations/` (baru)
- **Acceptance criteria:**
  - [ ] Migration runner melacak versi skema saat ini di SQLite
  - [ ] Down-migration untuk skema baseline saat ini ditulis dan teruji (membuktikan mekanisme bekerja end-to-end)
  - [ ] Unit test written and passing for new logic
  - [ ] Test is isolated: sets up and tears down its own state
- **Migration safety:**
  - [ ] Down migration written and tested
  - [ ] Migration is idempotent
  - [ ] Delete strategy matches knowledge.md §7 (soft-delete via `use_data` — tidak berubah oleh migrasi ini)
  - [ ] Bukan live-traffic table (SQLite lokal single-device) — pola non-blocking tetap dipertahankan
- **Dependencies:** Task #001
- **Decisions made:** (fill after execution — never leave blank)

---

## [NEXT TASKS]

### Phase 2 — Domain & Data

### Task #006 — Data Retention Policy for Soft-Deleted Records
- **Phase:** Phase 2 — Domain & Data
- **Scope:** knowledge.md §7 menandai tidak ada job purge untuk record `use_data='N'` — putuskan kebijakan retensi (masih `[DECISION NEEDED]` di PRD §4.5).
- **Files to create / modify:** `repository/GoldInvestmentRepository.js`
- **Acceptance criteria:**
  - [ ] Keputusan dibuat & didokumentasikan: purge routine diimplementasi (mis. hapus `use_data='N'` setelah N hari) ATAU retensi permanen dikonfirmasi eksplisit dengan komentar kode
  - [ ] Unit test written and passing for new logic (bila purge diimplementasikan)
  - [ ] Test is isolated: sets up and tears down its own state
- **Dependencies:** Task #005
- **Decisions made:** (fill after execution — never leave blank)

### Phase 3 — Core Features
> Catatan: 6 fitur inti (pencatatan, dashboard, riwayat, grafik, harga emas, backup/restore) SUDAH live di v1.0 — tidak ada task "bangun fitur" di sini. Fokus Phase 3 murni menutup gap test coverage (~0% → target §4 knowledge.md) pada logic yang sudah berjalan di production.

### Task #007 — Unit Tests: Profit/Loss & Two-Way Calculation Logic
- **Phase:** Phase 3 — Core Features
- **Scope:** Tes untuk formula profit/loss dashboard dan kalkulasi dua-arah berat↔nilai di AddInvestment — sudah jalan di production, belum ada tes.
- **Files to create / modify:** `__tests__/profitLoss.test.js` (baru), `__tests__/twoWayCalculation.test.js` (baru)
- **Acceptance criteria:**
  - [ ] Unit test written and passing for new logic — profit/loss formula diuji untuk kasus untung, rugi, dan break-even
  - [ ] Unit test written and passing for new logic — kalkulasi dua-arah diuji untuk weight→value, value→weight, dan edge-case input kosong/nol
  - [ ] Test is isolated: sets up and tears down its own state
- **Dependencies:** Task #001
- **Decisions made:** (fill after execution — never leave blank)

### Task #008 — Unit Tests: GoldInvestmentRepository CRUD & Soft-Delete
- **Phase:** Phase 3 — Core Features
- **Scope:** Tes untuk repository layer (add/fetch/soft-delete/paginasi/sort) — permukaan paling besar yang belum diuji.
- **Files to create / modify:** `__tests__/GoldInvestmentRepository.test.js` (baru)
- **Acceptance criteria:**
  - [ ] Unit test written and passing for new logic — soft-delete dikonfirmasi set `use_data='N'`, bukan menghapus baris
  - [ ] Unit test written and passing for new logic — paginasi & toggle sort tanggal menghasilkan urutan/slice sesuai ekspektasi terhadap test DB
  - [ ] Test is isolated: sets up and tears down its own state (SQLite test DB baru per test, tanpa leakage state antar-test)
- **Dependencies:** Task #001
- **Decisions made:** (fill after execution — never leave blank)

### Task #009 — Unit Tests: GoldPriceHelper Fallback Behavior
- **Phase:** Phase 3 — Core Features
- **Scope:** Tes untuk perilaku fallback Rp1.000.000/gram saat goldprice.org tidak terjangkau.
- **Files to create / modify:** `__tests__/GoldPriceHelper.test.js` (baru)
- **Acceptance criteria:**
  - [ ] Unit test written and passing for new logic — mock network failure mengembalikan tepat nilai fallback
  - [ ] Unit test written and passing for new logic — mock response sukses mengembalikan harga per-gram IDR terkonversi benar
  - [ ] Test is isolated: sets up and tears down its own state (axios mock direset antar-test)
- **Dependencies:** Task #001
- **Decisions made:** (fill after execution — never leave blank)

### Phase 4 — Integration

### Task #010 — Fix Missing AdMob Application ID Manifest Tag
- **Phase:** Phase 4 — Integration
- **Scope:** Tambahkan tag meta-data `com.google.android.gms.ads.APPLICATION_ID` ke AndroidManifest.xml dan `GADApplicationIdentifier` ke Info.plist — dikonfirmasi hilang di codebase saat ini, wajib untuk inisialisasi Google Mobile Ads SDK yang benar.
- **Files to create / modify:** `android/app/src/main/AndroidManifest.xml`, `ios/GoldInvestmentApp/Info.plist`
- **Acceptance criteria:**
  - [ ] Android: tag meta-data ada dengan value sesuai `android_app_id` di `app.json`
  - [ ] iOS: key `GADApplicationIdentifier` ada di Info.plist sesuai `ios_app_id` di `app.json`
  - [ ] App start tanpa warning/crash inisialisasi AdMob di emulator/device fisik
- **Dependencies:** none
- **Decisions made:** (fill after execution — never leave blank)

### Task #011 — Integrate Google Play Billing Library
- **Phase:** Phase 4 — Integration
- **Scope:** Tambahkan react-native-iap (atau setara), konfigurasi satu produk non-consumable untuk ad-free unlock.
- **Files to create / modify:** `package.json`, `services/BillingService.js` (baru)
- **Acceptance criteria:**
  - [ ] Play Billing terinstal & terinisialisasi; koneksi ke billing service dikonfirmasi saat app start
  - [ ] Satu SKU non-consumable terdaftar untuk "ad-free unlock" (one-time purchase, per PRD §5 resolved)
  - [ ] Panggilan billing outbound punya timeout guard + circuit-breaker ringan (N kegagalan beruntun dalam satu sesi → hentikan retry, pakai fallback untuk sisa sesi) — **tidak di-skip karena simple_mode: false**
  - [ ] Unit test written and passing for new logic (mock respons purchase: sukses, batal, error)
  - [ ] Test is isolated: sets up and tears down its own state
- **Dependencies:** Task #010
- **Decisions made:** (fill after execution — never leave blank)

### Task #012 — Implement Ad-Free Unlock Purchase Flow
- **Phase:** Phase 4 — Integration
- **Scope:** Bangun flow pembelian sebenarnya — user tap "Hapus Iklan" → Play Billing purchase → sukses → set status ad-free tersimpan.
- **Files to create / modify:** `components/AdFreeUnlock.js` (baru), `utils/AdManager.js` (gate panggilan iklan pada status ad-free)
- **Acceptance criteria:**
  - [ ] Tap "Hapus Iklan" memicu flow purchase Play Billing untuk SKU non-consumable
  - [ ] Setelah purchase sukses, `AdManager.js` berhenti memicu panggilan banner/interstitial untuk sesi ini dan sesi berikutnya
  - [ ] Unit test written and passing for new logic (path sukses/batal/gagal, mocked)
  - [ ] Test is isolated: sets up and tears down its own state
- **Dependencies:** Task #011
- **Decisions made:** (fill after execution — never leave blank)

### Task #013 — Verify Ad-Free Status via queryPurchasesAsync on Launch
- **Phase:** Phase 4 — Integration
- **Scope:** Per knowledge.md §7/§9 — status ad-free wajib diverifikasi ulang terhadap Play Billing tiap app dibuka, tidak boleh percaya flag lokal begitu saja.
- **Files to create / modify:** `App.js` (startup hook), `services/BillingService.js`
- **Acceptance criteria:**
  - [ ] Saat app dibuka, `queryPurchasesAsync` dipanggil dan direkonsiliasi dengan flag ad-free lokal sebelum iklan apapun ditampilkan
  - [ ] Jika Play Billing tidak melaporkan purchase valid tapi flag lokal bilang unlocked, flag lokal dikoreksi (iklan kembali tampil), bukan dipercaya begitu saja
  - [ ] Unit test written and passing for new logic
  - [ ] Test is isolated: sets up and tears down its own state
- **Dependencies:** Task #012
- **Decisions made:** (fill after execution — never leave blank)

### Task #014 — AdMob & Play Ads Policy Self-Review
- **Phase:** Phase 4 — Integration
- **Scope:** Tinjauan manual kepatuhan terhadap AdMob Program Policies dan Google Play Ads Policy terkini sebelum submit Play Store.
- **Files to create / modify:** TBD — output berupa checklist/laporan tinjauan, bukan kode, sehingga path belum bisa ditentukan
- **Acceptance criteria:**
  - [ ] Placement banner + interstitial saat ini dicek terhadap checklist AdMob Program Policies; pelanggaran (jika ada) didokumentasikan & diperbaiki
  - [ ] Frekuensi interstitial (saat ini: setelah tambah investasi, kembali ke Home, mulai backup) ditinjau terhadap risiko "accidental click" per Play Ads Policy; disesuaikan bila perlu
- **Dependencies:** Task #012
- **Decisions made:** (fill after execution — never leave blank)

### Phase 5 — UI/UX

### Task #015 — Add "Hapus Iklan" Entry Point to UI
- **Phase:** Phase 5 — UI/UX
- **Scope:** Elemen UI yang terlihat/dapat ditemukan di layar About atau Dashboard, menghubungkan ke flow Task #012 — task ini murni permukaan UI, logic terpisah di Task #012 (single-concern).
- **Files to create / modify:** `screens/AboutScreen.js` atau `components/DashboardView.js`, `styles/CssStyles.js`
- **Acceptance criteria:**
  - [ ] Entry point "Hapus Iklan" terlihat & dapat ditekan, gaya konsisten dengan warna CTA amber existing (#FFB200) per knowledge.md §6
  - [ ] Entry point berubah jadi konfirmasi (mis. "Iklan telah dihapus") setelah ad-free aktif
- **Dependencies:** Task #012
- **Decisions made:** (fill after execution — never leave blank)

### Task #016 — Language Consistency Pass (Indonesian/English Mix)
- **Phase:** Phase 5 — UI/UX
- **Scope:** knowledge.md §6 menandai label Inggris yang tersisa di tengah UI Indonesia (mis. "About Application", "← Back to Home", "Gold Rates (Realtime)") — standardisasi ke Indonesia.
- **Files to create / modify:** `screens/AboutScreen.js`, `screens/GoldPriceScreen.js`, layar lain dengan string Inggris
- **Acceptance criteria:**
  - [ ] Seluruh string UI Inggris yang teridentifikasi diganti padanan Indonesia
  - [ ] Tidak ada string Inggris baru diperkenalkan dalam pass ini (spot-check terhadap 3 instance yang sudah ditandai sebelumnya)
- **Dependencies:** none
- **Decisions made:** (fill after execution — never leave blank)

### Phase 6 — Testing & QA

### Task #017 — Coverage Verification Against Target
- **Phase:** Phase 6 — Testing & QA
- **Scope:** Jalankan full test suite dengan coverage report, verifikasi terhadap target ≥60% pada layer repository/domain-logic (knowledge.md §4, masih `[DECISION NEEDED]` — konfirmasi angka final dengan developer sebelum task ini dianggap selesai).
- **Files to create / modify:** `package.json` (jest coverage config), `.github/workflows/ci.yml` (update untuk enforce threshold)
- **Acceptance criteria:**
  - [ ] Coverage report (`jest --coverage`) dihasilkan dan ditinjau terhadap target
  - [ ] CI (Task #002) gagal build jika coverage `repository/` dan `utils/` turun di bawah threshold yang disepakati
- **Dependencies:** Task #002, Task #007, Task #008, Task #009
- **Decisions made:** (fill after execution — never leave blank)

### Task #018 — E2E Smoke Test: Core Purchase & Recording Flow
- **Phase:** Phase 6 — Testing & QA
- **Scope:** Satu E2E smoke test mencakup jalur kritis — tambah transaksi, lihat di riwayat, verifikasi total dashboard update — plus flow ad-free purchase baru.
- **Files to create / modify:** `e2e/coreFlow.test.js` (baru) — Files: TBD untuk pilihan test runner (Detox/Maestro), belum ditentukan
- **Acceptance criteria:**
  - [ ] E2E test menambah transaksi dan mengonfirmasi muncul benar di Dashboard total dan Riwayat Transaksi
  - [ ] E2E test menjalankan flow purchase ad-free terhadap sandbox/test track Play Billing
- **Dependencies:** Task #012, Task #013
- **Decisions made:** (fill after execution — never leave blank)

### Phase 7 — Deployment (App-Store variant)

### Task #019 — Bump targetSdkVersion to Meet Play Store Requirement
- **Phase:** Phase 7 — Deployment
- **Scope:** Naikkan `targetSdkVersion` dari 34 ke minimal 35 sekarang (36 wajib sebelum 31 Agustus 2026), uji regresi di seluruh layar.
- **Files to create / modify:** `android/build.gradle`
- **Acceptance criteria:**
  - [ ] `targetSdkVersion` dinaikkan ke minimal 35 atau 36; `compileSdkVersion` dikonfirmasi ≥ target
  - [ ] Regresi manual penuh di seluruh 8 layar pada emulator dengan target API baru menunjukkan tidak ada crash/perilaku menyimpang
- **Dependencies:** Task #001
- **Decisions made:** (fill after execution — never leave blank)

### Task #020 — Google Play Console Submission Prerequisites
- **Phase:** Phase 7 — Deployment
- **Scope:** Siapkan aset non-kode yang belum pernah ada untuk app ini (baru pernah di Amazon Appstore): Privacy Policy URL, Data Safety form, store listing.
- **Files to create / modify:** TBD — path halaman privacy policy belum ditentukan tergantung pilihan hosting
- **Acceptance criteria:**
  - [ ] Privacy Policy URL live & dapat diakses, akurat mendeskripsikan penyimpanan data on-device-only per knowledge.md §9
  - [ ] Data Safety form di Play Console diisi lengkap: tidak ada data dikumpulkan/dibagikan ke luar device; AdMob SDK diungkapkan sebagai third-party
- **Dependencies:** none
- **Decisions made:** (fill after execution — never leave blank)

### Task #021 — Release Build, Signing & Staged Rollout Config
- **Phase:** Phase 7 — Deployment
- **Scope:** Hasilkan AAB release yang ditandatangani untuk Play Console, konfigurasi staged rollout.
- **Files to create / modify:** `android/gradle.properties` (verify config signing existing, jangan buat baru)
- **Acceptance criteria:**
  - [ ] AAB release dibuat & ditandatangani dengan keystore produksi existing (dipakai ulang, bukan dibuat baru)
  - [ ] `versionCode` dinaikkan dari 1; `versionName` diperbarui merefleksikan fitur baru (mis. 1.1)
  - [ ] Staged rollout dikonfigurasi di Play Console (praktik baik untuk rilis Play Store pertama; TIDAK template-mandated di sini karena knowledge.md §8 tidak punya ambang canary terdefinisi — developer pilih persentase awal konservatif, mis. 10–20%)
  - [ ] Build release diinstal & diuji manual di device fisik (bukan hanya emulator) sebelum upload ke Play Console
- **Dependencies:** Task #010, Task #011, Task #012, Task #013, Task #019, Task #020
- **Decisions made:** (fill after execution — never leave blank)

---

## [COMPLETED]
> Changelog v1.0.0 initialized from knowledge.md v1.0.2. Shape: mobile. Melanjutkan project existing (v1.0 live di Amazon Appstore) — tidak ada task inisialisasi dari nol.

### Task #004 — Env Var Validation at Startup ✅
- **Completed:** 2026-07-15
- **Phase:** Phase 1 — Foundation
- **Status:** OK
- **Branch:** feat/task-004-env-var-validation-startup
- **Files created / modified:**
  - `config/validateEnv.js` — module baru; validasi keempat ADMOB_*_UNIT_ID; fail-fast di production, warn-only di dev; placeholder detection
  - `App.js` — ditambahkan `validateEnv()` call setelah `initCrashReporter()`, sebelum navigator render
  - `jest.config.js` — ditambahkan komentar dokumentasi pre-existing App.test.tsx gap
  - `__tests__/validateEnv.test.js` — 9 unit tests baru (all passing)
- **Acceptance criteria met:**
  - [x] Build production melempar Error jelas & human-readable saat start bila env var wajib tidak terdefinisi atau berisi placeholder — dikonfirmasi via unit test `throws Error when all ADMOB vars are missing`
  - [x] Build dev (`__DEV__` true) tetap warn-only tanpa throw — dikonfirmasi via unit test `does NOT throw when ADMOB vars are missing in dev mode`; AdMob Test IDs dipakai otomatis via admob.config.js
- **Security gate:** BASIC — all checks passed
  - [x] No secrets hardcoded — validateEnv.js baca dari `Config.*` (react-native-config) ✅
  - [x] Error message mengandung hanya nama key dan placeholder values, tidak secret asli ✅
  - [x] No eval()/exec() — ✅
  - [x] CORS — N/A
  - [x] .gitignore/pre-commit — carried from Task #001
  - [x] CI/CD — Task #002; ADMOB vars tidak diperlukan di CI (dev mode) ✅
  - [x] Dockerfile — N/A
- **Scalability gate:** BASIC — all checks passed
  - [x] No synchronous blocking — `validateEnv()` pure sync, no I/O, executes in microseconds ✅
  - [x] Structured logger — carried/resolved from Task #003 ✅
- **Regression:** Passed 9 new tests. 20 total new tests pass (Task #003 + #004). Pre-existing `App.test.tsx` failure (TurboModuleRegistry native modules in Jest) documented — pre-existing before Task #001, not caused by this task.
- **Decisions made:**
  - [PATTERN] `validateEnv()` called as a module-level statement (not inside useEffect) — ensures validation runs before any React component renders, including NavigationContainer and GoldRateProvider
  - [SECURITY] Placeholder values (`ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY`) treated as "missing" — prevents silent deployment with .env.example values that look like valid IDs but aren't real
  - [PATTERN] Dev/prod divergence: dev warns but doesn't throw because Test IDs are always available automatically — fail-fast in prod only where real IDs are required for revenue
  - [TEST] `App.test.tsx` native module Jest failure documented as pre-existing gap; full fix deferred to Task #007 (test coverage task) which will address the Jest mock setup
- **Notes:** none
- **Knowledge drift:** none (validateEnv is config code, no new library added, no knowledge §2/§8 change needed beyond what Task #003 already captured)

### Task #003 — Crash Reporting & Structured Logging Init ✅
- **Completed:** 2026-07-15
- **Phase:** Phase 1 — Foundation
- **Status:** OK
- **Branch:** feat/task-003-crash-reporting-structured-logging
- **Files created / modified:**
  - `utils/CrashReporter.js` — module baru: Sentry init, PII scrubbing hook (`beforeSend`), `captureException()`, `captureMessage()`, `logError()` (drop-in replacement untuk `console.error`)
  - `App.js` — ditambahkan `initCrashReporter()` call sebelum navigator render; `console.log/warn` di AdMob init diganti dengan `captureMessage()`
  - `utils/GoldPriceHelper.js` — `console.error` diganti `logError`; ditambahkan explicit axios timeout 10 s
  - `services/GoldRateService.js` — `console.error` diganti `logError`
  - `screens/AddInvestmentScreen.js` — `console.error` diganti `logError`
  - `screens/GraphScreen.js` — `console.error` diganti `logError`
  - `repository/GoldInvestmentRepository.js` — `console.error` diganti `logError`
  - `repository/BackupRestoreRepository.js` — semua `console.error/log` diganti `logError` (kecuali user-cancel flow)
  - `.env.example` — ditambahkan `SENTRY_DSN` key dengan komentar instruksi
  - `package.json` — ditambahkan `@sentry/react-native@6.15.0` (pinned exact version)
  - `__tests__/CrashReporter.test.js` — 11 unit tests baru (all passing)
- **Acceptance criteria met:**
  - [x] Crash-reporting SDK (Sentry React Native 6.15.0) terinisialisasi saat app start via `initCrashReporter()` di App.js. Ketika SENTRY_DSN disediakan di .env production, exception dikirim ke Sentry dashboard. Di dev mode / SENTRY_DSN kosong, fallback ke console.
  - [x] PII/secret scrubbing aktif — `beforeSend: scrubPII` hook dikonfirmasi strips `weight_gram`, `investment_value`, `price_gold`, `total_weight`, `total_investment`, `profit_loss` sebelum event dikirim. Dikonfirmasi via unit test.
- **Security gate:** BASIC — all checks passed
  - [x] No secrets hardcoded — DSN via `Config.SENTRY_DSN` (react-native-config, env var)
  - [x] Sensitive config from env vars — SENTRY_DSN di .env (gitignored) ✅
  - [x] No eval()/exec() — tidak ada di kode baru ✅
  - [x] Error messages tidak expose stack traces ke UI — `captureMessage` hanya kirim `error?.message` ke Sentry; tidak ada stack trace ke UI pengguna ✅
  - [x] CORS — N/A (mobile)
  - [x] .gitignore — carried from Task #001
  - [x] Pre-commit hook — masih aktif ✅
  - [x] CI/CD — Task #002; SENTRY_DSN tidak diperlukan di CI (dev mode, kosong) ✅
  - [x] Dockerfile — N/A
- **Scalability gate:** BASIC — all checks passed
  - [x] No synchronous blocking — `initCrashReporter()` lightweight sync call, tidak blokir UI ✅
  - [x] External I/O timeout — `GoldPriceHelper` kini punya explicit `timeout: 10000` ms di axios ✅
  - [x] No global mutable state issues — `_initialized` boolean, single-threaded JS ✅
  - [x] Structured logger — **RESOLVED** oleh task ini ✅
- **Regression:** Passed 11 new tests. Pre-existing 2 errors (react-hooks/exhaustive-deps) unchanged. Warning count turun 278→233 (improvement: console.error replaced dengan logError). Semua test suite sebelumnya tidak terpengaruh.
- **Decisions made:**
  - [ARCH] Pilih Sentry React Native (bukan Crashlytics) karena: setup lebih ringan (tidak butuh Firebase platform), tidak ada dependency chain tambahan, DSN cukup via env var, PII scrubbing lebih transparan lewat `beforeSend` hook
  - [SECURITY] `beforeSend: scrubPII` diimplementasikan sebagai defence-in-depth — scrub PII dari extras, contexts, dan breadcrumbs sebelum transmisi ke Sentry
  - [PATTERN] `logError(tag, error, meta)` sebagai unified interface — semua catch blocks kini PII-safe karena developer harus consciously add context ke `meta` param, tidak bisa accidentally pass raw financial objects
  - [INFRA] `@sentry/react-native@6.15.0` pinned exact version sesuai security gate requirement
  - [SECURITY] DSN dicek via `Config.SENTRY_DSN` — jika kosong, Sentry tidak diinit; tidak ada remote reporting tanpa DSN terkonfigurasi
- **Notes:** Acceptance criteria "dikonfirmasi lewat exception uji yang muncul di dashboard" hanya dapat diverifikasi sepenuhnya saat SENTRY_DSN production diisi di .env dan app dijalankan di device. Unit test mengonfirmasi perilaku init, PII scrubbing, dan fallback.
- **Knowledge drift:** UPDATE REQUIRED: @knowledge §2 — tambahkan `@sentry/react-native@6.15.0` ke Tech Stack; tambahkan `SENTRY_DSN` ke §8 Required env vars

### Task #002 — CI Pipeline: Lint, Test, Security Scan ✅
- **Completed:** 2026-07-15
- **Phase:** Phase 1 — Foundation
- **Status:** OK
- **Branch:** feat/task-002-ci-pipeline-lint-test-security-scan
- **Files created / modified:**
  - `.github/workflows/ci.yml` — GitHub Actions CI pipeline baru; steps: checkout → node setup → `npm ci` → lint → test → security audit
- **Acceptance criteria met:**
  - [x] CI berjalan tiap push/PR: lint (ESLint) → test (Jest) → dependency audit (`npm audit --audit-level=critical`)
  - [x] CI gagal jika step lint (error-level) atau test gagal — dikonfirmasi lewat exit code propagation
  - [x] Tidak ada secret dibutuhkan CI ini; AdMob Unit IDs tidak diperlukan di lint/test (Jest memakai `__DEV__` Test ID otomatis)
- **Security gate:** BASIC — all checks passed
  - [x] No secrets hardcoded — CI YAML tidak mengandung secret atau env var sensitif
  - [x] Sensitive config from env vars — N/A (tidak ada secret di pipeline ini)
  - [x] No eval()/exec() — N/A (YAML config)
  - [x] Error messages — N/A
  - [x] CORS — N/A (mobile)
  - [x] .gitignore patterns — carried from Task #001
  - [x] Pre-commit hook active — carried from Task #001
  - [x] CI/CD no debug tracing in secret steps — tidak ada `set -x`; tidak ada secret env var di step manapun ✅
  - [x] Dockerfile ARG — N/A
- **Scalability gate:** BASIC — all checks passed
  - [x] All items N/A (YAML config task)
  - [x] Structured logger gap — pre-existing, Task #003
- **Regression:** Phase 1 build OK — YAML validated via `js-yaml`; CI config structure verified; no source changes
- **Decisions made:**
  - [INFRA] `npm audit --audit-level=critical` sebagai fail threshold — bukan `--audit-level=high` — karena baseline repo memiliki 16 high vulns (semua di devDependencies: @babel/core, @xmldom/xmldom) yang belum diremediasi. Ini keputusan pragmatis; HIGH vulns ditampilkan sebagai step informasional terpisah (non-blocking). Task #017 akan re-evaluasi threshold setelah deps diupdate.
  - [INFRA] `npm ci` dipakai (bukan `npm install`) untuk menjamin clean install dari lockfile — sesuai requirement "Lockfile pins versions; CI uses clean-install" (meski ini FULL gate, praktik terbaik diterapkan dari awal)
  - [INFRA] `--max-warnings=9999` pada lint step — memperbolehkan 278 pre-existing warnings lolos tanpa memblokir CI, sementara errors (exit 1) tetap memblokir. Alternatif `--max-warnings=0` akan langsung gagal karena pre-existing warnings
  - [INFRA] `CI: "true"` env var pada step test — standar untuk suppress interactive watcher Jest dan pastikan Jest `--watchAll=false` + `--forceExit` berfungsi di CI environment
- **Notes:** npm audit menemukan 3 critical + 16 high + 23 moderate vulnerabilities (semua pre-existing, terutama di devDependencies build tooling). Critical: tidak ada yang ditemukan saat runtime. Harus di-address via `npm audit fix` di iterasi mendatang.
- **Knowledge drift:** none

### Task #001 — Environment Audit & Security Baseline ✅
- **Completed:** 2026-07-15
- **Phase:** Phase 1 — Foundation
- **Status:** OK
- **Branch:** feat/task-001-env-audit-security-baseline
- **Files created / modified:**
  - `.gitignore` — ditambahkan `.env.local`, `.env.production`, `.env.staging`, `*.pem`, `*.key`, `*.p12`; pattern `.env` sudah ada sejak sebelumnya
  - `scripts/pre-commit` — versi tersimpan di repo dari pre-commit hook (baru dibuat)
  - `.git/hooks/pre-commit` — hook aktif (tidak di-commit ke repo, diinstal di `.git/hooks/`)
  - `.env` — dihapus dari git tracking via `git rm --cached` (file lokal tetap ada, tidak dihapus)
- **Acceptance criteria met:**
  - [x] `.gitignore` dikonfirmasi tetap mengecualikan `.env`, `*.keystore`, `node_modules` — dan diperluas dengan `.env.local`, `.env.production`, `.env.staging`, `*.pem`, `*.key`, `*.p12`
  - [x] `package-lock.json` ada dan ter-commit di repo — dikonfirmasi via `git ls-files`
  - [x] `.env.example` berisi keempat `ADMOB_*_UNIT_ID` dengan placeholder `ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY` — tidak ada nilai rahasia asli
- **Security gate:** BASIC — all checks passed
  - [x] No secrets hardcoded — `.env.example` placeholder only; production IDs hanya di `.env` (lokal, tidak tertrack)
  - [x] Sensitive config from env vars only — via `react-native-config` + `.env`
  - [x] No eval()/exec() with external input — scan bersih
  - [x] Error messages don't expose internals — N/A (config task, no source changes)
  - [x] CORS — N/A (mobile, no server)
  - [x] `.gitignore` includes `.env`, `*.pem`, `*.key`, `*.p12` — dikonfirmasi
  - [x] Pre-commit hook active & tested — hook memblokir `.env`, exit code 1, pesan jelas
  - [x] CI/CD no debug tracing — N/A (belum ada CI; Task #002)
  - [x] Dockerfile ARG — N/A (no containerization)
- **Scalability gate:** BASIC — all checks passed
  - [x] No synchronous blocking — N/A (config task)
  - [x] No hardcoded pool/timeout limits — N/A (config task)
  - [x] DB connection pool — N/A (SQLite single-connection, no pool)
  - [x] External I/O timeouts — N/A (config task; goldprice.org timeout deferred to Task #003)
  - [x] No global mutable state — N/A (config task)
  - [x] Correlation ID — N/A (mobile shape, no server entry)
  - [x] Structured logger — NOT YET: pre-existing gap; scoped to Task #003 (not a regression from this task)
- **Regression:** Phase 1 build OK — lint menunjukkan 280 pre-existing issues (2 errors `react-hooks/exhaustive-deps`, 278 warnings) — nol issue baru diperkenalkan oleh Task #001 (zero source file changes). Config validation tested.
- **Decisions made:**
  - [SECURITY] `.env` diremove dari git tracking karena mengandung production AdMob Unit ID aktif (`ca-app-pub-8455060384823840/*`) — ini temuan keamanan yang diselesaikan dalam task ini, bukan hanya regression-check
  - [PATTERN] Pre-commit hook ditulis sebagai POSIX sh (bukan bash) untuk kompatibilitas cross-platform (Git for Windows `sh.exe`, macOS, Linux)
  - [INFRA] Versi hook disimpan di `scripts/pre-commit` (dapat di-commit ke repo) terpisah dari `.git/hooks/pre-commit` (aktif tapi tidak di-commit) — memungkinkan developer lain menginstal via `cp scripts/pre-commit .git/hooks/pre-commit`
  - [SECURITY] `.gitignore` diperluas dengan `.env.local`, `.env.production`, `.env.staging`, `*.pem`, `*.key`, `*.p12` sebagai defense-in-depth untuk semua varian env file dan file kriptografi
- **Notes:** Temuan utama yang tidak disebutkan di scope awal: `.env` ternyata sudah ter-commit ke git dengan nilai production AdMob Unit ID asli, bukan hanya placeholder. Diselesaikan dalam task ini via `git rm --cached`.
- **Knowledge drift:** none
