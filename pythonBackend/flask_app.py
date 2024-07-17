from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
import subprocess
import os
import psutil

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

created_apps = []

def is_port_in_use(port):
    for conn in psutil.net_connections():
        if conn.laddr.port == port:
            return True
    return False

def get_apps_with_status():
    apps_with_status = []
    for app in created_apps:
        status = 'Running' if is_port_in_use(app['portNumber']) else 'Stopped'
        apps_with_status.append({
            'appName': app['appName'],
            'portNumber': app['portNumber'],
            'status': 'Running'
        })
    return apps_with_status

@app.route('/create-app', methods=['POST'])
def create_app():
    data = request.get_json()
    app_name = data['appName']
    port_number = data['portNumber']

    # Check if the port is in use
    if is_port_in_use(port_number):
        return jsonify({"message": "Port is already in use"}), 400

    # Check if the app name is already taken
    app_dir = os.getcwd()
    streamlit_script_path = os.path.join(app_dir, f"{app_name}.py")
    if os.path.exists(streamlit_script_path):
        return jsonify({"message": "App name is already taken"}), 400

    # Create the Streamlit app script
    streamlit_script = f"""
    import streamlit as st

    st.title("{app_name}")
    st.write("This app is running on port {port_number}")
    """
    
    with open(streamlit_script_path, 'w') as f:
        f.write(streamlit_script)
    
    subprocess.Popen(['streamlit', 'run', streamlit_script_path, '--server.port', str(port_number)], cwd=app_dir)

    created_apps.append({
        'appName': app_name,
        'portNumber': port_number
    })

    return jsonify({"message": "App created successfully"}), 201

@app.route('/get-apps', methods=['GET'])
def get_apps():
    apps_with_status = get_apps_with_status()
    return jsonify(apps_with_status), 200  # Return a valid JSON response

if __name__ == '__main__':
    app.run(debug=True, port=5000)
