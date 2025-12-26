import dotenv from "dotenv";
import { ethers } from "ethers";
import couponJSON from "../../blockchain/artifacts/contracts/Coupons.sol/Coupons.json" with { type: "json" };

dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const coupons = new ethers.Contract(
    process.env.COUPON_ADDRESS!,
    couponJSON.abi,
    signer
  );

  console.log("Calling mint...");
  const transaction = await coupons.mint(await signer.getAddress(), 1);
  console.log("Mint transaction hash:", transaction.hash);

  const receipt = await transaction.wait();
  console.log("Mint confirmed in block:", receipt.blockNumber);
  console.log("Mint status:", receipt.status);

}

main().catch(console.error);

