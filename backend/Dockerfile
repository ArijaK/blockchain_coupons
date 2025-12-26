FROM node:lts-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install 

COPY . .

EXPOSE 8000

# To keep it running, as now there is no server to run, just test scripts
ENTRYPOINT ["tail", "-f", "/dev/null"]