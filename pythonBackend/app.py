from flask import Flask, request, jsonify
import os
import subprocess
from flask_cors import CORS
import psutil
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
def find_process_by_port(port):
    for proc in psutil.process_iter(['pid', 'name', 'connections']):
        for conn in proc.info['connections']:
            if conn.laddr.port == port:
                return proc
    return None

def stop_process_by_port(port):
    proc = find_process_by_port(port)
    if proc:
        os.kill(proc.pid, 9)
@app.route('/', methods=['POST'])

def update_code():
    data = request.get_json()
    print('--->', data)
    if not data:
        return jsonify({'status': 'error', 'message': 'No data provided'}), 400

    app_name = data.get('app_name')
    code = data.get('code')
    port = data.get('port')

    if not app_name or not code or not port:
        return jsonify({'status': 'error', 'message': 'Missing app_name, code, or port'}), 400

    app_filename = f'{app_name}.py'
    with open(app_filename, 'w') as f:
        f.write(code)

    # Stop existing Streamlit server on the specified port
    stop_process_by_port(port)

    # Start Streamlit server on the specified port
    subprocess.Popen(['streamlit', 'run', '--server.port', str(port), app_filename])

    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(port=5000)
