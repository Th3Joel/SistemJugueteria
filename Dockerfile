FROM debian:latest

RUN apt-get update && apt-get install -y wget \
 #   wget curl unzip gcc \
    && apt-get clean && rm -rf /var/lib/apt/list/*

#RUN curl -fsSL https://bun.sh/install | bash

#RUN wget https://go.dev/dl/go1.22.2.linux-amd64.tar.gz \
 #   && tar -C /usr/local -xzf go1.22.2.linux-amd64.tar.gz

WORKDIR /app
COPY sis .
#COPY uploads/ ./uploads/

#RUN cd web && ~/.bun/bin/bun install && ~/.bun/bin/bun run build

#RUN /usr/local/go/bin/go mod download \
 #   && CGO_ENABLED=1 /usr/local/go/bin/go build -ldflags "-s -w" -o sis .
 EXPOSE 5000
CMD ./sis
