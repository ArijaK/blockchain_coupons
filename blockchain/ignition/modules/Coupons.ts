import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CouponsModule", (m) => {
  const counter = m.contract("Coupons");

  return { counter };
});
