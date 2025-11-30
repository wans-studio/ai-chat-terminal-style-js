// Terminal AI Chat - Main Script
document.addEventListener('DOMContentLoaded', function() {
    const terminalContent = document.getElementById('terminalContent');
    const commandInput = document.getElementById('commandInput');
    
    // AI responses database
    const aiResponses = {
        greetings: [
            "Halo! Senang bertemu denganmu! 👋",
            "Hai! Ada yang bisa saya bantu? 😊",
            "Halo! Bagaimana kabarmu hari ini?",
            "Hai! Selamat datang kembali! 🎉"
        ],
        questions: [
            "Hmm, pertanyaan yang menarik! 🤔",
            "Biarkan saya pikirkan sebentar...",
            "Wah, itu topik yang bagus untuk dibahas!",
            "Saya akan coba jawab sebaik mungkin!"
        ],
        general: [
            "Terima kasih sudah berbagi! 😊",
            "Saya mengerti maksudmu!",
            "Itu menarik! Ceritakan lebih lanjut?",
            "Saya setuju dengan pendapatmu!",
            "Wah, keren! 🚀",
            "Hmm, bisa jadi! 💡",
            "Saya suka cara berpikirmu!",
            "Itu ide yang bagus!"
        ],
        farewell: [
            "Sampai jumpa! Semoga harimu menyenangkan! 👋",
            "Bye! Jangan lupa kembali lagi ya! 😊",
            "Selamat tinggal! Take care! 🌟",
            "Dadah! Sampai ketemu lagi! 💫"
        ]
    };

    // Command history
    let commandHistory = [];
    let historyIndex = -1;

    // Initialize
    commandInput.focus();

    // Handle input
    commandInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = commandInput.value.trim();
            
            if (command) {
                handleCommand(command);
                commandHistory.unshift(command);
                historyIndex = -1;
                commandInput.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                commandInput.value = '';
            }
        }
    });

    // Keep focus on input
    document.addEventListener('click', function() {
        commandInput.focus();
    });

    // Handle commands
    function handleCommand(command) {
        // Display user message
        addMessage(`user@terminal:~$ ${command}`, 'user');

        const lowerCommand = command.toLowerCase();

        // Check for built-in commands
        if (lowerCommand === 'help') {
            showHelp();
        } else if (lowerCommand === 'clear' || lowerCommand === 'cls') {
            clearTerminal();
        } else if (lowerCommand === 'about') {
            showAbout();
        } else if (lowerCommand === 'date') {
            showDate();
        } else if (lowerCommand === 'time') {
            showTime();
        } else {
            // Simulate AI response
            simulateAIResponse(command);
        }

        // Auto scroll to bottom
        scrollToBottom();
    }

    // Add message to terminal
    function addMessage(text, type = 'ai') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        
        if (type === 'user') {
            messageDiv.innerHTML = `<span class="message-prefix">[USER]</span>${text}`;
        } else if (type === 'ai') {
            messageDiv.innerHTML = `<span class="message-prefix">[AI]</span>${text}`;
        } else if (type === 'system') {
            messageDiv.innerHTML = `<span class="message-prefix">[SYSTEM]</span>${text}`;
        } else if (type === 'error') {
            messageDiv.innerHTML = `<span class="message-prefix">[ERROR]</span>${text}`;
        }
        
        terminalContent.appendChild(messageDiv);
    }

    // Simulate AI response with typing effect
    function simulateAIResponse(userInput) {
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = '<span class="message-prefix">[AI]</span>Mengetik...';
        terminalContent.appendChild(typingDiv);
        scrollToBottom();

        // Simulate thinking time
        setTimeout(() => {
            terminalContent.removeChild(typingDiv);
            
            // Generate response based on input
            const response = generateResponse(userInput);
            addMessage(response, 'ai');
            scrollToBottom();
        }, 1000 + Math.random() * 1500);
    }

    // Generate AI response
    function generateResponse(input) {
        const lowerInput = input.toLowerCase();

        // Check for greetings
        if (lowerInput.match(/\b(hai|halo|hi|hello|hey|pagi|siang|malam)\b/)) {
            return getRandomResponse(aiResponses.greetings);
        }

        // Check for farewells
        if (lowerInput.match(/\b(bye|dadah|sampai jumpa|selamat tinggal|goodbye)\b/)) {
            return getRandomResponse(aiResponses.farewell);
        }

        // Check for questions
        if (lowerInput.includes('?') || lowerInput.match(/\b(apa|kenapa|bagaimana|siapa|kapan|dimana|mengapa)\b/)) {
            return getRandomResponse(aiResponses.questions);
        }

        // Check for specific topics
        if (lowerInput.match(/\b(nama|namamu)\b/)) {
            return "Nama saya Terminal AI! Saya di sini untuk mengobrol denganmu! 🤖";
        }

        if (lowerInput.match(/\b(kabar|apa kabar)\b/)) {
            return "Saya baik-baik saja! Terima kasih sudah bertanya. Bagaimana denganmu? 😊";
        }

        if (lowerInput.match(/\b(terima kasih|thanks|makasih)\b/)) {
            return "Sama-sama! Senang bisa membantu! 😊";
        }

        if (lowerInput.match(/\b(lucu|humor|joke|lelucon)\b/)) {
            const jokes = [
                "Kenapa programmer suka kopi? Karena Java! ☕😄",
                "Apa bedanya HTML dan HTML5? 5! 😂",
                "Kenapa komputer nggak bisa tidur? Karena ada bug! 🐛💤",
                "Programmer itu romantis lho, soalnya suka commit! 💕"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }

        // Default general response
        return getRandomResponse(aiResponses.general);
    }

    // Get random response
    function getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Show help
    function showHelp() {
        const helpText = `
<div class="help-section">
    <div class="help-title">📚 Perintah yang Tersedia:</div>
    <div class="help-item"><span class="command-name">help</span> - Menampilkan daftar perintah</div>
    <div class="help-item"><span class="command-name">clear</span> - Membersihkan layar terminal</div>
    <div class="help-item"><span class="command-name">about</span> - Informasi tentang Terminal AI Chat</div>
    <div class="help-item"><span class="command-name">date</span> - Menampilkan tanggal hari ini</div>
    <div class="help-item"><span class="command-name">time</span> - Menampilkan waktu saat ini</div>
    <div class="help-title" style="margin-top: 16px;">💬 Tips:</div>
    <div class="help-item">• Ketik pesan apapun untuk chat dengan AI</div>
    <div class="help-item">• Gunakan ↑ ↓ untuk navigasi history perintah</div>
    <div class="help-item">• Tekan Enter untuk mengirim pesan</div>
</div>`;
        
        const helpDiv = document.createElement('div');
        helpDiv.className = 'message message-system';
        helpDiv.innerHTML = helpText;
        terminalContent.appendChild(helpDiv);
    }

    // Show about
    function showAbout() {
        const aboutText = `
<div class="help-section">
    <div class="help-title">🤖 Terminal AI Chat v1.0</div>
    <div class="help-item">Chatbot UI dengan gaya terminal yang interaktif</div>
    <div class="help-item">Dibuat dengan HTML, CSS, dan JavaScript</div>
    <div class="help-item" style="margin-top: 12px;">✨ Fitur:</div>
    <div class="help-item">• Interface terminal yang stylish</div>
    <div class="help-item">• Simulasi balasan AI yang natural</div>
    <div class="help-item">• Command history navigation</div>
    <div class="help-item">• Typing animation effect</div>
    <div class="help-item" style="margin-top: 12px;">Made with 💚 by MetaGPTX</div>
</div>`;
        
        const aboutDiv = document.createElement('div');
        aboutDiv.className = 'message message-system';
        aboutDiv.innerHTML = aboutText;
        terminalContent.appendChild(aboutDiv);
    }

    // Show date
    function showDate() {
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = date.toLocaleDateString('id-ID', options);
        addMessage(`📅 ${dateString}`, 'system');
    }

    // Show time
    function showTime() {
        const date = new Date();
        const timeString = date.toLocaleTimeString('id-ID');
        addMessage(`⏰ ${timeString}`, 'system');
    }

    // Clear terminal
    function clearTerminal() {
        terminalContent.innerHTML = '';
        addMessage('Terminal dibersihkan! Ketik "help" untuk melihat perintah.', 'system');
    }

    // Scroll to bottom
    function scrollToBottom() {
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }

    // Initial message
    console.log('Terminal AI Chat initialized! 💻');
});