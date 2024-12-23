export type Code = Uint8Array;
export type Address = `0x${string}`;
export type Stack = bigint[];
export type Calldata = Uint8Array;
export type ReturnedData = Uint8Array;
export type Memory = Uint8Array;
export type UncommittedStorage = Map<bigint, bigint>;
export type UncommittedBalance = Map<Address, bigint>;

export interface AsyncStorage {
  getStorageAt(address: Address, key: bigint): Promise<bigint>;
  getCodeBytes(address: Address): Promise<Code>;
  getBalance(address: Address): Promise<bigint>;
  commitStorage(address: Address, diff: { storage: UncommittedStorage; balance: UncommittedBalance }): Promise<void>;
  commitCode(address: Address, code: Code): Promise<void>;
}

export type PreCompiledContract = (input: Uint8Array) => Uint8Array;

export interface ExecutionEnvironment {
  storage: AsyncStorage;
  precompiles: Record<Address, PreCompiledContract>;
}

export interface InternalTransaction {
  from: Address;
  to: Address;
  origin: Address;
  value: bigint;
  calldata: Calldata;
  gasLimit: bigint;
  gasPrice: bigint;
}

export type ExecutionContextType = "call" | "delegatecall" | "staticcall";

export interface ExecutionContextState {
  pc: number;
  stack: Stack;
  memory: Memory;
  storage: UncommittedStorage;
  gasUsed: bigint;
}

export interface ExecutionContextInput {
  type: ExecutionContextType;
  transaction: InternalTransaction;
  code: Code;
  returnedData: ReturnedData | null;
}

export interface ExecutionContextResult {
  states: ExecutionContextState[];
  gasUsed: bigint;
  logs: { topics: Uint8Array[]; data: Uint8Array }[];
  returnedData: ReturnedData | null;
  revertData: Uint8Array | null;
  selfdestructed: Address | null;
}
