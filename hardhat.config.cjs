require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    solidity: {
        compilers: [
            { version: "0.8.30", settings: { evmVersion: "paris" } },
            { version: "0.5.9", settings: { evmVersion: "petersburg" } }
        ]
    },
    networks: {
        localhost: { url: "http://127.0.0.1:8545" }
    }
};
