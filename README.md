<p align="center">
  <a href="" rel="noopener">
 <img src="https://www.kiratech.it/hs-fs/hubfs/LP/Prodotto/docker%20logo.png?width=434&height=387&name=docker%20logo.png"  width="200" alt="Git"></a>
</p>
<h1 align="center">Docker Demo</h1>

<div align="center">

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)]()
[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

<p align="center"> 
A demo project that implement High Availability of application through docker and docker compose
<br></p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Create a simple web service](#create-a-simple-web-service)
- [Build docker image](#build-docker-image)
- [High Availability by docker and nginx](#high-availability-by-docker-and-nginx)
- [High Availability by docker compose](#high-availability-by-docker-compose)
- [Authors](#authors)

## Create a simple web service

A simple express app with typescript which port is 3000. <br>

| path | response       |
| ---- | -------------- |
| /    | IP information |

> Example: You send request from YOUR_IP | LOAD_BALANCER_IP to SERVER_IP

## Build docker image

Create a dockerfile and build image

```Dockerfile
FROM node:alpine3.12

WORKDIR /opt/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY . .
RUN yarn build

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]
```
>**node:apline** is our base image which is minimal Docker image based on Alpine Linux installed with node dependencies.
- **FROM** *indicate base image*
- **WORKDIR** *create a directory and set as current directory*
- **RUN** *run command in shell during build*
- **COPY** *copy files*
- **EXPOSE** *expose port for container*
- **ENTRYPOINT** *command run when start*

## High Availability by docker and nginx

Run multiple containers of app in same network and distribute requests by nginx load balancer.

```bash
NUMBER_OF_INSTANCE=3
docker network create --driver bridge webapp_network || true 
for i in $(seq 1 $NUMBER_OF_INSTANCE);
    do docker container run -d --name webapp$i --network webapp_network docker-demo/express-app:latest;
done
docker run -d -p 8000:80 --name webapp_proxy --network webapp_network -v $PWD/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx:alpine
```

3 containers of web app and 1 container of nginx will be started and connected together with a bridge network *webapp_network*

```conf
events {}

http {
    upstream webappgroup {
        server webapp1:3000;
        server webapp2:3000;
        server webapp3:3000;
    }

    server {
        listen 80;
        server_name webapp;
        location / {
            proxy_pass http://webappgroup;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

- **upstream** *a cluster of server for proxy*
- **location** *direct request based on url*

All requests will be directed to different servers such as webapp1,2,3 equally

## High Availability by docker compose


## Authors

- [@hokamc](https://github.com/hokamc)

