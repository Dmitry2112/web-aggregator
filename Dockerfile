FROM node:16.17.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

EXPOSE 4200

CMD ["npm", "run", "start"]
