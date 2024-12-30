'use client'
import React, { useState, ReactNode, useEffect } from 'react'

import '../../styles/index.css'
import AccountProvider from 'lib/Components/AccountProvider'
import { getVersionSdk, onPageLoad } from 'lib/function'

interface PasskeyProviderProps {
  children: ReactNode;
  config?: any;
}

const PasskeyProvider = ({ children, config = {} }: PasskeyProviderProps) => {
  useEffect(() => {
    onPageLoad(config)
  }, [config])
  useEffect(() => {
    try {
      const version = getVersionSdk()
      console.warn('🚀 ~ version:', version)
    } catch (error) {

    }
  }, [])

  return (
    <AccountProvider>
      {children}
    </AccountProvider>
  )
}

export default PasskeyProvider
