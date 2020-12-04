printf "TOKEN_SECRET=" > .env
xxd -l 64 -p -c 9000 /dev/urandom >> .env
echo "PORT=9001" >> .env
echo "UPLOAD_ENDPOINT=app/uploads" >> .env
echo "FLASK_ENDPOINT=http://flask:80" >> .env
printf "TOKEN_SECRET=" > .env.development
xxd -l 64 -p -c 9000 /dev/urandom >> .env.development
echo "PORT=9001" >> .env.development
echo "UPLOAD_ENDPOINT=../uploads" >> .env.development
echo "FLASK_ENDPOINT=http://localhost:5000/" >> .env.development
