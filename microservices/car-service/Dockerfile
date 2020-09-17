FROM node:10

WORKDIR /usr/app/src

COPY ./microservices/car-service/package.json ./

COPY ./proto /usr/proto

RUN npm install

COPY ./microservices/car-service/ .

RUN npm run build

COPY ./proto/*.proto ./dist/proto/

EXPOSE 4507

CMD ["npm", "start:prod"]