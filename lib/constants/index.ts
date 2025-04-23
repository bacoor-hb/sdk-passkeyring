import { SlugGroup } from './type'
import { EIP6963ProviderInfo, getURLPasskey } from '../function'
// Docs    ->   https://eips.ethereum.org/EIPS/eip-6963
// Generate uuidV4  ->   https://www.uuidgenerator.net/version4

/**
 * A unique identifier for the SDK, represented as a UUID string.
 * This constant is used to uniquely identify the SDK instance or version.
 */
const uuidSdk = 'f5316409-9ad8-451c-8aba-90835c0a726d'
/**
 * A reverse domain name string used as a unique identifier for the SDK.
 * This follows the reverse domain name system (RDNS) convention.
 */
const rdnsSdk = 'co.bacoor.keyring'

/**
 * A unique identifier for the SDK DE Card.
 * This UUID is used to distinguish the SDK DE Card in the system.
 */
const uuidSdkDeCard = '026dbbaa-7d0c-4391-8213-2a28575f7e2a'
/**
 * A reverse domain name system (RDNS) identifier used for the SDK's smart keyring application.
 * This constant follows the RDNS naming convention to ensure uniqueness and proper namespace organization.
 */
const rdnsSdkDeCard = 'app.keyring.smart'

/**
 * Represents the slug identifier for a specific group.
 * This constant is used to uniquely identify the group within the system.
 */
export const GROUP_SLUG: SlugGroup = 'egglepasskeywallet'

/**
 * Represents the current version of the SDK.
 * This constant is used to track the version of the SDK being used.
 */
export const SDK_VERSION = '2.6.0'

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
    uuid: uuidSdk,
    name: 'Eggle Gamewallet',
    icon: 'https://ipfs.pantograph.app/ipfs/QmUn7MnyA9HWfHNRG7oLTweNG93ztaErFdcg36Y2uxENUu?filename=noti.png',
    rdns: rdnsSdk,
  },
  'egglegamewallet-decard': {
    uuid: uuidSdkDeCard,
    name: 'Eggle Gamewallet DeCard',
    icon: 'https://ipfs.pantograph.app/ipfs/QmUn7MnyA9HWfHNRG7oLTweNG93ztaErFdcg36Y2uxENUu?filename=noti.png',
    rdns: rdnsSdkDeCard,
    isDecard: true,
  },
  egglepasskeywallet: {
    uuid: uuidSdk,
    name: 'EGGLE GAME WALLET',
    icon: 'https://ipfs.pantograph.app/ipfs/QmUn7MnyA9HWfHNRG7oLTweNG93ztaErFdcg36Y2uxENUu?filename=noti.png',
    rdns: rdnsSdk,
  },
  'egglepasskeywallet-decard': {
    uuid: uuidSdkDeCard,
    name: 'DECARD EGGLE GAME WALLET',
    icon: 'https://ipfs.pantograph.app/ipfs/QmUn7MnyA9HWfHNRG7oLTweNG93ztaErFdcg36Y2uxENUu?filename=noti.png',
    rdns: rdnsSdkDeCard,
    isDecard: true,
  },
  passkeywallet: {
    uuid: uuidSdk,
    name: 'KEYRING SMART',
    icon: 'https://ipfs.pantograph.app/ipfs/QmWdV4p9FvAUKEnGHefwsYxUrtY8qyEX61xbHdGXworS8k?filename=icon%20NOTI.png',
    rdns: rdnsSdk,
  },
  keyringsmart: {
    uuid: uuidSdkDeCard,
    name: 'KEYRING SMART DECARD',
    icon: 'https://ipfs.pantograph.app/ipfs/QmWdV4p9FvAUKEnGHefwsYxUrtY8qyEX61xbHdGXworS8k?filename=icon%20NOTI.png',
    rdns: rdnsSdkDeCard,
    isDecard: true,
  },
  keyringpasskeywallet: {
    uuid: uuidSdk,
    name: 'KEYRING SMART',
    icon: 'https://ipfs.pantograph.app/ipfs/QmWdV4p9FvAUKEnGHefwsYxUrtY8qyEX61xbHdGXworS8k?filename=icon%20NOTI.png',
    rdns: rdnsSdk,
  },

  'meteornrun-decard': {
    uuid: uuidSdkDeCard,
    name: 'Meteorn Wallet DeCard',
    icon: 'https://ipfs.pantograph.app/ipfs/Qmao1Uf2m1bRGHLy66AnLJuWtBWjFLhDpbBWBYGrUtB1qV?filename=notiDataIcon_Meteorn.png',
    rdns: rdnsSdkDeCard,
    isDecard: true,
  },
  meteornrun: {
    uuid: uuidSdk,
    name: 'Meteorn Wallet',
    icon: 'https://ipfs.pantograph.app/ipfs/Qmao1Uf2m1bRGHLy66AnLJuWtBWjFLhDpbBWBYGrUtB1qV?filename=notiDataIcon_Meteorn.png',
    rdns: rdnsSdk,
  },
  cyberstepwallet: {
    uuid: uuidSdk,
    name: 'CyberStep Wallet',
    icon: 'https://ipfs.pantograph.app/ipfs/QmQArGRp6XiP9nnqNruti6vw3gQuHyDMsbSEeRhvkfBDrK?filename=notiDataIcon_cyberstep.png',
    rdns: rdnsSdk,
  },
  'cyberstepwallet-decard': {
    uuid: uuidSdkDeCard,
    name: 'CyberStep Wallet DeCard',
    icon: 'https://ipfs.pantograph.app/ipfs/QmQArGRp6XiP9nnqNruti6vw3gQuHyDMsbSEeRhvkfBDrK?filename=notiDataIcon_cyberstep.png',
    rdns: rdnsSdkDeCard,
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
