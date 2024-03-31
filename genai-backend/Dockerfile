FROM ubuntu:22.04

ENV OPENAI_API_KEY='OPENAI_API_KEY'

RUN mkdir backend
WORKDIR backend

RUN apt-get update -y && \
    apt install python3-pip -y && \
    pip install -U Flask && \
    pip install -U flask-cors && \
    pip install openai python-dotenv

COPY GenAI/genai.py genai.py
COPY GenAI/app.py app.py

EXPOSE 5000

CMD ["python3", "app.py"]
