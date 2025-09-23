global mod shortcut=go mod init github.com/RedHat007-rgb/hft-phase-1-23rd/

inside apps/\*\*-service=go mod init github.com/RedHat007-rgb/hft-phase-1-23rd/apps/go-services/

command for creating proto folder:protoc --go_out=. --go-grpc_out=. --proto_path=../../../packages/proto ticker.proto
