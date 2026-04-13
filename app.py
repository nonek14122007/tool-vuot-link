from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Cho phép GitHub Pages truy cập vào Render

def bypass_logic(url):
    # Sử dụng API hỗ trợ bypass tổng hợp
    api_url = f"https://api.bypass.vip/bypass?url={url}"
    try:
        response = requests.get(api_url, timeout=10)
        data = response.json()
        if data.get("status") == "success":
            return data.get("destination")
        return None
    except:
        return None

@app.route('/bypass', methods=['POST'])
def handle_bypass():
    data = request.json
    input_url = data.get('url')
    
    if not input_url:
        return jsonify({"error": "Bảo ơi, chưa có link kìa!"}), 400
    
    result = bypass_logic(input_url)
    
    if result:
        return jsonify({"original_url": result})
    else:
        return jsonify({"error": "Link này khó quá, mình chưa vượt được!"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
