NUMBER_OF_INSTANCE=3
docker network create --driver bridge webapp_network || true 
for i in $(seq 1 $NUMBER_OF_INSTANCE);
    do docker container run -d --name webapp$i --network webapp_network docker-demo/express-app:latest;
done
docker run -d -p 8000:80 --name webapp_proxy --network webapp_network -v $PWD/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx:alpine