'use client'
import React, { ReactNode, useEffect } from 'react'

import '../../styles/index.css'
import AccountProvider from 'lib/Components/AccountProvider'
import { getVersionSdk, onPageLoad } from 'lib/function'
import { TYPE_CLOSE_POPUP_GROUP_SLUG } from 'lib/constants'

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleBeforeUnload = () => {
        window.postMessage({ type: TYPE_CLOSE_POPUP_GROUP_SLUG }, '*')
      }

      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
  }, [])

  return (
    <AccountProvider>
      {children}
    </AccountProvider>
  )
}

export default PasskeyProvider
