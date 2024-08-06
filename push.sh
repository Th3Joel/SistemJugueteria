#!/bin/bash

params=$1

cd web
bun run build
cd ..

go build -o sis

git add .
git commit -m "$params"
git push