import { SlugGroup } from './type'
import { EIP6963ProviderInfo, getURLPasskey } from '../function'
// Docs    ->   https://eips.ethereum.org/EIPS/eip-6963
// Generate uuidV4  ->   https://www.uuidgenerator.net/version4

/**
 * Represents the slug identifier for a specific group.
 * This constant is used to uniquely identify the group within the system.
 */
export const GROUP_SLUG: SlugGroup = 'meteornrun'

/**
 * Represents the current version of the SDK.
 * This constant is used to track the version of the SDK being used.
 */
export const SDK_VERSION = '2.6.3'

/**
 * A constant object that maps `SlugGroup` keys to their corresponding `EIP6963ProviderInfo` details.
 *
 * Each entry in the `infoGroup` object provides metadata about a specific wallet or provider,
 * including its UUID, name, icon URL, reverse DNS (rdns), and an optional flag indicating
 * whether it is a DeCard variant.
 *
 * ### Key Details:
 * - `uuid`: A unique identifier for the wallet or provider.
 * - `name`: The display name of the wallet or provider.
 * - `icon`: A URL pointing to the icon image for the wallet or provider.
 * - `rdns`: The reverse DNS string associated with the wallet or provider.
 * - `isDecard` (optional): A boolean flag indicating if the wallet or provider is a DeCard variant.
 *
 * ### Example Entries:
 * - `egglegamewallet`: Represents the "Eggle Gamewallet" with its associated metadata.
 * - `meteornrun-decard`: Represents the "Meteorn Wallet DeCard" variant.
 * - `cyberstepwallet`: Represents the "CyberStep Wallet".
 *
 * This object is used to provide structured information about various wallets and providers
 * in the SDK.
 */
export const infoGroup: { [key in SlugGroup]: EIP6963ProviderInfo } = {
  egglegamewallet: {
    uuid: 'f5316409-9ad8-451c-8aba-90835c0a726d',
    name: 'Eggle Gamewallet',
    icon: 'https://ipfs.pantograph.app/ipfs/QmUn7MnyA9HWfHNRG7oLTweNG93ztaErFdcg36Y2uxENUu?filename=noti.png',
    rdns: 'co.bacoor.egglegamewallet',
  },
  'egglegamewallet-decard': {
    uuid: 'ff2bd4ef-d062-4a53-a9e7-7f74e85389f5',
    name: 'Eggle Gamewallet DeCard',
    icon: 'https://ipfs.pantograph.app/ipfs/QmUn7MnyA9HWfHNRG7oLTweNG93ztaErFdcg36Y2uxENUu?filename=noti.png',
    rdns: 'co.bacoor.egglegamewallet-decard',
    isDecard: true,
  },
  egglepasskeywallet: {
    uuid: '70cae094-5cff-4438-b143-46f6119366c2',
    name: 'EGGLE GAME WALLET',
    icon: 'https://ipfs.pantograph.app/ipfs/QmUn7MnyA9HWfHNRG7oLTweNG93ztaErFdcg36Y2uxENUu?filename=noti.png',
    rdns: 'co.bacoor.egglepasskeywallet',
  },
  'egglepasskeywallet-decard': {
    uuid: '192ea6c6-d30a-4f3f-ab8f-aedb1dc5a7fd',
    name: 'DECARD EGGLE GAME WALLET',
    icon: 'https://ipfs.pantograph.app/ipfs/QmUn7MnyA9HWfHNRG7oLTweNG93ztaErFdcg36Y2uxENUu?filename=noti.png',
    rdns: 'co.bacoor.egglepasskeywallet-decard',
    isDecard: true,
  },
  passkeywallet: {
    uuid: 'e9bdd6be-fbe7-4b90-983c-6ad707027d4a',
    name: 'KEYRING SMART',
    icon: 'https://ipfs.pantograph.app/ipfs/QmWdV4p9FvAUKEnGHefwsYxUrtY8qyEX61xbHdGXworS8k?filename=icon%20NOTI.png',
    rdns: 'co.bacoor.passkeywallet',
  },
  keyringsmart: {
    uuid: '234826c9-7cdb-4633-9ad9-b7fcf36eaefc',
    name: 'KEYRING SMART DECARD',
    icon: 'https://ipfs.pantograph.app/ipfs/QmWdV4p9FvAUKEnGHefwsYxUrtY8qyEX61xbHdGXworS8k?filename=icon%20NOTI.png',
    rdns: 'co.bacoor.keyringsmart',
    isDecard: true,
  },
  keyringpasskeywallet: {
    uuid: '44340e62-7f30-4b4c-ac42-9d8185fcb43b',
    name: 'KEYRING SMART',
    icon: 'https://ipfs.pantograph.app/ipfs/QmWdV4p9FvAUKEnGHefwsYxUrtY8qyEX61xbHdGXworS8k?filename=icon%20NOTI.png',
    rdns: 'co.bacoor.keyringpasskeywallet',
  },

  'meteornrun-decard': {
    uuid: '79169e71-a1c3-4ba1-a32c-4f9206485af9',
    name: 'CosmoBridge DeCard',
    icon: 'https://ipfs.pantograph.app/ipfs/QmYBQoHthPHV2ZyWT4mbPjHhkx8FKwMYdY5njEvzPeTyGr?filename=white_notiDataIcon_Cosmo%20Bridge.png',
    rdns: 'co.bacoor.meteornrun-decard',
    isDecard: true,
  },
  meteornrun: {
    uuid: 'f2e5ef21-57e8-42e7-896c-78cf08e0038d',
    name: 'CosmoBridge',
    icon: 'https://ipfs.pantograph.app/ipfs/QmYBQoHthPHV2ZyWT4mbPjHhkx8FKwMYdY5njEvzPeTyGr?filename=white_notiDataIcon_Cosmo%20Bridge.png',
    rdns: 'co.bacoor.meteornrun',
  },
  cyberstepwallet: {
    uuid: 'bb39fdd2-392c-44d2-8793-0194e0f5a1b1',
    name: 'CyberStep Wallet',
    icon: 'https://ipfs.pantograph.app/ipfs/QmQArGRp6XiP9nnqNruti6vw3gQuHyDMsbSEeRhvkfBDrK?filename=notiDataIcon_cyberstep.png',
    rdns: 'co.bacoor.cyberstepwallet',
  },
  'cyberstepwallet-decard': {
    uuid: 'dbb743b3-14dd-4dd8-b34b-f405d2c03249',
    name: 'CyberStep Wallet DeCard',
    icon: 'https://ipfs.pantograph.app/ipfs/QmQArGRp6XiP9nnqNruti6vw3gQuHyDMsbSEeRhvkfBDrK?filename=notiDataIcon_cyberstep.png',
    rdns: 'co.bacoor.cyberstepwallet-decard',
    isDecard: true,
  },
}

