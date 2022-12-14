npm run build
cd ../chatbot-build
rm -rf dist
mv ../chatbot/dist dist
npx cap sync
npx cap run android