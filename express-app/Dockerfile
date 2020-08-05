FROM node:alpine3.12

WORKDIR /opt/app

COPY package.json yarn.lock /opt/app/
RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY . /opt/app
RUN yarn build

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]