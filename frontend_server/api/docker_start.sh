printf "TOKEN_SECRET=" >.env
xxd -l 64 -p -c 9000 /dev/urandom >>.env
echo "PORT=9001" >>.env
export NODE_ENV=docker
npm start
