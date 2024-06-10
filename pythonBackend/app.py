from flask import Flask, request, jsonify
import os
import subprocess
from flask_cors import CORS
import psutil
env = os.environ.copy()
os.environ['BROWSER'] = 'none'
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
    data = data.get('code')
    #data = data.strip('"')
    #code = data.get('code')
    print(data)
    with open('streamlit_app.py', 'w') as f:
        f.write(data)
    stop_process_by_port(8501)
    # Restart Streamlit server
    #os.system('pkill -f streamlit')
    subprocess.Popen(['streamlit', 'run','--server.port', '8501', 'streamlit_app.py'])

    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(port=5000)
