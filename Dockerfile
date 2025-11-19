# FROM node:18-slim

# RUN apt-get update && \
#     apt-get install -y wget gnupg ca-certificates && \
#     wget -qO /usr/share/keyrings/solidity.gpg https://soliditylang.org/debian/pubkey.gpg && \
#     echo "deb [signed-by=/usr/share/keyrings/solidity.gpg] https://soliditylang.org/debian stable main" \
#     > /etc/apt/sources.list.d/solidity.list && \
#     apt-get update && apt-get install -y solc && \
#     apt-get clean

# WORKDIR /app
# RUN npm install -g hardhat

# CMD ["bash"]

# FROM node:18-slim

# ENV DEBIAN_FRONTEND=noninteractive

# RUN apt-get update && \
#     apt-get install -y --no-install-recommends wget gnupg ca-certificates && \
#     wget -qO /usr/share/keyrings/solidity.gpg https://binaries.soliditylang.org/debian/solidity.gpg && \
#     echo "deb [signed-by=/usr/share/keyrings/solidity.gpg] https://binaries.soliditylang.org/debian stable main" \
#     > /etc/apt/sources.list.d/solidity.list && \
#     apt-get update && \
#     apt-get install -y --no-install-recommends solc && \
#     apt-get clean && rm -rf /var/lib/apt/lists/*

# FROM node:18-slim

# WORKDIR /app
# RUN npm install -g hardhat
# COPY package*.json ./
# RUN npm install


FROM node:18-slim

WORKDIR /app
RUN npm install -g hardhat

CMD ["bash"]
