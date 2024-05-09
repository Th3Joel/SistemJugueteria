FROM debian:latest

RUN apt update && apt install -y \
    wget curl unzip \
    && apt clean && rm -rf /var/lib/apt/list/*

RUN curl -fsSL https://bun.sh/install | bash

RUN wget https://go.dev/dl/go1.22.3.linux-amd64.tar.gz \
    && tar -C /usr/local -xzf go1.22.3.linux-amd64.tar.gz

COPY . ./home

RUN cd /home/web && ~/.bun/bin/bun install && ~/.bun/bin/bun run build

RUN cd /home && /usr/local/go/bin/go mod download \
    && /usr/local/go/bin/go build -ldflags "-s -w" -o jugueteriaApi . 

CMD ["/home/jugueteriaApi","-D" ]
