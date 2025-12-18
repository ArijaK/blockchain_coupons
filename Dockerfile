# =========================
# Stage 1: Build stage
# =========================
FROM ubuntu:22.04 AS build-stage

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y python3 python3-pip git curl build-essential \
    && rm -rf /var/lib/apt/lists/*

# Node + npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash \
    && apt-get install -y nodejs

# Foundry / Anvil
RUN curl -L https://foundry.paradigm.xyz | bash \
    && /root/.foundry/bin/foundryup
ENV PATH="/root/.foundry/bin:${PATH}"

# Wake / pytypes
RUN pip3 install eth-wake

# Compile contracts & generate pytypes
COPY blockchain /app/blockchain
WORKDIR /app/blockchain

# Install OpenZeppelin contracts via npm
RUN npm init -y
RUN npm install @openzeppelin/contracts

RUN wake compile
RUN wake up

# =========================
# Stage 2: Blockchain runtime image
# =========================
FROM ubuntu:22.04 AS blockchain-stage
WORKDIR /app/blockchain

COPY --from=build-stage /app/blockchain /app/blockchain
COPY --from=build-stage /root/.foundry /root/.foundry

RUN apt-get update && apt-get install -y python3 python3-pip git curl build-essential \
    && rm -rf /var/lib/apt/lists/*


RUN pip3 install eth-wake


ENV PATH="/root/.foundry/bin:${PATH}"
# CMD ["anvil"]
CMD ["wake", "up"]


# =========================
# Stage 3: Backend runtime image
# =========================
FROM ubuntu:22.04 AS backend-stage
RUN apt-get update && apt-get install -y python3 python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /backend
COPY --from=build-stage /app/blockchain/pytypes /app/blockchain/pytypes

ENV PYTHONPATH=/app/blockchain/pytypes
COPY backend/requirements.txt .
RUN pip3 install -r requirements.txt
COPY backend /backend

CMD ["uvicorn", "run:app", "--host", "0.0.0.0", "--port", "8000"]
