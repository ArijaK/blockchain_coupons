import dotenv from "dotenv";
import { Client } from "pg";
import { ethers } from "ethers";

// Load configuration from .env file
dotenv.config();

async function checkPostgres() {
  console.log("Connecting to Postgres via ", process.env.DATABASE_URL);
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    const result = await client.query("SELECT NOW()");
    console.log("Postgres OK:", result.rows[0]);
  } catch (err) {
    console.error("Postgres ERROR:\n", err);
  } finally {
    await client.end();
  }
}

async function checkBlockchain() {
  console.log("Connecting to blockchain via ", process.env.RPC_URL);

  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    const blockNumber = await provider.getBlockNumber();
    const network = await provider.getNetwork();
    const accounts = await provider.listAccounts();

    console.log("Blockchain OK:");
    console.log("  Block number:", blockNumber);
    console.log("  Chain ID:", network.chainId);
    console.log("  First account:", accounts[0]);
  } catch (err) {
    console.error("Blockchain ERROR:\n", err);
  }
}

async function main() {
  await checkPostgres();
  await checkBlockchain();
}

main();
