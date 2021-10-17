FROM node:14.18-slim AS build
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
CMD "npm" "start"

# FROM nginx:alpine
# COPY src/nginx/etc/conf.d/default.conf etc/nginx/conf/default.conf
# COPY --from=build app/dist/ICINBank usr/share/nginx/html


# # Expose port 80
# EXPOSE 80


