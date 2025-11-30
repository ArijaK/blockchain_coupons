FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y \
    python3 python3-pip \
    git curl build-essential \
    && rm -rf /var/lib/apt/lists/*

# Node + npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Foundry (includes anvil)
RUN curl -L https://foundry.paradigm.xyz | bash \
    && /root/.foundry/bin/foundryup

ENV PATH="/root/.foundry/bin:${PATH}"

# pytypes
ENV PYTHONPATH=/app/pytypes:$PYTHONPATH

# Wake
RUN pip3 install eth-wake

# npm deps
COPY package*.json ./
RUN npm install --legacy-peer-deps

# project files
COPY . .

# Compile contracts to generate Python bindings (pytypes)
RUN wake compile

# Set PYTHONPATH so Python can find pytypes
ENV PYTHONPATH=/app

# Default command: drop into bash for interactive use
CMD ["bash"]