
import { AccountContext } from 'lib/Components/AccountProvider'
import { GROUP_SLUG, STORAGE_KEY } from 'lib/constants'
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
      url = `https://pass.w3w.app/${GROUP_SLUG}/mypage/${address}`
    } else {
      url = `http://localhost:3000/activate-by-passkey/${GROUP_SLUG}`
    }

    const newWindow = window.open(
      url,
      '_blank',
      'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=800,top=200,left=200',
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
    localStorage.removeItem(STORAGE_KEY.ACCOUNT_PASSKEY)
    connectWindow?.close()
    setConnectWindow(null)
  }

  return { onConnect, isConnected, onDisconnect }
}
