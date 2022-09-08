docker run -d \
  --restart always \
  --name coredns \
  -p 53:53/tcp \
  -p 53:53/udp \
  -v $(pwd)/hosts:/etc/hosts \
  -v $(pwd)/coredns/Corefile:/Corefile \
  coredns/coredns

