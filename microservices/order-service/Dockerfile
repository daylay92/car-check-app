FROM node:10

WORKDIR /usr/app/src

COPY ./microservices/order-service/package.json ./

COPY ./proto /usr/proto

RUN npm install

COPY ./microservices/order-service/ .

RUN npm run build

COPY ./proto/*.proto ./dist/proto/

EXPOSE 4503

CMD ["npm", "start:prod"]