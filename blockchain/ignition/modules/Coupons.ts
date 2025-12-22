import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CouponsModule", (m) => {
  const counter = m.contract("Coupon1155");

  return { counter };
});
