FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install 
RUN npm build:prod

FROM nginx:latest
COPY --from build /app/dist/* /usr/share/nginx/html
