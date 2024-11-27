# FROM node:18.12.1 as build-stage

# WORKDIR /app

# COPY package.json ./

# RUN npm install -g pnpm \
#     && npm config set registry https://registry.npmmirror.com

# RUN pnpm install

# RUN pnpm run build

FROM nginx:1.21.6-alpine

ENV TZ=Asia/Shanghai

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist /usr/share/nginx/html