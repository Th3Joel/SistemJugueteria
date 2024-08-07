#!/bin/bash

params=$1

#Condicion de if si viene vacio params
if [ -z "$params" ]
then
    echo "No commit message"
    exit 1
fi
pathFile=web/src/modules/core/hooks/useFetch.ts

#Replace the uri in useFetch.ts
sed -i '8s/.*/const uri = "\/api"/' $pathFile

cd web
bun run build
cd ..

sed -i '8s/.*/const uri = "http:\/\/localhost:5000\/api"/' $pathFile

go build -o sis

git add .
git commit -m "$params"
git push