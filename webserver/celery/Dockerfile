FROM python:3.7.8-slim-buster
RUN mkdir uploads tex pdf
WORKDIR /app

RUN apt-get update
RUN apt-get install vim nano -y
RUN apt-get install texlive -y

COPY ./requirements.txt .
RUN pip install --disable-pip-version-check --no-cache-dir -r requirements.txt

COPY ./start.sh .
RUN chmod 111 ./start.sh
COPY tasks ./tasks
COPY ./config.yml .
RUN ls -al
RUN pdflatex --version
CMD ["bash", "start.sh"]
