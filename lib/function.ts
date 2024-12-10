import { MyCustomWalletProvider } from 'lib/web3'

interface Window {
  ethereum?: any;
}

interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}
interface ProviderMessage {
  readonly type: string;
  readonly data: unknown;
}

// interface EIP6963ProviderDetail {
//   info: EIP6963ProviderInfo;
//   provider: EIP1193Provider;
// }

export function onPageLoad () {
  console.log('🚀 ~ onPageLoad ~ onPageLoad:')
  const provider = new MyCustomWalletProvider()

  // window.ethereum =

  function announceProvider () {
    console.log('🚀 ~ announceProvider ~ announceProvider:')
    const info: EIP6963ProviderInfo = {
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Example Wallet',
      icon: 'data:image/svg+xml,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 32 32"><circle fill="red" cx="16" cy="16" r="12"/></svg>',
      rdns: 'com.example.wallet',
    }
    window.dispatchEvent(
      new CustomEvent('eip6963:announceProvider', {
        detail: Object.freeze({ info, provider }),
      }),
    )
  }

  window.addEventListener(
    'eip6963:requestProvider',
    (event: any) => {
      console.log('🚀 ~ onPageLoad ~ event:', event)
      announceProvider()
    },
  )

  announceProvider()
}

const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

export function encodeBase64<T> (data: T): T|string {
  try {
    return Buffer.from(JSON.stringify(data)).toString('base64')
  } catch (error) {
    return data
  }
}
export function decodeBase64 (encodedData?: any): string|undefined {
  try {
    return JSON.parse(Buffer.from(encodedData!, 'base64').toString('utf-8'))
  } catch {
    return encodedData
  }
}
