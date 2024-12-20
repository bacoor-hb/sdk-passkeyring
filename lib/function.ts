import { GROUP_SLUG, infoGroup } from 'lib/constants'
import { MyCustomWalletProvider } from 'lib/web3'

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}
interface ProviderMessage {
  readonly type: string;
  readonly data: unknown;
}

export function onPageLoad (config:any) {
  if (typeof window === 'undefined') {
    return
  }
  const provider = new MyCustomWalletProvider({ config })
  window.ethereum = provider
  function announceProvider () {
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
      announceProvider()
    },
  )

  announceProvider()
  setTimeout(() => {
    window.dispatchEvent(new Event('eip6963:requestProvider'))
  }, 500)
}

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

export const isObject = (data:any, checkEmpty = false) => {
  const isObj = data && typeof data === 'object'
  return checkEmpty
    ? isObj && Object.keys(data).length > 0
    : isObj
}
