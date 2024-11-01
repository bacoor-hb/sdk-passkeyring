
import { GROUP_SLUG } from 'lib/constants'
import PasskeyWalletAuthentication from 'lib/services/passkeyWallet/authentication'
import { useState } from 'react'

export function useConnect () {
  const [isConnected, setIsConnected] = useState<any>(false)

  const onConnect = () => {
    console.log('🚀 ~ onConnect ~ onConnect:1111')
  }
  const onRegister = async () => {
    const username = 'demo-1'

    const registerAccount = await PasskeyWalletAuthentication.register({ username, groupSlug: GROUP_SLUG })
  }

  return { onConnect, isConnected, onRegister }
}
