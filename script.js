(function() {
    'use strict';

    // ===== DOM Elements =====
    const form = document.getElementById('chatForm');
    const input = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const container = document.getElementById('messagesContainer');
    const typingIndicator = document.getElementById('typingIndicator');
    const suggestions = document.getElementById('suggestions');

    // ===== State =====
    let puterReady = false;

    // Multi-turn conversation history
    const conversationHistory = [
        {
            role: 'system',
            content: 'Anda adalah asisten AI yang ramah, helpful, dan responsif. Jawab dengan bahasa Indonesia yang natural dan santai. Gunakan emoji sesekali untuk membuat percakapan lebih hidup. Berikan jawaban yang informatif namun ringkas.'
        }
    ];

    let isProcessing = false;

    // ===== KV Store Key =====
    const KV_STORE_KEY = 'chatbot_history';

    // ===== Save Conversation to KV Store =====
    async function saveConversationToKV() {
        try {
            if (!puter.kv) return;
            await puter.kv.set(KV_STORE_KEY, JSON.stringify(conversationHistory));
        } catch (error) {
            console.warn('Gagal menyimpan riwayat ke KV Store:', error);
        }
    }

    // ===== Load Conversation from KV Store =====
    async function loadConversationFromKV() {
        try {
            if (!puter.kv) return;
            const saved = await puter.kv.get(KV_STORE_KEY);
            if (saved) {
                const history = JSON.parse(saved);
                if (Array.isArray(history) && history.length > 1) {
                    // Replace in-memory history with saved history
                    conversationHistory.length = 0;
                    conversationHistory.push(...history);

                    // Clear default greeting and render saved messages
                    const defaultGreeting = document.getElementById('defaultGreeting');
                    if (defaultGreeting) defaultGreeting.remove();

                    for (const msg of conversationHistory) {
                        if (msg.role === 'system') continue;
                        const displayRole = msg.role === 'user' ? 'user' : 'bot';
                        appendMessage(displayRole, msg.content);
                    }
                }
            }
        } catch (error) {
            console.warn('Gagal memuat riwayat dari KV Store:', error);
        }
    }

    // ===== Wait for Puter SDK =====
    function waitForPuter(callback, retries = 20) {
        if (typeof puter !== 'undefined' && puter.ai) {
            puterReady = true;
            // Load saved chat history from KV Store before enabling UI
            loadConversationFromKV().finally(() => {
                callback();
            });
        } else if (retries > 0) {
            setTimeout(() => waitForPuter(callback, retries - 1), 500);
        } else {
            console.warn('Puter.ai SDK failed to load.');
            appendMessage('bot', '⚠️ Gagal memuat Puter.ai SDK. Muat ulang halaman atau periksa koneksi internet.');
        }
    }

    // ===== Auto-resize Textarea =====
    function autoResize(el) {
        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }

    input.addEventListener('input', function() {
        autoResize(this);
        updateSendButton();
    });

    // ===== Update Send Button State =====
    function updateSendButton() {
        const hasText = input.value.trim().length > 0;
        sendBtn.classList.toggle('active', hasText);
        sendBtn.disabled = false; // managed by class
    }

    updateSendButton();

    // ===== Append Message to UI =====
    function appendMessage(role, content) {
        const div = document.createElement('div');
        div.className = `message ${role}`;

        const avatar = document.createElement('div');
        avatar.className = 'msg-avatar';
        avatar.textContent = role === 'user' ? '👤' : '🤖';

        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        // Simple markdown-like rendering: bold, code, paragraphs
        const formatted = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
        bubble.innerHTML = `<p>${formatted}</p>`;

        div.appendChild(avatar);
        div.appendChild(bubble);
        container.appendChild(div);

        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    // ===== Show/Hide Typing Indicator =====
    function showTyping() {
        typingIndicator.classList.add('active');
        container.scrollTop = container.scrollHeight;
    }

    function hideTyping() {
        typingIndicator.classList.remove('active');
    }

    // ===== Send Message =====
    async function sendMessage(userText) {
        if (isProcessing) return;
        isProcessing = true;

        // Disable input
        input.disabled = true;
        sendBtn.disabled = true;
        sendBtn.classList.remove('active');

        // Add user message to UI
        appendMessage('user', userText);

        // Add to conversation history
        conversationHistory.push({ role: 'user', content: userText });

        // Clear input
        input.value = '';
        input.style.height = 'auto';
        updateSendButton();

        // Show typing indicator
        showTyping();

        try {
            if (!puterReady) {
                throw new Error('Puter.ai SDK belum siap');
            }

            // Call Puter.ai API with compaction for long conversations
            const response = await puter.ai.chat(conversationHistory, {
                stream: false,
                compaction: true,
                // Uncomment to choose a specific model:
                // model: 'gpt-4o-mini'
            });

            const reply = response?.message?.content || response?.result?.message?.content || 'Maaf, saya tidak bisa merespon saat ini.';

            // Hide typing
            hideTyping();

            // Add bot response
            appendMessage('bot', reply);

            // Add to conversation history
            conversationHistory.push({ role: 'assistant', content: reply });

            // Save updated history to KV Store
            saveConversationToKV();

        } catch (error) {
            hideTyping();
            console.error('Puter.ai error:', error);
            appendMessage('bot', '⚠️ Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi.');
        } finally {
            isProcessing = false;
            input.disabled = false;
            input.focus();
            sendBtn.disabled = false;
            updateSendButton();
        }
    }

    // ===== Form Submit Handler =====
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = input.value.trim();
        if (text && !isProcessing) {
            sendMessage(text);
        }
    });

    // ===== Ctrl+Enter to send =====
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });

    // ===== Suggestion Chips =====
    suggestions.addEventListener('click', function(e) {
        const chip = e.target.closest('.chip');
        if (chip && chip.dataset.question) {
            if (!isProcessing) {
                sendMessage(chip.dataset.question);
            }
        }
    });

    // ===== Wait for SDK, then enable =====
    waitForPuter(() => {
        input.focus();
    });

})();
