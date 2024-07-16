FROM python:3.12-slim
COPY . /streamlitApp
WORKDIR /streamlitApp
RUN pip install  -r requirements.txt
CMD ["sh", "-c", "python app.py & streamlit run streamlit_app.py --server.port 8501"] 