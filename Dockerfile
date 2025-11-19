FROM node:22-slim

WORKDIR /app

RUN apt-get update && apt-get install -y git build-essential curl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --legacy-peer-deps --force

COPY . .

RUN chmod +x start.sh

EXPOSE 8545 3000

ENTRYPOINT ["/app/start.sh"]
