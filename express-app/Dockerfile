FROM node:alpine3.12

WORKDIR /opt/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY . .
RUN yarn build

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]