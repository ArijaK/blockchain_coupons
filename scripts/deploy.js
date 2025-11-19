// const hre = require("hardhat");

import fs from "fs";
import hre from "hardhat";

async function main() {
    const Greeter = await hre.ethers.getContractFactory("HelloWorld");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    console.log("Greeter deployed to:", greeter.address);

    fs.writeFileSync("/app/deployedAddress.txt", greeter.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// Greeter deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// const greeter = await HelloWorld.attach("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");