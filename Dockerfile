# Dockerfile
FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm i --omit=dev

COPY index.js ./

CMD ["node", "index.js"]
