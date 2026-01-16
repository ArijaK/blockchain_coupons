import { coupons } from "../services/blockchain.js";
import { handleTransferSingle } from "./handleTransferSingle.js";
import { handleTransferBatch } from "./handleTransferBatch.js";

export function startIndexer() {

  coupons.on(
    coupons.filters.TransferSingle(), 
    async (operator, from, to, id, value, event) => {
      console.log("TransferSingle", { from, to, id: id.toString(), value: value.toString() });
      await handleTransferSingle({
        operator,
        from,
        to,
        id,
        value
    });
    }
  );

  coupons.on(
    coupons.filters.TransferBatch(), 
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

