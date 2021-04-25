FROM golang:latest

COPY . .

RUN go build main.go

EXPOSE 80

CMD ["./main"]