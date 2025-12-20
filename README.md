# Warning! Due to framework updates, some guides written here will soon be outdated and rewritten to newer ones

# Set-up
1) Clone: `git clone https://github.com/ArijaK/blockchain_coupons.git`
2) Navigate to folder: `cd blockchain_coupons`

# All
1) Make sure you are inside `blockchain_coupons/`
2) To set upp all docker containers (currently backend and blockchain), call `docker-compose up --build` or `docker-compose up --build -d` to get it in "detached" mode
3) Access  
    3.1) Frontend might be at: `http://localhost:5500` (untested!)  
    3.2) Backend at: `http://localhost:8000` 


# Solidity

## Work option_1: If you want to avoid using Docker for quick tests and stuff
You can use VSCode with Solidity (Wake) extension or (probably) any other code editor (VSCode too) together with Wake framework. Wake framework can be obtained by simply running `pip install eth-wake` in your terminal. Please pay attention to write exactly `eth-wake`, not `wake`, as `wake` is a completely different project.

In case you cannot deploy contracts, make sure you have installed Anvil. Installation guides can be found [here](https://getfoundry.sh/introduction/installation/).

To be able to import from OpenZeppelin (these imports are present in contracts), you shall install necessary dependencies by running:

    npm install

To run tests, simply run (make sure you have ran `wake up` before this):

    wake test tests/test_example.py

Or if you want to test contracts via VSCode Solidity (Wake) extension, open Solidity: Deploy & Interact tab, click 'Compile all' and deploy necessary contracts. Then switch to 'Interact' section and do necessary interactions. Make sure you are inside `blockchain_coupons/blockchain/` directory before you proceed, otherwise you might not be able to do the testing. 

## Work option_2:

### Build
1) Make sure you are inside `blockchain_coupons/blockchain/`
2) build (~3 min): `docker build -t wake-env .`  

### Run_1 
2) enter bash: `docker run -it --rm wake-env`
3) inside, run anvil in background: `anvil &` (then press enter, to move to new line)
4) run tests: `wake test tests/test_initial.py`


### Develop (not updated)
* Currently after each changes, one has to [build](#build) docker again, check the effect
    * it could be avoided by adding "mount" in docker-compose.yml file, but i am not ready to do it now

### Debug (not updated)
* check docker containers: `docker ps`
* entering in image if container does not exist (laikam:)): `docker compose run --rm --entrypoint bash ecoupons-dev`
* check logs (why failed / did not return anything): `docker compose logs ecoupons-dev`
* Clean install
    * `docker compose down --remove-orphans`
    * `docker builder prune --all --force`
    * `docker compose build --no-cache`

### Exit (docker) stuff:
* Usually `Ctrl + C` or `Ctrl + Z` should work, if not might try `q`, but at some point killing terminal might be The Option 

# Frontend

* Code currently organized in `frontend` folder in 3 files, might create new files to split logic later.
* Frontend currently calls "dummy" functions, which allows to work on it, ignoring the rest of development (good)
* Open on web by clicking on `index.html` in `File explorer`
