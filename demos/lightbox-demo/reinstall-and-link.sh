
echo "Cleaning up your demo..."

npm run clear
npm install

echo "Linking the react-images-extended-2 package..."

cd ../../src/
npm link

echo "Linking react-images-extended-2 in your demo..."

cd ../demos/lightbox-demo
npm link react-images-extended-2-stable