export interface TransferSingleEvent {
  operator: string;
  from: string;
  to: string;
  id: bigint;
  value: bigint;
}

export interface TransferBatchEvent {
  operator: string;
  from: string;
  to: string;
  ids: bigint[];
  values: bigint[];
}
