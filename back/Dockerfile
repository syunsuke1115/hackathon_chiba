FROM golang:1.18 as build

# コンテナ上にアプリケーション(main.goのビルド成果物)を配置するdirectoryを作成
WORKDIR /app

# ソースをコピー
COPY ./ ./
RUN go mod download

# goファイルのビルド
RUN GOOS=linux GOARCH=amd64 go build -mod=readonly -v -o server

# docker コンテナの50001ポートをこのサービスのために使用
EXPOSE 8080

# apiサーバを起動
CMD /app/server
