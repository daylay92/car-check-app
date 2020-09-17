FROM node:10

WORKDIR /usr/app/src

COPY ./microservices/authentication-service/package.json ./

COPY ./proto /usr/proto

RUN npm install

COPY ./microservices/authentication-service/ .

RUN npm run build

COPY ./proto/*.proto ./dist/proto/

EXPOSE 5302

CMD ["npm", "start:prod"]