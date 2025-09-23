package redis

import (
	"github.com/redis/go-redis/v9"
)


func ConnectToRedis() *redis.Client{
	redisClient:=redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
	return redisClient
}