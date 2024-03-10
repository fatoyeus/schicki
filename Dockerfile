FROM node: 10.1.2

WORKDIR /usr/app
RUN npm ci --omit=dev
COPY /src ./
COPY package*.json ./

CMD npm start
