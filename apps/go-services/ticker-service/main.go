package main

import (
	"context"
	"encoding/json"
	"log"
	"net"

	pb "github.com/RedHat007-rgb/hft-phase-1-23rd/apps/go-services/ticker-service/proto/ticker"
	"github.com/RedHat007-rgb/hft-phase-1-23rd/packages/golib/ws"
	"google.golang.org/grpc"
)




type TickerServer struct{
	pb.UnimplementedTickerServiceServer
}

type BinanceTicker struct{
	Symbol string `json:"s"`
	Volume string `json:"v"`
	High string	`json:"h"`
}

func (s *TickerServer) StreamTicker(req *pb.TickerRequest, stream pb.TickerService_StreamTickerServer) error {
    symbol := req.Symbol
    url := "wss://stream.binance.com:9443/ws/" + symbol + "@ticker"

    ctx := stream.Context() 
    chnl := make(chan []byte, 16) 
    defer close(chnl)
    go Connect(ctx, url, chnl)
    var t BinanceTicker
    for {
        select {
        case <-ctx.Done():
            log.Println("client disconnected:", ctx.Err())
            return ctx.Err()
        case msg, ok := <-chnl:
            if !ok {
                log.Println("websocket closed for symbol:", symbol)
                return nil
            }
            
            if err := json.Unmarshal(msg, &t); err != nil {
                log.Println("error while unmarshalling:", err)
               return err
            }
            update := &pb.TickerUpdate{
                Symbol: t.Symbol,
                Volume: t.Volume,
                High:   t.High,
            }
            log.Println("sending update:", update.String())
            if err := stream.Send(update); err != nil {
                log.Println("error sending to client:", err)
                return err
            }
        }
    }
}

func Connect(ctx context.Context, url string, out chan []byte) {
    wsConn := ws.ConnectAndStream(url)
    defer wsConn.Close()

    for {
        select {
        case <-ctx.Done():
            log.Println("stopping websocket reader:", ctx.Err())
            return

        default:
            _, data, err := wsConn.ReadMessage()
            if err != nil {
                log.Println("error reading websocket message:", err)
                return
            }
            select {
            case out <- data:
            case <-ctx.Done():
                return
            }
        }
    }
}




func main(){
	lis,err:=net.Listen("tcp",":50052")
	if err!=nil{
		log.Fatalf("failed to listen ERROR: %v",err)
	}
	grpcServer:=grpc.NewServer()
	pb.RegisterTickerServiceServer(grpcServer,&TickerServer{})
	log.Println("go ticker service running on 50052")
	if err:=grpcServer.Serve(lis);err!=nil{
		log.Fatalf("failed to serve %v",err)
	}
}
