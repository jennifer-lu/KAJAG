./mkenv.sh
cp .env.production .env.docker
export NODE_ENV=docker
npm start
