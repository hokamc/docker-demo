docker service create \
    --replicas=3 \
    --name webapp \
    -p 8000:3000 \
    docker-demo/express-app:latest