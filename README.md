# Set-up
1) Clone: `git clone https://github.com/ArijaK/blockchain_coupons.git`
2) Navigate to folder: `cd blockchain_coupons`

# Build
1) build (~3 min): `docker compose build`

# Run 
2) spin up: `docker compose up`
3) Witness:
    * start.sh is called
        * Compiles code
        * Hosts something
        * Runs deploy.js
        * Saves address at "/app/deployedAddress.txt"
        * Runs interact.js
    * interact.js does some interaction automatically (if you want to do it manually, then [Run in another reality](#run-in-another-reality))

# Run in another reality
2) commented `npx hardhat run scripts/interact.js --network localhost` out in start.sh 
3) spin up, detach: `docker compose up -d`
4) attach, start communication: `docker exec -it ecoupons-dev npx hardhat console --network localhost` --> opens JS console, which you might remember from 1st year :)
5) Write one after another:
    * `const MyContract = await ethers.getContractFactory("MyContract");`
    * const contract = await MyContract.attach("YourDeployedContractAddress"); => it is saved in "/app/deployedAddress.txt" inside of container
    * `const current = await greeter.greeting();`
    * `console.log(current);`  -> should print "Hello, world!"
6) I do not know what you just did, but congratulations :)

# Develop
* Currently after each changes, one has to [build](#build) docker again, check the effect
    * it could be avoided by adding "mount" in docker-compose.yml file, but i am not ready to do it now

# Debug
* check docker containers: `docker ps`
* entering in image if container does not exist (laikam:)): `docker compose run --rm --entrypoint bash ecoupons-dev`
* check logs (why failed / did not return anything): `docker compose logs ecoupons-dev`
* Clean install
    * `docker compose down --remove-orphans`
    * `docker builder prune --all --force`
    * `docker compose build --no-cache`

# Exit stuff:
* Usually `Ctrl + C` or `Ctrl + Z` should work, if not might try `q`, but at some point killing terminal might be The Option 




