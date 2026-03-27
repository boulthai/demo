document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo UI Elements
    const toggleBtn = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const refreshBtn = document.getElementById('chatbot-refresh');
    const messagesContainer = document.getElementById('chatbot-messages');
    const inputField = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');

    // 2. Logic System Prompt và Chat History
    let systemPrompt = "";
    let expertName = "chuyên gia";
    let chatHistory = [];
    
    // API Cấu hình
    const API_URL = 'https://9router.vuhai.io.vn/v1/chat/completions';
    const API_KEY = 'sk-4bd27113b7dc78d1-lh6jld-f4f9c69f';
    const MODEL = 'ces-chatbot-gpt-5.4';

    // Fetch nội dung chatbot_data.txt
    fetch('chatbot_data.txt?t=' + new Date().getTime())
        .then(response => response.text())
        .then(data => {
            const nameMatch = data.match(/\*\s*Tên\s+chuyên\s+gia:\s*(.*)/i);
            if (nameMatch) {
                expertName = nameMatch[1].trim();
            }
            systemPrompt = `Vai trò: Bạn là AI trợ lý độc quyền cho chuyên gia ${expertName}.
Chỉ được phép trả lời dựa trên Knowledge Base dưới đây.
Phải trả lời bằng Markdown rõ ràng, dễ đọc.
Luôn:
- Chào đón thân thiện.
- Trả lời rõ ràng, tập trung vào trọng tâm.
- Kết thúc bằng lời mời hỏi thêm thông tin.
Nếu câu hỏi nằm ngoài phạm vi Knowledge Base, hãy từ chối nhẹ nhàng một cách lịch sự và hướng dẫn liên hệ trực tiếp.

--- KNOWLEDGE BASE ---
${data}`;
            initChat();
        })
        .catch(error => {
            console.error('Không thể load chatbot_data.txt:', error);
            systemPrompt = "Bạn là AI trợ lý. Xin hãy trả lời bằng tiếng Việt và dùng markdown.";
            initChat();
        });

    // 3. Hàm khởi tạo / Reset chat
    function initChat() {
        chatHistory = [
            { role: 'system', content: systemPrompt }
        ];
        
        // Tin nhắn chào mừng ban đầu
        appendMessage('ai', `Xin chào! Tôi là trợ lý AI của chuyên gia **${expertName}**. Tôi có thể giúp bạn giải đáp thông tin về các giải pháp và khóa học của chuyên gia. Bạn cần tôi hỗ trợ gì nào?`);
    }

    // 4. Hàm render tin nhắn (Render Markdown)
    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        
        if (sender === 'ai') {
            msgDiv.classList.add('chat-markdown');
            // Parse Markdown sang HTML nhờ thư viện marked
            msgDiv.innerHTML = marked.parse(text);
        } else {
            msgDiv.textContent = text;
        }
        
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    // 5. Scroll xuống tin nhắn cuối (Bonus effect)
    function scrollToBottom() {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }

    // 6. Typing Animation
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
            <span class="typing-text">Đang nhập...</span>
        `;
        messagesContainer.appendChild(typingDiv);
        scrollToBottom();
    }

    function removeTyping() {
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) {
            typingDiv.remove();
        }
    }

    // 7. Logic Gửi Request API (Chuẩn OpenAI SDK qua API ngoài)
    async function sendMessage() {
        const text = inputField.value.trim();
        if (!text) return;

        // Add user message to UI & history
        appendMessage('user', text);
        chatHistory.push({ role: 'user', content: text });
        inputField.value = '';

        showTyping();

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: chatHistory
                })
            });

            if (!response.ok) {
                throw new Error(`Lỗi kết nối API: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;

            removeTyping();
            appendMessage('ai', aiResponse);
            chatHistory.push({ role: 'assistant', content: aiResponse });

        } catch (error) {
            removeTyping();
            console.error('Lỗi khi gọi API:', error);
            appendMessage('ai', 'Xin lỗi, tôi đang gặp lỗi kết nối với máy chủ AI. Vui lòng thử lại sau ít phút.');
        }
    }

    // 8. Event Listeners
    
    // Toggle On/Off Chat Window
    toggleBtn.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');
    });

    closeBtn.addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
    });

    // Refresh Logic (BẮT BUỘC YÊU CẦU: Hiệu ứng xoay + reset)
    refreshBtn.addEventListener('click', () => {
        // Animation xoay icon 500ms
        refreshBtn.classList.add('refresh-spin');
        
        setTimeout(() => {
            refreshBtn.classList.remove('refresh-spin');
        }, 500);
        
        // Xóa lịch sử chat trên giao diện
        messagesContainer.innerHTML = '';
        
        // Khởi tạo lại chat ban đầu
        initChat();
    });

    // Enter để gửi tin (Bonus requirement)
    sendBtn.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
});
