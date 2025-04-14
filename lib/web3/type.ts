export interface WalletProvider {
  name: string; // Tên nhà cung cấp
  icon: string; // URL đến biểu tượng nhà cung cấp
  uuid: string; // UUID duy nhất
  version: string; // Phiên bản nhà cung cấp
  signer:any;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, handler: (...args: any[]) => void) => void;
  off: (event: string, handler: (...args: any[]) => void) => void;
}

export interface RequestArguments {
  readonly method: string;
  readonly params?: any[];
}

interface EthereumWindow extends Window {
  ethereum?: {
    providers?: WalletProvider[];
    [key: string]: any; // Các thuộc tính bổ sung
  };
}

export type I_TYPE_URL =
  | 'SEND_TRANSACTION'
  | 'ACCOUNT'
  | 'NFT'
  | 'SWAP'
  | 'SWAP_NFT'
  | 'APPROVE'
  | 'PERSONAL_SIGN'
  | 'SIGN_TYPED_DATA'
  | 'SIGN_TRANSACTION'
  | 'LOGIN'
  | undefined;

export const TYPE_REQUEST: Record<
  Exclude<I_TYPE_URL, undefined>,
  I_TYPE_URL
> = {
  SEND_TRANSACTION: 'SEND_TRANSACTION',
  ACCOUNT: 'ACCOUNT',
  NFT: 'NFT',
  SWAP: 'SWAP',
  SWAP_NFT: 'SWAP_NFT',
  APPROVE: 'APPROVE',
  PERSONAL_SIGN: 'PERSONAL_SIGN',
  SIGN_TYPED_DATA: 'SIGN_TYPED_DATA',
  SIGN_TRANSACTION: 'SIGN_TRANSACTION',
  LOGIN: 'LOGIN',
}

export type I_TYPE_ERROR = 'ERROR_TRANSACTION' | undefined;

export const TYPE_ERROR: Record<
  Exclude<I_TYPE_ERROR, undefined>,
  I_TYPE_ERROR
> = {
  ERROR_TRANSACTION: 'ERROR_TRANSACTION',
}
