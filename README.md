# Getting Started

For more details please view each respective directory.

1) Clone: `git clone https://github.com/ArijaK/blockchain_coupons.git`

2) Navigate to the directory: `cd blockchain_coupons`

3) Access ports:
    * Frontend: `5500` (untested!)
    * Backend: `8000`
    * Blockchain: `8545` (RPC)
    * Database: `5432`

## Docker setup

Services are described in `docker-compose.yml` file. It is important to notice that environment variables are loaded from two .env files: `.env` and `./backend/.env`, which are not a part of this repository due to being gitignored, but are necessary for the project to run.

Create `.env` file in `blockchain_coupons` directory with following variables:

    POSTGRES_USER=name
    POSTGRES_PASSWORD=password
    POSTGRES_DB=database_name

Create `.env` file in `blockchain_coupons/backend/` directory with following variables:

    # Outside Docker
    DATABASE_URL=postgres://name:password@localhost:5432/database_name
    RPC_URL=http://localhost:8545/

    # Inside Docker
    DATABASE_URL=postgres://name:password@db:5432/database_name
    RPC_URL=http://blockchain:8545

    # Blockchain connection details
    # Deployed contract address (check blockchain service output after deploying contract)
    COUPON_ADDRESS=0x5fbdb2315678afecb367f032d93f642f64180aa3
    # Private key of a blockchain account (check blockchain service output)
    PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

One must be careful with the backend `.env` file. `DATABASE_URL` must not contradict `.env` file of `blockchain_coupons` directory, which means it must be in format:
    
    postgres://POSTGRES_USER:POSTGRES_PASSWORD@HOST:PORT/POSTGRES_DB

### Start all services (containers)
To set-up and start all Docker containers, call `docker-compose up --build` or `docker-compose up --build -d` to get it in "detached" mode.

### Run a command inside a running container

Open a shell to run multiple commands:

    docker exec -it container_name sh

Run a single command:

    docker exec container_name [COMMAND]


### Stop all services (containers)
To stop running all Docker containers, call `docker compose stop`.

To stop **and remove** running containers, call `docker compose down` or `docker compose down -v`, if you prefer to remove created volume (database data) too. For a full cleanup call `docker compose down --volumes --rmi all`.