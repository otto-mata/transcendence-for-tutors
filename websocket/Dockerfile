ARG NODE_VERSION=24.11.1-alpine
FROM node:${NODE_VERSION}

COPY ./ /server/

WORKDIR /server/

RUN npm i && npm run build

CMD ["npm", "run", "start"]
