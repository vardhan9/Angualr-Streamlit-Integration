# Angular-Streamlit-Integration

Steps to run

1. In angularFrontend, run "ng serve" to build angular web application, http://localhost:4200/
2. In pythonBackend, run "python app.py " to run flask, http://localhost:5000/
3. In pythonBackend, run "streamlit run streamlit_app.py --server.port 8501", to run streamlit app, http://localhost:8501/

How does it works:

1. In angular UI, write the python code in Text area and then click execute
2. This code is sent to flask app and then it updates the code in streamlit_app.py
3. http://localhost:8501/, in this port streamlit apps can be seen
