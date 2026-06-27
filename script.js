(function() {
    'use strict';

    // ===== State =====
    let puterReady = false;

    // ===== Wait for Puter SDK =====
    function waitForPuter(callback, retries = 20) {
        if (typeof puter !== 'undefined' && puter.ai) {
            puterReady = true;
            console.log('[Inisialisasi] Puter.ai SDK siap digunakan.');
            callback();
        } else if (retries > 0) {
            setTimeout(() => waitForPuter(callback, retries - 1), 500);
        } else {
            console.warn('[Inisialisasi] Puter.ai SDK gagal dimuat setelah 20 kali percobaan.');
        }
    }

    // ===== Inisialisasi Aplikasi =====
    function initApp() {
        console.log('[Inisialisasi] Aplikasi chatbot siap.');
    }

    // ===== Mulai =====
    document.addEventListener('DOMContentLoaded', function() {
        console.log('[Inisialisasi] DOM siap. Menunggu Puter.ai SDK...');
        waitForPuter(initApp);
    });

})();
