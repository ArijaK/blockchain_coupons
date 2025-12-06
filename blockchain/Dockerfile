FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /app

# System dependencies
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

# Wake
RUN pip3 install eth-wake

# npm deps
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Compile contracts 
RUN wake compile

# Generate Python bindings for pytypes
RUN wake up

# # Set PYTHONPATH so Python can find pytypes
# ENV PYTHONPATH=/app/pytypes:$PYTHONPATH

# Default command
CMD ["bash"]
