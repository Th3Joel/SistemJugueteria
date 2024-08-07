#!/bin/bash

params=$1
params2=$2

#Condicion de if si es igual a git


pathFile=web/src/modules/core/hooks/useFetch.ts

#Replace the uri in useFetch.ts
sed -i '8s/.*/const uri = "\/api"/' $pathFile

cd web
bun run build
cd ..

sed -i '8s/.*/const uri = "http:\/\/localhost:5000\/api"/' $pathFile

go build -o sis

if [ "$params" == "git" ]
then
    if [ -z "$params2" ]
    then
        echo "No commit message"
        exit 1
    fi
    git add .
    git commit -m "$params"
    git push
fi

