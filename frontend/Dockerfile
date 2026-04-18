#-------Stage-1(Builder)--------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY  . .
RUN npm run build 
#--------stage-2(Production)---------
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80