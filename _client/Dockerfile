FROM node as builder
ARG USE_FAKE=true
ARG API_BASE_URL=/api
ARG RELOAD_INTERVAL=10
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
ENV REACT_APP_API_BASE_URL=${API_BASE_URL}
ENV REACT_APP_USE_FAKE=${USE_FAKE}
ENV REACT_APP_RELOAD_INTERVAL=${RELOAD_INTERVAL}
RUN yarn build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
