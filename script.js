const API_URL = 'https://tool-vuot-link.onrender.com/bypass';

async function bypassLink() {
    const linkInput = document.getElementById('link-input');
    const resultDiv = document.getElementById('result');
    
    if (!linkInput.value) {
        alert('Bảo ơi, dán link vào đã nhé!');
        return;
    }

    resultDiv.innerHTML = '<p style="color: #00ff00;">Đang bẻ khóa... Đợi xíu nha!</p>';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: linkInput.value })
        });

        const data = await response.json();

        if (data.original_url) {
            resultDiv.innerHTML = `
                <div style="background: #1a1a1a; padding: 15px; border-radius: 8px; border: 1px solid #00ff00; margin-top: 15px;">
                    <p style="color: #00ff00;">Thành công rực rỡ!</p>
                    <input type="text" value="${data.original_url}" id="final-link" readonly style="width: 70%; padding: 5px;">
                    <button onclick="copyLink()" style="padding: 5px; background: #00ff00; border: none; cursor: pointer;">Copy</button>
                    <br><br>
                    <a href="${data.original_url}" target="_blank" style="color: #00fbff;">Mở link ngay</a>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `<p style="color: #ff0000;">Lỗi: ${data.error}</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: #ff0000;">Lỗi kết nối! Kiểm tra xem Render có đang Live không Bảo nhé.</p>`;
    }
}

function copyLink() {
    const copyText = document.getElementById("final-link");
    copyText.select();
    document.execCommand("copy");
    alert("Đã copy link!");
}
