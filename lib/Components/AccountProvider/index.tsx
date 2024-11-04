
import { STORAGE_KEY } from 'lib/constants'
import { Account } from 'lib/types'
import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface AccountProviderProps {
  children: ReactNode
}
type TypeAccountContext = Account & { setAccount: (account?: Account|undefined) => void }

export const AccountContext = createContext<TypeAccountContext >({
  address: '',
  // isConnect: false,
  status: false,
  setAccount: () => {},
})

const accountDefault:Account = {
  address: '',
  // isConnect: false,
  status: false,
}

const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
  const [account, setAccount] = useState(() => {
    const savedAccount = localStorage.getItem(STORAGE_KEY.ACCOUNT_PASSKEY)
    return savedAccount ? JSON.parse(savedAccount) : accountDefault
  })

  const setChangeAccount = (account?: Account) => {
    const newAccount = account || accountDefault
    setAccount(newAccount)
    localStorage.setItem(STORAGE_KEY.ACCOUNT_PASSKEY, JSON.stringify(newAccount))
  }

  useEffect(() => {
    const receiveMessage = (event: MessageEvent) => {
      if (event?.data?.addressPasskey) {
        setChangeAccount({
          address: event.data.addressPasskey,
          // isConnect: true,
          status: true,
        })
        // close window after connect
        window.close()
      }
    }

    window.addEventListener('message', receiveMessage)

    return () => {
      window.removeEventListener('message', receiveMessage)
    }
  }, [])

  return (
    <AccountContext.Provider value={{ ...account, setAccount: setChangeAccount }}>
      {children}
    </AccountContext.Provider>
  )
}

export default AccountProvider
