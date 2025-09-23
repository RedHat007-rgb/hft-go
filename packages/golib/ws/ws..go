package ws

import (
	"log"

	"github.com/gorilla/websocket"
)


func ConnectAndStream(url string) *websocket.Conn{
	conn,_,err:=websocket.DefaultDialer.Dial(url,nil);
	if err!=nil{
		log.Fatalf("dialing error")
	}
	return conn
}