import hre from "hardhat";
import fs from "fs";

async function main() {
    const address = fs.readFileSync("/app/deployedAddress.txt", "utf8");
    console.log("Address in file:", address.trim())
    const greeter = await hre.ethers.getContractAt("HelloWorld", address.trim());

    console.log("Current greeting:", await greeter.greeting());
    await greeter.setGreeting("Hi there!");
    console.log("Updated greeting:", await greeter.greeting());
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
