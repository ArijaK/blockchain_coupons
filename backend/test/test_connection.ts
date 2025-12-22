import dotenv from "dotenv";
import {Client} from "pg";
import {ethers} from "ethers";

// Load configuration from .env file
dotenv.config();

async function checkPostgres() {
  console.log("Checking Postgres connection...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    
  });

  try {
    await client.connect();
    const result = await client.query("SELECT NOW()");
    console.log("Postgres OK:", result.rows[0]);
  } catch (err) {
    console.error("Postgres ERROR:", err);
  } finally {
    await client.end();
  }
}

async function checkBlockchain() {
  console.log("Checking blockchain connection...");

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
    console.error("Blockchain ERROR:", err);
  }
}

async function main() {
  await checkPostgres();
  await checkBlockchain();
}

main();
