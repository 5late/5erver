FROM golang:latest

COPY . .

RUN go build main.go

EXPOSE 1337

CMD ["./main"]