FROM node:lts-alpine

# ustaw folder 'app' jako katalog roboczy
WORKDIR /app

# skopiuj pliki 'package.json' i 'package-lock.json'
COPY package*.json ./

# zainstaluj zaleznosci i biblioteki
RUN npm install

# skopiuj wszystkie pliki do katalogu roboczego
COPY . .

# zbuduj aplikacje
RUN npm run-script build

EXPOSE 8080
CMD [ "npm", "start" ]