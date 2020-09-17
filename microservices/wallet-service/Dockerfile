FROM node:10

WORKDIR /usr/app/src

COPY ./microservices/wallet-service/package.json ./

COPY ./proto /usr/proto

RUN npm install

COPY ./microservices/wallet-service/ .

RUN npm run build

COPY ./proto/*.proto ./dist/proto/

EXPOSE 4500

CMD ["npm", "start:prod"]

