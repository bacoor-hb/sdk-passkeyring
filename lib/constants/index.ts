const uuidSdk = '23e4567-e89b-12d3-a456-426614174000'
export const rdnsSdk = 'co.bacoor.keyring'

export const infoGroup = {
  egglegamewallet: {
    uuid: uuidSdk,
    name: 'Eggle Gamewallet',
    icon: 'https://ipfs.pantograph.app/ipfs/QmUn7MnyA9HWfHNRG7oLTweNG93ztaErFdcg36Y2uxENUu?filename=noti.png',
    rdns: rdnsSdk,
  },
  bacoorpasskeywallet: {
    uuid: uuidSdk,
    name: 'Eggle Gamewallet',
    icon: 'https://ipfs.pantograph.app/ipfs/QmUn7MnyA9HWfHNRG7oLTweNG93ztaErFdcg36Y2uxENUu?filename=noti.png',
    rdns: rdnsSdk,
  },
  passkeywallet: {
    uuid: uuidSdk,
    name: 'KEYRING SMART',
    icon: 'https://ipfs.pantograph.app/ipfs/QmWdV4p9FvAUKEnGHefwsYxUrtY8qyEX61xbHdGXworS8k?filename=icon%20NOTI.png',
    rdns: rdnsSdk,
  },

}

export const GROUP_SLUG = 'egglegamewallet'
// export const GROUP_SLUG = 'passkeywallet'
// export const GROUP_SLUG = 'bacoorpasskeywallet'
// export const GROUP_SLUG = 'keyringpasskeywallet'

export const STORAGE_KEY = {
  ACCOUNT_PASSKEY: 'ACCOUNT_PASSKEY_' + GROUP_SLUG,
}

export const chainsSupported = [
  '0x1', '0xa', '0x38', '0x89', '0xa4b1',
]

// export const URL_PASSKEY = 'https://smart.keyring.app'
export const URL_PASSKEY = 'https://pass.w3w.app'
// export const URL_PASSKEY = 'http://localhost:3000'
