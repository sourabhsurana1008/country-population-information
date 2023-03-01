FROM node:18.4.0-alpine
# create root application folder
WORKDIR /home/node/app
# copy configs to /app folder
COPY . .
RUN npm i
CMD [ "node", "./server.js" ]

