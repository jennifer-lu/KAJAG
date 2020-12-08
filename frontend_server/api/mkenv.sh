printf "TOKEN_SECRET=" > .env.production
xxd -l 64 -p -c 9000 /dev/urandom >> .env.production
echo "PORT=9001" >> .env.production
echo "UPLOAD_ENDPOINT=/app/uploads" >> .env.production
echo "TEX_ENDPOINT=/app/tex" >> .env.production
echo "PDF_ENDPOINT=/app/pdf" >> .env.production
echo "FLASK_ENDPOINT=http://flask:5000" >> .env.production

printf "TOKEN_SECRET=" > .env.development
xxd -l 64 -p -c 9000 /dev/urandom >> .env.development
echo "PORT=9001" >> .env.development
echo "UPLOAD_ENDPOINT=./uploads" >> .env.development
echo "FLASK_ENDPOINT=http://localhost:5000/" >> .env.development
echo "TEX_ENDPOINT=/app/tex" >> .env.development
echo "PDF_ENDPOINT=/app/pdf" >> .env.development
