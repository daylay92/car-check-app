FROM node:10

WORKDIR /usr/app/src

COPY ./microservices/user-service/package.json ./

COPY ./proto /usr/proto

RUN npm install

COPY ./microservices/user-service/ .

RUN npm run build

COPY ./proto/*.proto ./dist/proto/

EXPOSE 4502

CMD ["npm", "start:prod"]