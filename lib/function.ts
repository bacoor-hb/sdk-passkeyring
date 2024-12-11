import { GROUP_SLUG, infoGroup } from 'lib/constants'
import { MyCustomWalletProvider } from 'lib/web3'

declare global {
  interface Window {
    ethereum?: any;
  }
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

export function onPageLoad () {
  console.log('🚀 ~ onPageLoad ~ onPageLoad:')
  const provider = new MyCustomWalletProvider()

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
  const providers : any[] = []

  window.addEventListener(
    'eip6963:announceProvider',
    (event: any) => {
      providers.push(event.detail)
      window.ethereum = providers
    },
  )

  window.dispatchEvent(new Event('eip6963:requestProvider'))

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
