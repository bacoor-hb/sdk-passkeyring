
import { STORAGE_KEY } from 'lib/constants'
import { ConnectWindowProvider } from 'lib/context/ConnectWindowContext'
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
  const [account, setAccount] = useState(accountDefault)

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedAccount = localStorage.getItem(STORAGE_KEY.ACCOUNT_PASSKEY)
      setAccount(savedAccount ? JSON.parse(savedAccount) : accountDefault)
    }
  }, [])

  const setChangeAccount = (account?: Account) => {
    const newAccount = account || accountDefault
    setAccount(newAccount)
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY.ACCOUNT_PASSKEY, JSON.stringify(newAccount))
    }
  }

  return (
    <AccountContext.Provider value={{ ...account, setAccount: setChangeAccount }}>
      <ConnectWindowProvider>
        {children}
      </ConnectWindowProvider>
    </AccountContext.Provider>
  )
}

export default AccountProvider
