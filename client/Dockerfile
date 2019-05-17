FROM node as builder
#ENV API_BASE_URL /api
#ENV USE_FAKE false
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
