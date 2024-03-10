FROM node:10-alpine

WORKDIR /usr/app
RUN npm ci --omit=dev
COPY /src ./
COPY package*.json ./

CMD npm start
