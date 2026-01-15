import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common.js";
export interface CouponsInterface extends Interface {
    getFunction(nameOrSignature: "addIssuer" | "addRedeemers" | "balanceOf" | "balanceOfBatch" | "couponIDCounter" | "isAllowedRedeemer" | "isApprovedForAll" | "isIssuer" | "mint" | "owner" | "redeem" | "renounceOwnership" | "safeBatchTransferFrom" | "safeTransferFrom" | "setApprovalForAll" | "supportsInterface" | "transferOwnership" | "uri"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll" | "OwnershipTransferred" | "TransferBatch" | "TransferSingle" | "URI"): EventFragment;
    encodeFunctionData(functionFragment: 'addIssuer', values: [AddressLike]): string;
    encodeFunctionData(functionFragment: 'addRedeemers', values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: 'balanceOf', values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: 'balanceOfBatch', values: [AddressLike[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: 'couponIDCounter', values?: undefined): string;
    encodeFunctionData(functionFragment: 'isAllowedRedeemer', values: [AddressLike]): string;
    encodeFunctionData(functionFragment: 'isApprovedForAll', values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: 'isIssuer', values: [AddressLike]): string;
    encodeFunctionData(functionFragment: 'mint', values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
    encodeFunctionData(functionFragment: 'redeem', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'renounceOwnership', values?: undefined): string;
    encodeFunctionData(functionFragment: 'safeBatchTransferFrom', values: [AddressLike, AddressLike, BigNumberish[], BigNumberish[], BytesLike]): string;
    encodeFunctionData(functionFragment: 'safeTransferFrom', values: [AddressLike, AddressLike, BigNumberish, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: 'setApprovalForAll', values: [AddressLike, boolean]): string;
    encodeFunctionData(functionFragment: 'supportsInterface', values: [BytesLike]): string;
    encodeFunctionData(functionFragment: 'transferOwnership', values: [AddressLike]): string;
    encodeFunctionData(functionFragment: 'uri', values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: 'addIssuer', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'addRedeemers', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'balanceOfBatch', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'couponIDCounter', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isAllowedRedeemer', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isApprovedForAll', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isIssuer', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'mint', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'redeem', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'renounceOwnership', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'safeBatchTransferFrom', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'safeTransferFrom', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'setApprovalForAll', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'transferOwnership', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'uri', data: BytesLike): Result;
}
export declare namespace ApprovalForAllEvent {
    type InputTuple = [account: AddressLike, operator: AddressLike, approved: boolean];
    type OutputTuple = [account: string, operator: string, approved: boolean];
    interface OutputObject {
        account: string;
        operator: string;
        approved: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OwnershipTransferredEvent {
    type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
    type OutputTuple = [previousOwner: string, newOwner: string];
    interface OutputObject {
        previousOwner: string;
        newOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TransferBatchEvent {
    type InputTuple = [operator: AddressLike, from: AddressLike, to: AddressLike, ids: BigNumberish[], values: BigNumberish[]];
    type OutputTuple = [operator: string, from: string, to: string, ids: bigint[], values: bigint[]];
    interface OutputObject {
        operator: string;
        from: string;
        to: string;
        ids: bigint[];
        values: bigint[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TransferSingleEvent {
    type InputTuple = [operator: AddressLike, from: AddressLike, to: AddressLike, id: BigNumberish, value: BigNumberish];
    type OutputTuple = [operator: string, from: string, to: string, id: bigint, value: bigint];
    interface OutputObject {
        operator: string;
        from: string;
        to: string;
        id: bigint;
        value: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace URIEvent {
    type InputTuple = [value: string, id: BigNumberish];
    type OutputTuple = [value: string, id: bigint];
    interface OutputObject {
        value: string;
        id: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Coupons extends BaseContract {
    connect(runner?: ContractRunner | null): Coupons;
    waitForDeployment(): Promise<this>;
    interface: CouponsInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addIssuer: TypedContractMethod<[
        account: AddressLike
    ], [
        void
    ], 'nonpayable'>;
    addRedeemers: TypedContractMethod<[
        redeemers: AddressLike[]
    ], [
        void
    ], 'nonpayable'>;
    balanceOf: TypedContractMethod<[
        account: AddressLike,
        id: BigNumberish
    ], [
        bigint
    ], 'view'>;
    balanceOfBatch: TypedContractMethod<[
        accounts: AddressLike[],
        ids: BigNumberish[]
    ], [
        bigint[]
    ], 'view'>;
    couponIDCounter: TypedContractMethod<[
    ], [
        bigint
    ], 'view'>;
    isAllowedRedeemer: TypedContractMethod<[
        arg0: AddressLike
    ], [
        boolean
    ], 'view'>;
    isApprovedForAll: TypedContractMethod<[
        account: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], 'view'>;
    isIssuer: TypedContractMethod<[
        arg0: AddressLike
    ], [
        boolean
    ], 'view'>;
    mint: TypedContractMethod<[
        to: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], 'nonpayable'>;
    owner: TypedContractMethod<[
    ], [
        string
    ], 'view'>;
    redeem: TypedContractMethod<[
        couponID: BigNumberish
    ], [
        void
    ], 'nonpayable'>;
    renounceOwnership: TypedContractMethod<[
    ], [
        void
    ], 'nonpayable'>;
    safeBatchTransferFrom: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        ids: BigNumberish[],
        values: BigNumberish[],
        data: BytesLike
    ], [
        void
    ], 'nonpayable'>;
    safeTransferFrom: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        id: BigNumberish,
        value: BigNumberish,
        data: BytesLike
    ], [
        void
    ], 'nonpayable'>;
    setApprovalForAll: TypedContractMethod<[
        operator: AddressLike,
        approved: boolean
    ], [
        void
    ], 'nonpayable'>;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], 'view'>;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], 'nonpayable'>;
    uri: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        string
    ], 'view'>;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: 'addIssuer'): TypedContractMethod<[
        account: AddressLike
    ], [
        void
    ], 'nonpayable'>;
    getFunction(nameOrSignature: 'addRedeemers'): TypedContractMethod<[
        redeemers: AddressLike[]
    ], [
        void
    ], 'nonpayable'>;
    getFunction(nameOrSignature: 'balanceOf'): TypedContractMethod<[
        account: AddressLike,
        id: BigNumberish
    ], [
        bigint
    ], 'view'>;
    getFunction(nameOrSignature: 'balanceOfBatch'): TypedContractMethod<[
        accounts: AddressLike[],
        ids: BigNumberish[]
    ], [
        bigint[]
    ], 'view'>;
    getFunction(nameOrSignature: 'couponIDCounter'): TypedContractMethod<[
    ], [
        bigint
    ], 'view'>;
    getFunction(nameOrSignature: 'isAllowedRedeemer'): TypedContractMethod<[
        arg0: AddressLike
    ], [
        boolean
    ], 'view'>;
    getFunction(nameOrSignature: 'isApprovedForAll'): TypedContractMethod<[
        account: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], 'view'>;
    getFunction(nameOrSignature: 'isIssuer'): TypedContractMethod<[
        arg0: AddressLike
    ], [
        boolean
    ], 'view'>;
    getFunction(nameOrSignature: 'mint'): TypedContractMethod<[
        to: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], 'nonpayable'>;
    getFunction(nameOrSignature: 'owner'): TypedContractMethod<[
    ], [
        string
    ], 'view'>;
    getFunction(nameOrSignature: 'redeem'): TypedContractMethod<[
        couponID: BigNumberish
    ], [
        void
    ], 'nonpayable'>;
    getFunction(nameOrSignature: 'renounceOwnership'): TypedContractMethod<[
    ], [
        void
    ], 'nonpayable'>;
    getFunction(nameOrSignature: 'safeBatchTransferFrom'): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        ids: BigNumberish[],
        values: BigNumberish[],
        data: BytesLike
    ], [
        void
    ], 'nonpayable'>;
    getFunction(nameOrSignature: 'safeTransferFrom'): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        id: BigNumberish,
        value: BigNumberish,
        data: BytesLike
    ], [
        void
    ], 'nonpayable'>;
    getFunction(nameOrSignature: 'setApprovalForAll'): TypedContractMethod<[
        operator: AddressLike,
        approved: boolean
    ], [
        void
    ], 'nonpayable'>;
    getFunction(nameOrSignature: 'supportsInterface'): TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], 'view'>;
    getFunction(nameOrSignature: 'transferOwnership'): TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], 'nonpayable'>;
    getFunction(nameOrSignature: 'uri'): TypedContractMethod<[
        arg0: BigNumberish
    ], [
        string
    ], 'view'>;
    getEvent(key: 'ApprovalForAll'): TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
    getEvent(key: 'OwnershipTransferred'): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: 'TransferBatch'): TypedContractEvent<TransferBatchEvent.InputTuple, TransferBatchEvent.OutputTuple, TransferBatchEvent.OutputObject>;
    getEvent(key: 'TransferSingle'): TypedContractEvent<TransferSingleEvent.InputTuple, TransferSingleEvent.OutputTuple, TransferSingleEvent.OutputObject>;
    getEvent(key: 'URI'): TypedContractEvent<URIEvent.InputTuple, URIEvent.OutputTuple, URIEvent.OutputObject>;
    filters: {
        'ApprovalForAll(address,address,bool)': TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        ApprovalForAll: TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        'OwnershipTransferred(address,address)': TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        'TransferBatch(address,address,address,uint256[],uint256[])': TypedContractEvent<TransferBatchEvent.InputTuple, TransferBatchEvent.OutputTuple, TransferBatchEvent.OutputObject>;
        TransferBatch: TypedContractEvent<TransferBatchEvent.InputTuple, TransferBatchEvent.OutputTuple, TransferBatchEvent.OutputObject>;
        'TransferSingle(address,address,address,uint256,uint256)': TypedContractEvent<TransferSingleEvent.InputTuple, TransferSingleEvent.OutputTuple, TransferSingleEvent.OutputObject>;
        TransferSingle: TypedContractEvent<TransferSingleEvent.InputTuple, TransferSingleEvent.OutputTuple, TransferSingleEvent.OutputObject>;
        'URI(string,uint256)': TypedContractEvent<URIEvent.InputTuple, URIEvent.OutputTuple, URIEvent.OutputObject>;
        URI: TypedContractEvent<URIEvent.InputTuple, URIEvent.OutputTuple, URIEvent.OutputObject>;
    };
}
//# sourceMappingURL=Coupons.d.ts.map