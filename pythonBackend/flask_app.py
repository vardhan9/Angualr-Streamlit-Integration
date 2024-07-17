from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/create-app', methods=['POST'])
def create_app():
    data = request.get_json()
    app_name = data['appName']
    port_number = data['portNumber']

    # Use a fixed directory for all Streamlit apps
    app_dir = os.getcwd()

    # Streamlit script file name based on app name
    streamlit_script_path = os.path.join(app_dir, f"{app_name}.py")

    streamlit_script = f"""
import streamlit as st

st.title("{app_name}")
st.write("This app is running on port {port_number}")
    """
    
    with open(streamlit_script_path, 'w') as f:
        f.write(streamlit_script)
    
    subprocess.Popen(['streamlit', 'run', streamlit_script_path, '--server.port', str(port_number)], cwd=app_dir)

    return jsonify({"message": "App created successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)
