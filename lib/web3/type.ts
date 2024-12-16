export interface WalletProvider {
  name: string; // Tên nhà cung cấp
  icon: string; // URL đến biểu tượng nhà cung cấp
  uuid: string; // UUID duy nhất
  version: string; // Phiên bản nhà cung cấp
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, handler: (...args: any[]) => void) => void;
  off: (event: string, handler: (...args: any[]) => void) => void;
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
  | undefined;
