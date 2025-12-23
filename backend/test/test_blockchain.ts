import dotenv from "dotenv";
import { ethers } from "ethers";
import couponJSON from "../../blockchain/artifacts/contracts/Coupons.sol/Coupons.json" with { type: "json" };

dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const signer = await provider.getSigner();

  const coupons = new ethers.Contract(
    process.env.COUPON_ADDRESS!,
    couponJSON.abi,
    signer
  );

  console.log("Calling mint...");
  const tx = await coupons.mint(await signer.getAddress(), 1);
  console.log("Mint tx sent:", tx.hash);

  const receipt = await tx.wait();
  console.log("Mint confirmed in block:", receipt.blockNumber);
}

main().catch(console.error);

