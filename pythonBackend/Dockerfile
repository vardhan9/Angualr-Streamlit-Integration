FROM python:3.12-slim
COPY . /streamlitApp
WORKDIR /streamlitApp
RUN pip install --no-cache-dir -r requirements.txt
COPY cert.pem /app/cert.pem
COPY key.pem /app/key.pem
CMD ["sh", "-c", "python app.py & streamlit run streamlit_app.py --server.port 8501"] 