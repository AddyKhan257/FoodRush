#-------Stage-1(Builder)--------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
ARG REACT_APP_API_URL=http://localhost/api
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
COPY  . .
RUN npm run build 
#--------stage-2(Production)---------
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]