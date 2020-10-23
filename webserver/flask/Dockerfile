FROM tiangolo/uwsgi-nginx-flask:python3.7
RUN apt-get update
RUN apt-get install vim nano -y
RUN apt-get install 'ffmpeg' 'libsm6' 'libxext6' -y
ENV STATIC_URL /static
ENV STATIC_PATH /var/www/app/static

WORKDIR /var/www/
RUN mkdir uploads
COPY ./flask/requirements.txt ./flask/uwsgi.ini ./flask/main.py ./
RUN pip install --disable-pip-version-check --no-cache-dir -r requirements.txt

COPY ./flask/server ./server
COPY ./celery/tasks ./tasks

RUN ls -al
