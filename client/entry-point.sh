#!/bin/sh

npm run build

while  [ ! -d dist/proto ]; do sleep 1; done;

cp ../proto/*.proto ./dist/proto/

npm run start:dev