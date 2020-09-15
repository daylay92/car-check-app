#!/usr/bin/env sh

if [ ! -d build ]; then
    mkdir -p build
fi;

protoc \
--plugin=./node_modules/.bin/protoc-gen-ts_proto \
--ts_proto_out=./build *.proto \
--ts_proto_opt=lowerCaseServiceMethods=true,outputEncodeMethods=false,outputJsonMethods=false,outputClientImpl=false