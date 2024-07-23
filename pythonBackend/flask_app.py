import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# File path to store app metadata
file_path = 'apps.json'

# Initialize apps metadata if file doesn't exist or is empty
def initialize_apps_metadata():
    if not os.path.exists(file_path) or os.stat(file_path).st_size == 0:
        with open(file_path, 'w') as f:
            json.dump([], f)

# Helper function to read app metadata from JSON file
def read_apps_metadata():
    with open(file_path, 'r') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

# Helper function to write app metadata to JSON file
def write_apps_metadata(apps_metadata):
    with open(file_path, 'w') as f:
        json.dump(apps_metadata, f, indent=2)

# Initialize apps metadata on startup
initialize_apps_metadata()

# Route to create an app and save metadata to JSON file
@app.route('/create-app', methods=['POST'])
def create_app():
    data = request.get_json()
    app_name = data['appName']
    port_number = data['portNumber']

    # Load existing apps metadata
    apps_metadata = read_apps_metadata()

    # Check if the app name is already taken
    app_dir = os.getcwd()
    streamlit_script_path = os.path.join(app_dir, f"{app_name}.py")

    for app in apps_metadata:
        if app['appName'] == app_name:
            return jsonify({"message": "App name is already taken"}), 400

    # Save app metadata
    streamlit_script = f"""import streamlit as st\nst.title("{app_name}")\nst.write("This app is running on port {port_number}")"""
    subprocess.Popen(['streamlit', 'run', streamlit_script_path, '--server.port', str(port_number)], cwd=app_dir)

    apps_metadata.append({
        'appName': app_name,
        'portNumber': port_number,
        'status': 'Running'  # Assuming it's running when created
    })

    # Write updated apps metadata back to JSON file
    write_apps_metadata(apps_metadata)

    # Save app script to a file
    app_file_path = f'{app_name}.py'
    with open(app_file_path, 'w') as f:
        f.write(f"""
import streamlit as st
st.title("{app_name}")
st.write("This app is running on port {port_number}")
""")

    return jsonify({"message": "App created successfully"}), 201

# Route to fetch all apps metadata from JSON file
@app.route('/get-apps', methods=['GET'])
def get_apps():
    apps_metadata = read_apps_metadata()
    return jsonify(apps_metadata), 200

# Route to terminate (delete) an app
@app.route('/terminate-app', methods=['POST'])
def terminate_app():
    data = request.get_json()
    app_name = data['appName']

    # Load existing apps metadata
    apps_metadata = read_apps_metadata()

    # Find the app to be terminated
    app_to_terminate = next((app for app in apps_metadata if app['appName'] == app_name), None)
    if not app_to_terminate:
        return jsonify({"message": "App not found"}), 404

    # Remove app metadata
    apps_metadata = [app for app in apps_metadata if app['appName'] != app_name]

    # Write updated apps metadata back to JSON file
    write_apps_metadata(apps_metadata)

    # Delete the app script file
    app_file_path = f'{app_name}.py'
    if os.path.exists(app_file_path):
        os.remove(app_file_path)

    return jsonify({"message": "App terminated successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
