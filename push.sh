#!/bin/bash

params=$1

#Replace the uri in useFetch.ts
sed -i '8s/.*/const uri = "\/api"/' web/src/modules/core/hooks/useFetch.ts

cd web
bun run build
cd ..

sed -i '8s/.*/const uri = "http:\/\/localhost:5000\/api"/' web/src/modules/core/hooks/useFetch.ts


go build -o sis

git add .
git commit -m "$params"
git push