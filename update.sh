git add .

cd src

git commit -m "your message" 2>&1 | cat >> log &

cd ..

npm version patch


