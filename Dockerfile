FROM node

WORKDIR /imari

COPY ./package.json .
COPY ./packages/server/package.json ./packages/server/

RUN npm i -g yarn
RUN yarn install --production

COPY ./packages/server/dist ./packages/server/dist

ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "dist/index.js"]