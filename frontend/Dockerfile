FROM node:20-alpine AS build
WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./
RUN npm install --ignore-scripts

COPY . .
RUN npm install -g vite@4.4.5

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN vite build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
