FROM node:16-alpine as build
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
