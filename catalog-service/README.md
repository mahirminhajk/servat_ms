# Catalog Service - Servat

# docker build
```bash
docker build -f infra/docker/Dockerfile -t mahirminhajk/s.catalog .
```

# RabbitMQ

- run the rabbitmq in docker
```bash
docker run -d --hostname my-rabbit --name some-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

- reuse the rabbitmq
```bash
docker start some-rabbit
```