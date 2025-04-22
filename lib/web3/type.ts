export interface WalletProvider {
  name: string; // Provider name
  icon: string; // URL to the provider's icon
  uuid: string; // Unique UUID
  version: string; // Provider version
  signer: any;
  isMetaMask?: boolean; // Is it MetaMask
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?(event: string, listener: (...args: any[]) => void): void;
  emit?: (event: string, ...args: any[]) => void;
}

export interface RequestArguments {
  readonly method: string;
  readonly params?: any[];
}

interface EthereumWindow extends Window {
  ethereum?: {
    providers?: WalletProvider[];
    [key: string]: any; // Additional properties
  };
}

export type EventHandler = (...args: any[]) => void;

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

export interface Caveat {
  type: string;
  value: any;
}

export interface Permission {
  invoker: string;
  parentCapability: string;
  caveats: Caveat[];
}

export interface PermissionRequest {
  [methodName: string]: {
    [caveatName: string]: any;
  };
}

export interface RequestedPermission {
  parentCapability: string;
  date?: number;
}

export interface ProviderConnectInfo {
  readonly chainId: string;
}

export type RpcUrlMap = {
  [key in number]: string
}

export type Metadata = {
  name: string;
  description: string;
  url: string;
  icons: string[];
};

export interface ProviderConfig {
  rpcUrl?: RpcUrlMap ;
  metadata?: Metadata;
}

export interface MyPasskeyWalletProviderProps {
  config?: ProviderConfig;
}
