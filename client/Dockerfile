FROM node:10

WORKDIR /usr/app/src

COPY ./client/package.json ./

COPY ./proto /usr/app/proto

RUN npm install

COPY ./client/ .

RUN npm run build

COPY ./proto/*.proto ./dist/proto/

EXPOSE 6000

CMD ["npm", "start:prod"]