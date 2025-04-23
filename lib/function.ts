import { Metadata, ProviderConfig, RpcUrlMap } from './web3/type'
import { MyPasskeyWalletProvider } from './web3'

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
import { Buffer as Buffer2 } from 'buffer'
import { chainsSupported, GROUP_SLUG, infoGroup, SDK_VERSION, STORAGE_KEY } from './constants'

if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer2
}

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
  rpcUrl?: RpcUrlMap;
  metadata?: Metadata
}

/**
 * Initializes the `MyPasskeyWalletProvider` and sets it as the `window.ethereum` provider
 * if it is not already defined. This function also listens for the `eip6963:requestProvider`
 * event and announces the provider when triggered.
 *
 * @param config - Optional configuration object for the `MyPasskeyWalletProvider`.
 *
 * Behavior:
 * - If executed in a non-browser environment (`window` is undefined), the function exits early.
 * - Creates a new instance of `MyPasskeyWalletProvider` with the provided configuration.
 * - If `window.ethereum` is not already defined, assigns the created provider to `window.ethereum`.
 * - Defines and dispatches a custom event `eip6963:announceProvider` with provider details.
 * - Listens for the `eip6963:requestProvider` event and re-announces the provider when triggered.
 */
export function onPageLoad (config?: ProviderConfig) {
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

/**
 * Creates a Wallet Passkey client instance with the specified configuration.
 *
 * @param config - Optional configuration object for the provider client.
 *   - `chainId` (optional): The chain ID to connect to. Defaults to '0x1' if not provided.
 *
 * @returns A Wallet client instance configured with the specified chain and transport.
 */
export const createWalletPasskeyClient = (config?: ProviderClientConfig) => {
  const client = createWalletClient({
    chain: convertChainIdToChainView(config?.chainId || '0x1'),
    transport: custom(new MyPasskeyWalletProvider({ config })),
  })
  return client
}

/**
 * Encodes the given data into a Base64-encoded string.
 *
 * @param data - The data to be encoded. It can be of any type, but it is typically an object or string.
 * @returns A Base64-encoded string representation of the input data. Returns an empty string if the input is falsy or an error occurs during encoding.
 *
 * @remarks
 * The function first converts the input data into a JSON string, then encodes it using Base64.
 * If an error occurs during the encoding process, it logs the error and returns an empty string.
 *
 * @example
 * ```typescript
 * const encoded = encodeBase64({ key: 'value' });
 * console.log(encoded); // Outputs a Base64 string
 * ```
 */
export function encodeBase64 (data: any): string {
  try {
    if (data) {
      return Buffer.from(JSON.stringify(data)).toString('base64')
    } else {
      return ''
    }
  } catch (error) {
    console.error('encodeBase64 error:', { error, data })
    return ''
  }
}
/**
 * Decodes a Base64-encoded string into its original UTF-8 string representation.
 * If the decoding or JSON parsing fails, the original input is returned.
 *
 * @param encodedData - The Base64-encoded string to decode. Can be of any type.
 * @returns The decoded string if successful, or the original input if decoding fails.
 */
export function decodeBase64 (encodedData?: any): string | undefined {
  try {
    return JSON.parse(Buffer.from(encodedData!, 'base64').toString('utf-8'))
  } catch {
    return encodedData
  }
}

/**
 * Checks if the given data is an object. Optionally, it can also check if the object is not empty.
 *
 * @param data - The value to check.
 * @param checkEmpty - If `true`, the function will also verify that the object has at least one key. Defaults to `false`.
 * @returns `true` if the data is an object (and non-empty if `checkEmpty` is `true`), otherwise `false`.
 */
export const isObject = (data: any, checkEmpty = false) => {
  const isObj = data && typeof data === 'object'
  return checkEmpty ? isObj && Object.keys(data).length > 0 : isObj
}

/**
 * Retrieves the SDK version as a string, optionally including the package name or group slug as a prefix.
 *
 * @param includesNamePackage - A boolean indicating whether to include the package name (or group slug in case of an error) as a prefix in the returned version string. Defaults to `true`.
 * @returns The SDK version string, optionally prefixed with the package name or group slug.
 *
 * @throws Will attempt to read the `package.json` file to retrieve the package name. If an error occurs, it falls back to using a default group slug.
 */
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
/**
 * Converts a given chain ID to its corresponding chain view object.
 *
 * @param chainId - The chain ID to convert. Must be one of the supported chain IDs
 *                  defined in `chainsSupported`.
 * @returns The corresponding `Chain` object for the provided chain ID. If the
 *          chain ID is not found, it defaults to returning the `mainnet` chain.
 */
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

/**
 * Pauses the execution of an asynchronous function for a specified duration.
 *
 * @param milliseconds - The number of milliseconds to wait before resolving the promise.
 *                        If undefined or 0, the function resolves immediately.
 * @returns A promise that resolves after the specified duration.
 */
export const sleep = (milliseconds: number | undefined) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds || 0))
}

/**
 * Checks if a Web3 provider is injected into the browser environment.
 *
 * This function determines whether the `window` object is defined and
 * whether the `ethereum` property exists on the `window` object, which
 * indicates the presence of a Web3 provider (e.g., MetaMask).
 *
 * @returns {boolean} `true` if a Web3 provider is injected, otherwise `false`.
 */
export const isWeb3Injected = () => {
  return (
    typeof window !== 'undefined' && typeof window?.ethereum !== 'undefined'
  )
}

/**
 * Retrieves the URL for the passkey service based on the environment mode stored in localStorage.
 *
 * - If the `MODE_ENV_PASSKEY` key in localStorage is set to `'development'`, it returns the development URL: `'https://pass.w3w.app'`.
 * - If the `MODE_ENV_PASSKEY` key is set to any other value, it returns that value as the URL.
 * - If the `MODE_ENV_PASSKEY` key is not set or an error occurs, it defaults to `'https://smart.keyring.app'`.
 *
 * @returns {string} The URL for the passkey service.
 */
export const getURLPasskey = () => {
  try {
    const modeEnv = localStorage.getItem(STORAGE_KEY.MODE_ENV_PASSKEY)
    if (modeEnv) {
      if (modeEnv === 'development') {
        return 'https://pass.w3w.app'
      } else {
        return modeEnv
      }
    } else {
      return 'https://smart.keyring.app'
    }
  } catch (error) {
    return 'https://smart.keyring.app'
  }
}

/**
 * Compares a target version string with the current version string to determine
 * if the current version is greater than or equal to the target version.
 *
 * @param verToCheck - The target version string to compare against (e.g., "1.2.3").
 * @param verCurrent - The current version string to compare (optional). If not provided,
 *                     the function will use the `SDK_VERSION` constant as the current version.
 * @returns `true` if the current version is greater than or equal to the target version,
 *          `false` otherwise. Returns `false` if an error occurs or if `verToCheck` is invalid.
 */
export function checkVersion (verToCheck: string, verCurrent?: string): boolean {
  try {
    if (!verToCheck) return false
    const toNumberArray = (ver: string) => ver.split('.').map(Number)

    const current = toNumberArray(verCurrent || SDK_VERSION)
    const target = toNumberArray(verToCheck)

    for (let i = 0; i < 3; i++) {
      if ((current[i] ?? 0) < (target[i] ?? 0)) return false
      if ((current[i] ?? 0) > (target[i] ?? 0)) return true
    }

    return true // bằng nhau thì vẫn true
  } catch (error) {
    return false
  }
}
