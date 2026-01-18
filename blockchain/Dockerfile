FROM node:lts-alpine

WORKDIR /blockchain

RUN apk add --no-cache curl


COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .

EXPOSE 8545

CMD ["npx", "hardhat", "node", "--hostname", "0.0.0.0"]

