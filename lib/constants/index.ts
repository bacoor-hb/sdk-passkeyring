import { SlugGroup } from 'lib/constants/type'
import { EIP6963ProviderInfo } from 'lib/function'

// Docs    ->   https://eips.ethereum.org/EIPS/eip-6963
// Generate uuidV4  ->   https://www.uuidgenerator.net/version4

const uuidSdk = 'f5316409-9ad8-451c-8aba-90835c0a726d'
const rdnsSdk = 'co.bacoor.keyring'

const uuidSdkDeCard = '026dbbaa-7d0c-4391-8213-2a28575f7e2a'
const rdnsSdkDeCard = 'app.keyring.smart'

export const GROUP_SLUG: SlugGroup = 'passkeywallet'
// export const GROUP_SLUG: SlugGroup = 'egglepasskeywallet'
export const SDK_VERSION = '2.5.8'

export const infoGroup: { [key in SlugGroup]: EIP6963ProviderInfo } = {
  egglegamewallet: {
    uuid: uuidSdk,
    name: 'Eggle Gamewallet',
    icon: 'https://ipfs.pantograph.app/ipfs/QmUn7MnyA9HWfHNRG7oLTweNG93ztaErFdcg36Y2uxENUu?filename=noti.png',
    rdns: rdnsSdk,
  },
  'egglegamewallet-test': {
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
  'egglegamewallet-decard-test': {
    uuid: uuidSdkDeCard,
    name: 'DECARD EGGLE GAME WALLET',
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
  'egglepasskeywallet-test': {
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
  'egglepasskeywallet-decard-test': {
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

export const STORAGE_KEY = {
  ACCOUNT_PASSKEY: 'ACCOUNT_PASSKEY_' + GROUP_SLUG,
  MODE_ENV_PASSKEY: 'MODE_ENV_PASSKEY_' + GROUP_SLUG,
  PERMISSIONS_PASSKEY: 'PERMISSIONS_PASSKEY_' + GROUP_SLUG,
}

export const chainsSupported = [
  '0x1',
  '0xa',
  '0x38',
  '0x89',
  '0xa4b1',
  '0x2105',
]

// export const URL_PASSKEY = 'https://smart.keyring.app'
// export const URL_PASSKEY = 'https://pass.w3w.app'

const getURLPasskey = () => {
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

export const URL_PASSKEY = getURLPasskey()

export const RPC_DEFAULT = {
  1: 'https://cloudflare-eth.com',
  137: 'https://polygon-rpc.com',
  56: 'https://binance.llamarpc.com',
  42161: 'https://arb1.arbitrum.io/rpc',
  8453: 'https://mainnet.base.org',
  10: 'https://mainnet.optimism.io',
}

export const infoWallet = {
  slug: GROUP_SLUG,
  url: URL_PASSKEY,
  ...infoGroup[GROUP_SLUG],
}

export const TYPE_CLOSE_POPUP_GROUP_SLUG = 'CLOSE_POPUP_' + GROUP_SLUG
