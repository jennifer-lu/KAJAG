FROM nikolaik/python-nodejs:python3.7-nodejs12

WORKDIR /app

COPY package*.json ./
RUN npm i --loglevel error

COPY . .

RUN chmod 111 ./start.sh

CMD ["bash", "start.sh"]
