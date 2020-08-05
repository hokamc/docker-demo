containers=`docker container ls -q -a --filter "name=webapp*"`
docker container stop $containers
docker container rm $containers
docker network rm webapp_network