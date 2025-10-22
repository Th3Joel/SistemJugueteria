FROM ubuntu:latest

RUN apt-get update && apt-get install -y wget mysql-client \
    wget curl unzip gcc \
    && apt-get clean && rm -rf /var/lib/apt/list/*

RUN curl -fsSL https://bun.sh/install | bash

RUN wget https://go.dev/dl/go1.25.3.linux-amd64.tar.gz \
    && tar -C /usr/local -xzf go1.25.3.linux-amd64.tar.gz

WORKDIR /app
COPY . .
#COPY uploads/ ./uploads/
RUN cd web && ~/.bun/bin/bun install && ~/.bun/bin/bun run build
RUN /usr/local/go/bin/go mod download \
    && CGO_ENABLED=1 /usr/local/go/bin/go build -v -ldflags "-s -w" -o sis .
RUN mkdir /tmp
RUN cp web/dir /tmp
RUN cp sis /tmp
RUN rm -rf *
RUN cp /tmp/web .
RUN cp /tmp/sis .
RUN rm -rf /tmp
EXPOSE 5000
CMD ./sis
