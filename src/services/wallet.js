import { parseEther, formatUnits, toHex } from 'viem'

export const signMessage = (provider, address) => {
    if (!provider) return Promise.reject('No provider available')

    return provider.request({
      method: 'personal_sign',
      params: [toHex('Hello from sdk-v2-egglepasskeywallet-decard!'), address]
    })
  }

  export const sendTx = async (provider, address) => {
    if (!provider) return Promise.reject('No provider available')

      return provider.request({
        method: 'eth_sendTransaction',
        params: [{
          from: address,
          to: address,
          value: toHex(parseEther('0.0001')),
          data: '0x'
        }]
      })
  }

  export const getBalance = async (provider, address) => {
    if (!provider) return Promise.reject('No provider available')

      const balance = await provider.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      })
    const ethBalance = formatUnits(BigInt(balance), 18)
    return ethBalance
  }
