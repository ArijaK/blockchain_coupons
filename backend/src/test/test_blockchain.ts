import dotenv from "dotenv";
import { ethers } from "ethers";
import { Coupons__factory } from "../types/ethers-contracts/factories/Coupons__factory.js";

dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const coupons = Coupons__factory.connect(
    process.env.COUPON_ADDRESS!,
    signer
  );

  console.log("Calling mint...");
  const transaction = await coupons.mint(await signer.getAddress(), 1);
  console.log("Mint transaction hash:", transaction.hash);

  const receipt = await transaction.wait();

  if (!receipt) { 
    throw new Error("Transaction was dropped or not mined"); 
  }

  console.log("Mint confirmed in block:", receipt.blockNumber);
  console.log("Mint status:", receipt.status);

}

main().catch(console.error);

