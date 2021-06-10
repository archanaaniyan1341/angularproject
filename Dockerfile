# Stage 1

FROM node:10-alpine as build-step


RUN mkdir -p /app


WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN apt-get update && apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -

RUN apt-get update && apt-get install -y nodejs


RUN npm run build --prod

# Stage 2

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/CollegeManagementSystem /usr/share/nginx/html


