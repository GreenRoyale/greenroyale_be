FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn run build

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "yarn", "run", "build/src/index.js" ]


