FROM node:10

WORKDIR /usr/app/src

COPY ./microservices/notification-service/package.json ./

COPY ./proto /usr/proto

RUN npm install

COPY ./microservices/notification-service/ .

RUN npm run build

COPY ./proto/*.proto ./dist/proto/

EXPOSE 4504

CMD ["npm", "start:prod"]