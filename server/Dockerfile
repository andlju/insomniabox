FROM node
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY server.js .
EXPOSE 80
CMD ["node", "server.js"]