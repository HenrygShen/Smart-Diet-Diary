FROM python:3.6.8-slim-stretch

WORKDIR /usr/src/sdd_api

COPY ./ ./


RUN pip install -r requirements.txt

CMD ["python", "server.py"]
