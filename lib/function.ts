import { GROUP_SLUG, infoGroup } from 'lib/constants'
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
    const info: EIP6963ProviderInfo = infoGroup[GROUP_SLUG]
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
