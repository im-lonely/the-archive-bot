git add .

cd src

git commit -m "your message" 2>&1 | cat >> CHANGELOG.md &

cd ..

npm version patch


