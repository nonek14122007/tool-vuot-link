document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.btn-bypass');
    const input = document.querySelector('.link-input');
    
    // !!! QUAN TRỌNG: Thay bằng link Render thật của bạn !!!
    const API_URL = 'https://GBVN.OKCHUA.com/bypass';

    btn.addEventListener('click', async () => {
        const url = input.value.trim();
        if (!url) {
            alert("Bảo ơi, dán link vào đã! 🐶");
            return;
        }

        btn.innerText = "Đang xử lý...";
        btn.disabled = true;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url })
            });

            if (!response.ok) throw new Error("Server đang bận hoặc lỗi");

            const data = await response.json();
            if (data.success) {
                input.value = data.final;
                alert("Vượt link thành công!");
            } else {
                alert("Lỗi: " + data.error);
            }
        } catch (err) {
            alert("Lỗi kết nối: Bảo hãy kiểm tra xem đã bật server Render chưa nhé!");
            console.error(err);
        } finally {
            btn.innerText = "Đường vòng";
            btn.disabled = false;
        }
    });
});