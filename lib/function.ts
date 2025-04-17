import {
  chainsSupported,
  GROUP_SLUG,
  infoGroup,
  RPC_DEFAULT,
  SDK_VERSION,
} from 'lib/constants'
import { MyPasskeyWalletProvider } from 'lib/web3'
import { createWalletClient, custom } from 'viem'
import {
  arbitrum,
  base,
  bsc,
  Chain,
  mainnet,
  optimism,
  polygon,
} from 'viem/chains'

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
  isDecard?: boolean;
}
interface ProviderMessage {
  readonly type: string;
  readonly data: unknown;
}

export interface ProviderClientConfig {
  chainId: (typeof chainsSupported)[number];
  rpcUrl?: typeof RPC_DEFAULT;
}

export function onPageLoad (config: any) {
  if (typeof window === 'undefined') {
    return
  }
  const provider = new MyPasskeyWalletProvider({ config })

  if (!window.ethereum) {
    window.ethereum = provider
  }
  function announceProvider () {
    const info: EIP6963ProviderInfo = infoGroup[GROUP_SLUG]
    delete info.isDecard
    window.dispatchEvent(
      new CustomEvent('eip6963:announceProvider', {
        detail: Object.freeze({ info, provider }),
      }),
    )
  }

  window.addEventListener('eip6963:requestProvider', () => {
    announceProvider()
  })

  announceProvider()
}

export const createWalletPasskeyClient = (config?: ProviderClientConfig) => {
  const client = createWalletClient({
    chain: convertChainIdToChainView(config?.chainId!),
    transport: custom(new MyPasskeyWalletProvider({ config })),
  })
  return client
}

export function encodeBase64<T> (data: T): T | string {
  try {
    return Buffer.from(JSON.stringify(data)).toString('base64')
  } catch (error) {
    return data
  }
}
export function decodeBase64 (encodedData?: any): string | undefined {
  try {
    return JSON.parse(Buffer.from(encodedData!, 'base64').toString('utf-8'))
  } catch {
    return encodedData
  }
}

export const isObject = (data: any, checkEmpty = false) => {
  const isObj = data && typeof data === 'object'
  return checkEmpty ? isObj && Object.keys(data).length > 0 : isObj
}

export const getVersionSdk = (includesNamePackage: boolean = true): string => {
  try {
    const packageJson = require('../package.json')
    const namePackage = includesNamePackage ? packageJson.name + '_' : ''
    return `${namePackage}${SDK_VERSION}`
  } catch (error) {
    const namePackage = includesNamePackage ? GROUP_SLUG + '_' : ''
    return `${namePackage}${SDK_VERSION || '2.0.0'}`
  }
}
export const convertChainIdToChainView = (
  chainId: (typeof chainsSupported)[number],
): Chain => {
  const dataChain: Record<(typeof chainsSupported)[number], Chain> = {
    '0x1': mainnet,
    '0xa': optimism,
    '0x38': bsc,
    '0x89': polygon,
    '0xa4b1': arbitrum,
    '0x2105': base,
  }
  return dataChain[chainId] || mainnet
}

export const sleep = (milliseconds: number | undefined) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds || 0))
}
