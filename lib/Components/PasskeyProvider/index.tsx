'use client'
import React, { useState, ReactNode, useEffect } from 'react'

import '../../styles/index.css'
import AccountProvider from 'lib/Components/AccountProvider'
import { onPageLoad } from 'lib/function'
import { MODE_DEV } from 'lib/constants'

interface PasskeyProviderProps {
  children: ReactNode;
  mode?: string;
}

const PasskeyProvider = ({ children, ...props }: PasskeyProviderProps) => {
  const mode = props?.mode || 'production'

  useEffect(() => {
    onPageLoad()
  }, [])
  return (
    <AccountProvider>
      {children}
    </AccountProvider>
  )
}

export default PasskeyProvider
