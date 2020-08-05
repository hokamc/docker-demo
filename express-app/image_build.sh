VERSION=1

docker image rm $(docker images -q docker-demo/express-app | tail -n +3) || true

docker image build \
    -t docker-demo/express-app:$VERSION \
    .

docker image tag \
    docker-demo/express-app:$VERSION \
    docker-demo/express-app:latest