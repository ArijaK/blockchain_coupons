import { coupons } from "../services/blockchain.js";
import { handleTransferSingle } from "./handlers/handleTransferSingle.js";
import { handleTransferBatch } from "./handlers/handleTransferBatch.js";

export function startIndexer() {

  coupons.on(
    coupons.filters["TransferSingle(address,address,address,uint256,uint256)"], 
    async (operator, from, to, id, value, event) => {
      try{
        await handleTransferSingle({
            operator,
            from,
            to,
            id,
            value
        });
      } catch (err) {
        console.error("Indexer handler error:", err);
      }
    }
  );

  coupons.on(
    coupons.filters["TransferBatch(address,address,address,uint256[],uint256[])"],
    async (operator, from, to, ids, values, event) => {
      await handleTransferBatch({
        operator,
        from,
        to,
        ids,
        values
      });
    }
  );

  // Operator approvals
  // coupons.on("ApprovalForAll", async (owner, operator, approved) => {
  // });

  // Metadata events
  // coupons.on("URI", async (value, id) => {
  // });

  console.log("Indexer started — listening for blockchain events");
}

