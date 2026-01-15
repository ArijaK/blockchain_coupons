FROM node:lts-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install 

COPY . .

EXPOSE 8000

RUN npm run build
CMD ["npm", "run", "start"]