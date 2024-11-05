#!/bin/bash
params=$1
params2=$2
params3=$3

#Condicion de if si es igual a git


if [ "$params" == "b" ]
then    
    pathFile=web/src/modules/core/hooks/useFetch.ts

    #Replace the uri in useFetch.ts
    sed -i '8s/.*/const uri = "\/api"/' $pathFile

    cd web
    bun run build
    cd ..
 
    #sed -i '8s/.*/const uri = "http:\/\/localhost:5000\/api"/' $pathFile

    go build -ldflags="-s -w" -o sis
    #upx --best --lzma sis
fi


if [ "$params2" == "g" ]
then
    if [ -z "$params3" ]
    then
        echo "No commit message"
        exit 1
    fi
    git add .
    git commit -m "$params"
    git push
fi

