import { AccountContext } from 'lib/Components/AccountProvider'
import { GROUP_SLUG, STORAGE_KEY, URL_PASSKEY } from 'lib/constants'
import { Account } from 'lib/types'
import { useContext, useEffect, useState } from 'react'

export function useConnect () {
  const [isConnected, setIsConnected] = useState<any>(false)
  const accountContext = useContext(AccountContext)
  const { address, setAccount } = accountContext || {}

  useEffect(() => {
    setIsConnected(!!address)
  }, [address])

  const [connectWindow, setConnectWindow] = useState<Window | null>(null)

  const onConnect = async () => {
    if (connectWindow && !connectWindow.closed) {
      connectWindow.focus()
      return
    }
    let url = ''
    if (isConnected && address) {
      url = `${URL_PASSKEY}/${GROUP_SLUG}/mypage/${address}`
    } else {
      url = `${URL_PASSKEY}/activate-by-passkey/${GROUP_SLUG}`
    }

    const width = 450
    const height = 800
    const left = window.innerWidth / 2 - width / 2 + window.screenX
    const top = window.innerHeight / 2 - height / 2 + window.screenY

    const newWindow = window.open(
      url,
      '_blank',
      `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=${width},height=${height},top=${top},left=${left}`,
    )

    if (newWindow) {
      setConnectWindow(newWindow)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (connectWindow && connectWindow.closed) {
        setConnectWindow(null)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [connectWindow])

  const onDisconnect = () => {
    setAccount({
      address: '',
      status: false,
    } as Account)

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY.ACCOUNT_PASSKEY)
    }

    connectWindow?.close()
    setConnectWindow(null)
  }

  const onOpenWallet = (type?:string|undefined) => {
    if (connectWindow && !connectWindow.closed) {
      connectWindow.focus()
      return
    }
    let url = ''

    if (isConnected && address) {
      const query = type === 'NFT' ? '/list-nfts' : ''

      url = `${URL_PASSKEY}/${GROUP_SLUG}/mypage/${address}${query}`
    } else {
      url = `${URL_PASSKEY}/activate-by-passkey/${GROUP_SLUG}`
    }

    const width = 450
    const height = 800
    const left = window.innerWidth / 2 - width / 2 + window.screenX
    const top = window.innerHeight / 2 - height / 2 + window.screenY

    const newWindow = window.open(
      url,
      '_blank',
      `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=${width},height=${height},top=${top},left=${left}`,
    )

    if (newWindow) {
      setConnectWindow(newWindow)
    }
  }

  return { onConnect, isConnected, onDisconnect, onOpenWallet }
}
