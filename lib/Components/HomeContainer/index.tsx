import { useAccount } from 'lib/hook/useAccount'
import React from 'react'

const HomeContainer = () => {
  // get data account from context
  const account = useAccount()
  const { address, status } = account
  console.log('🚀 ~ HomeContainer ~ account:', account)

  return (
    <div>{address || 'no address'}</div>
  )
}

export default HomeContainer
