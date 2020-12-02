FROM nikolaik/python-nodejs:python3.7-nodejs12

RUN apt-get update
RUN apt-get install vim -y
WORKDIR /app

COPY package*.json ./
RUN npm i --loglevel error

COPY . .

RUN chmod 111 ./docker_start.sh

CMD ["bash", "docker_start.sh"]
