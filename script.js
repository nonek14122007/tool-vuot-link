// 1. Khai báo link "Bộ não" Render của Bảo
const API_URL = 'https://tool-vuot-link.onrender.com/bypass';

async function bypassLink() {
    const linkInput = document.getElementById('link-input').value;
    const resultDiv = document.getElementById('result');
    const btnText = document.querySelector('.btn-text');
    const loading = document.querySelector('.loading');

    if (!linkInput) {
        alert('Bảo ơi, dán link vào đã nhé!');
        return;
    }

    // Hiệu ứng đang xử lý
    btnText.style.display = 'none';
    loading.style.display = 'block';
    resultDiv.innerHTML = '<p style="color: #00ff00;">Đang vượt rào, đợi xíu nha...</p>';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: linkInput })
        });

        const data = await response.json();

        if (data.original_url) {
            // Hiển thị kết quả khi thành công
            resultDiv.innerHTML = `
                <div style="background: #1a1a1a; padding: 15px; border-radius: 8px; border: 1px solid #00ff00; margin-top: 15px;">
                    <p style="color: #00ff00; margin-bottom: 10px;">Thành công rực rỡ! Link của Bảo đây:</p>
                    <input type="text" value="${data.original_url}" id="final-link" readonly 
                           style="width: 80%; padding: 8px; background: #000; color: #fff; border: 1px solid #333;">
                    <button onclick="copyToClipboard()" style="padding: 8px; cursor: pointer; background: #00ff00; color: #000; border: none; font-weight: bold;">Copy</button>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `<p style="color: #ff0000;">Lỗi: ${data.error || 'Không xác định'}</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: #ff0000;">Lỗi kết nối: Bảo hãy kiểm tra xem server Render đã bật chưa nhé!</p>`;
    } finally {
        btnText.style.display = 'block';
        loading.style.display = 'none';
    }
}

// Hàm hỗ trợ copy nhanh
function copyToClipboard() {
    const copyText = document.getElementById("final-link");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Đã copy link gốc!");
}
