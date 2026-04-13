from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

def get_bypass(url):
    # API trung gian để giải mã nhiều loại link
    try:
        api = f"https://api.bypass.vip/bypass?url={url}"
        r = requests.get(api, timeout=10)
        return r.json().get("destination")
    except:
        return None

@app.route('/bypass', methods=['POST'])
def handle():
    data = request.json
    url = data.get('url')
    if not url:
        return jsonify({"error": "Thiếu link rồi!"}), 400
    
    original = get_bypass(url)
    if original:
        return jsonify({"original_url": original})
    return jsonify({"error": "Link này khó quá, mình chưa giải được!"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
