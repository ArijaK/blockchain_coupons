import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  console.log("Connected to Postgres");

  await client.query(`INSERT INTO users (account_id) VALUES ('0xdf3e18d64bc6a983f673ab319ccae4f1a57c7097')`);

  const result = await client.query(`SELECT * FROM users`);
  console.log("Latest row:", result.rows[0]);

  await client.end();
}

main().catch(console.error);
