'use client'
import React, { useState, ReactNode, useEffect } from 'react'

import '../../styles/index.css'
import AccountProvider from 'lib/Components/AccountProvider'
import { onPageLoad } from 'lib/function'

interface PasskeyProviderProps {
  children: ReactNode;
  config?: any;
}

const PasskeyProvider = ({ children, config = {} }: PasskeyProviderProps) => {
  useEffect(() => {
    onPageLoad(config)
  }, [config])

  return (
    <AccountProvider>
      {children}
    </AccountProvider>
  )
}

export default PasskeyProvider
