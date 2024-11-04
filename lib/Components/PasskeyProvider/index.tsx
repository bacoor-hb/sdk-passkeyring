'use client'
import React, { useState, ReactNode } from 'react'

import '../../styles/index.css'
import AccountProvider from 'lib/Components/AccountProvider'

const PasskeyProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AccountProvider>
      {children}
    </AccountProvider>
  )
}

export default PasskeyProvider
