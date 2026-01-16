import { handleTransferSingle } from "./handleTransferSingle.js";
import { type TransferBatchEvent } from "./types.js";

export async function handleTransferBatch(event: TransferBatchEvent) {
  const { operator, from, to, ids, values } = event;

  for (let i = 0; i < ids.length; i++) {
    await handleTransferSingle({
      operator,
      from,
      to,
      /// NOTE: There must be an id and value, right?
      id: ids[i]!,
      value: values[i]!
    });
  }
}
