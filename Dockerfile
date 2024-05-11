FROM golang:1.22.2

 #RUN apt-get update && apt-get install -y \
 #    wget curl unzip 
#     && apt-get clean && rm -rf /var/lib/apt/list/*

#RUN curl -fsSL https://bun.sh/install | bash

# RUN wget https://go.dev/dl/go1.22.2.linux-amd64.tar.gz \
#     && tar -C /usr/local -xzf go1.22.2.linux-amd64.tar.gz
WORKDIR /app
COPY ./jugueteriaApi .

#RUN cd web && ~/.bun/bin/bun install && ~/.bun/bin/bun run build

# RUN go mod download \
#     && CGO_ENABLED=0 GOOS=linux go build -o /jugue
EXPOSE 8080
ENTRYPOINT ["./jugueteriaApi"]
