import dotenv from "dotenv";
import { ethers } from "ethers";
import { Coupons__factory } from "../types/ethers-contracts/factories/Coupons__factory.js";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const coupons = Coupons__factory.connect(
  process.env.COUPON_ADDRESS!,
  signer
);