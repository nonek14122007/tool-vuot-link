import os
import random
import time
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Danh sách trình duyệt giả lập để tránh bị phát hiện là bot
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1"
]

def unshorten(url):
    session = requests.Session()
    # Thêm delay ngẫu nhiên 1-2 giây để giống người thật thao tác
    time.sleep(random.uniform(1.0, 2.0))
    try:
        headers = {
            "User-Agent": random.choice(USER_AGENTS),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        }
        # Theo dõi chuyển hướng đến tận cùng link gốc
        resp = session.get(url, headers=headers, timeout=15, allow_redirects=True)
        return {"final": resp.url, "success": True}
    except Exception as e:
        return {"error": str(e), "success": False}

@app.route('/bypass', methods=['POST'])
def api_bypass():
    data = request.json
    if not data or 'url' not in data:
        return jsonify({"error": "Vui lòng nhập URL hợp lệ"}), 400
    
    url = data.get('url').strip()
    # Tự động thêm https nếu người dùng quên nhập
    if not url.startswith(("http://", "https://")):
        url = "https://" + url
        
    result = unshorten(url)
    return jsonify(result)

if __name__ == "__main__":
    # Render yêu cầu host 0.0.0.0 và port từ môi trường
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)