import { AccountContext } from 'lib/Components/AccountProvider'
import { GROUP_SLUG, STORAGE_KEY, URL_PASSKEY } from 'lib/constants'
import { Account } from 'lib/types'
import { useContext, useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useConnectWindow } from 'lib/context/ConnectWindowContext'

type TypeConnect = string | undefined

export function useConnect () {
  const [isConnected, setIsConnected] = useState<any>(false)
  const accountContext = useContext(AccountContext)
  const { address, setAccount } = accountContext || {}
  const { connectWindow, setConnectWindow } = useConnectWindow()

  useEffect(() => {
    setIsConnected(!!address)
  }, [address])

  const getUrl = (type:TypeConnect) => {
    let url = ''
    if (isConnected && address) {
      const query = type === 'NFT' ? '/list-nfts' : ''
      url = `${URL_PASSKEY}/${GROUP_SLUG}/mypage/${address}${query}`
    } else {
      url = `${URL_PASSKEY}/activate-by-passkey/${GROUP_SLUG}`
    }
    return url
  }

  const openPopup = (url:string) => {
    const width = 450
    const height = 800
    const left = window.innerWidth / 2 - width / 2 + window.screenX
    const top = window.innerHeight / 2 - height / 2 + window.screenY

    const newWindow = window.open(
      url,
      `${GROUP_SLUG}${address}`,
     `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=${width},height=${height},top=${top},left=${left}`,
    )

    if (newWindow) {
      setConnectWindow(newWindow)
    }
  }

  const onConnect = async () => {
    if (connectWindow.current && !connectWindow.current.closed) {
      if (isMobile) {
        connectWindow.current.close()
      } else {
        connectWindow.current.focus()
        return
      }
    }
    const url = getUrl('')

    openPopup(url)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (connectWindow.current && connectWindow.current.closed) {
        connectWindow.current = null
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const onDisconnect = () => {
    setAccount({
      address: '',
      status: false,
    } as Account)

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY.ACCOUNT_PASSKEY)
    }

    connectWindow.current?.close()
    setConnectWindow(null)
  }

  const onOpenWallet = (type?:string|undefined) => {
    const url = getUrl(type)
    if (connectWindow.current && !connectWindow.current.closed) {
      if (isMobile) {
        connectWindow.current.close()
      } else {
        connectWindow.current.focus()
        connectWindow.current.location.replace(url)
        return
      }
    }
    openPopup(url)
  }

  useEffect(() => {
    const receiveMessage = (event: MessageEvent) => {
      if (event?.data?.addressPasskey) {
        setAccount({
          address: event.data.addressPasskey,
          status: true,
        })
        // connectWindow.current?.close()
      }
    }

    window.addEventListener('message', receiveMessage)

    return () => {
      window.removeEventListener('message', receiveMessage)
    }
  }, [])

  return { onConnect, isConnected, onDisconnect, onOpenWallet }
}
