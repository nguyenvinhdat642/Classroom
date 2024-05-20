FROM node:16

EXPOSE 5000

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD ["nodemon", "index.js"]