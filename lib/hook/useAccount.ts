import { Account } from './../types/index'
import { AccountContext } from 'lib/Components/AccountProvider'
import React, { useContext } from 'react'

export const useAccount = () => {
  const account = useContext(AccountContext) as Account

  return account
}