/**
 * A collection of constant keys used for storing passkey-related data in storage.
 * Each key is dynamically suffixed with the `GROUP_SLUG` to ensure uniqueness
 * across different groups or environments.
 *
 * @property ACCOUNT_PASSKEY - The storage key for account passkeys, suffixed with `GROUP_SLUG`.
 * @property MODE_ENV_PASSKEY - The storage key for environment mode passkeys, suffixed with `GROUP_SLUG`.
 * @property PERMISSIONS_PASSKEY - The storage key for permissions passkeys, suffixed with `GROUP_SLUG`.
 */
export const STORAGE_KEY = {
  ACCOUNT_PASSKEY: 'ACCOUNT_PASSKEY_' + GROUP_SLUG,
  MODE_ENV_PASSKEY: 'MODE_ENV_PASSKEY_' + GROUP_SLUG,
  PERMISSIONS_PASSKEY: 'PERMISSIONS_PASSKEY_' + GROUP_SLUG,
}

/**
 * A constant array of supported blockchain chain IDs.
 *
 * Each chain ID is represented as a hexadecimal string and corresponds to a specific blockchain network.
 *
 * Supported chain IDs:
 * - `0x1`: Ethereum Mainnet
 * - `0xa`: Optimism
 * - `0x38`: Binance Smart Chain (BSC)
 * - `0x89`: Polygon (Matic)
 * - `0xa4b1`: Arbitrum One
 * - `0x2105`: Fantom Opera
 *
 * This array is marked as `readonly` to ensure immutability.
 */
export const chainsSupported = [
  '0x1',
  '0xa',
  '0x38',
  '0x89',
  '0xa4b1',
  '0x2105',
] as const

/**
 * Converts an array of chain identifiers (in hexadecimal format) into integers.
 *
 * This function maps over the `chainsSupported` array, parsing each chain
 * identifier from a hexadecimal string to an integer using `parseInt`.
 *
 * @returns An array of integers representing the chain identifiers.
 */
export const chainsSupportedByInteger = chainsSupported.map((chain) => {
  return parseInt(chain, 16)
})

/**
 * A constant representing the URL for the passkey service.
 * The value is dynamically retrieved using the `getURLPasskey` function.
 */
export const URL_PASSKEY = getURLPasskey()

/**
 * A constant object that maps supported blockchain chain IDs to their respective RPC endpoint URLs.
 *
 * @constant
 * @type {Record<typeof chainsSupportedByInteger[number], string>}
 *
 * @property {string} 1 - RPC endpoint for the Ethereum mainnet.
 * @property {string} 137 - RPC endpoint for the Polygon (Matic) mainnet.
 * @property {string} 56 - RPC endpoint for the Binance Smart Chain (BSC) mainnet.
 * @property {string} 42161 - RPC endpoint for the Arbitrum One mainnet.
 * @property {string} 8453 - RPC endpoint for the Base mainnet.
 * @property {string} 10 - RPC endpoint for the Optimism mainnet.
 */
export const RPC_DEFAULT: Record<typeof chainsSupportedByInteger[number], string> = {
  1: 'https://ethereum-rpc.publicnode.com',
  137: 'https://polygon-bor-rpc.publicnode.com',
  56: 'https://bsc-rpc.publicnode.com',
  42161: 'https://arbitrum-one-rpc.publicnode.com',
  8453: 'https://base-rpc.publicnode.com',
  10: 'https://optimism-rpc.publicnode.com',
}

/**
 * Represents the information of a wallet, including its slug, URL, and additional group-specific details.
 *
 * @property {string} slug - The unique identifier for the wallet group.
 * @property {string} url - The URL associated with the passkey.
 * @property {object} [infoGroupDetails] - Additional details specific to the wallet group, merged from `infoGroup[GROUP_SLUG]`.
 */
export const infoWallet = {
  slug: GROUP_SLUG,
  url: URL_PASSKEY,
  ...infoGroup[GROUP_SLUG],
}

/**
 * A constant representing the slug for closing a popup, concatenated with the group slug.
 * This is typically used to uniquely identify the action of closing a popup within a specific group.
 */
export const TYPE_CLOSE_POPUP_GROUP_SLUG = 'CLOSE_POPUP_' + GROUP_SLUG
