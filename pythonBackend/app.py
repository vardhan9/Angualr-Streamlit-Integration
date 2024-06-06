from flask import Flask, request, jsonify
import os
import subprocess
from flask_cors import CORS
import psutil
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# Dictionary to store app process objects and statuses
streamlit_processes = {}

def get_app_statuses():
  statuses = []
  for app_name, process in streamlit_processes.items():
    status = "Running" if process.poll() is None else "Stopped"
    statuses.append({'name': app_name, 'status': status})
  return statuses

@app.route('/streamlit-apps', methods=['GET'])
def get_streamlit_apps():
  return jsonify(get_app_statuses()), 200

@app.route('/<app_name>', methods=['POST'])
def start_streamlit(app_name):
  if app_name not in ['app1', 'app2']:  # Replace with your app names
    return jsonify({'message': f'Streamlit app "{app_name}" started (simulated)'}), 200
    return jsonify({'error': 'Invalid app name'}), 400

  try:
    # Check if process already exists to avoid multiple instances
    if app_name in streamlit_processes:
      return jsonify({'message': f'{app_name} already running'}), 200

    # Replace with your Streamlit command (including virtual environment activation if needed)
    streamlit_process = subprocess.Popen(['streamlit', 'run', f'{app_name}.py'])
    streamlit_processes[app_name] = streamlit_process
    return jsonify({'message': f'{app_name} started'}), 200
  except Exception as e:
    return jsonify({'error': str(e)}), 500  # Handle errors
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
@app.route('/create-streamlit', methods=['GET'])

def create_streamlit():
      data = request.get_json()
      code = data.get('code')
      file_name = app1.py

      if not code or not file_name:
         return jsonify({'error': 'Missing code or file name'}), 400

      try:
         with open(file_name, 'w') as f:
          f.write(code)
         return jsonify({'message': 'Streamlit app created (simulated)'}), 200
      except Exception as e:
         return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
