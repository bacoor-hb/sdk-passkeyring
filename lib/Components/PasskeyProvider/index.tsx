'use client'
import React, { useEffect } from 'react'
import type { JSX } from 'react'

import '../../styles/index.css'
import AccountProvider from '../AccountProvider'
import { getVersionSdk, onPageLoad } from '../../function'
import { TYPE_CLOSE_POPUP_GROUP_SLUG } from '../../constants'
import { PasskeyProviderProps } from './types'

/**
 * PasskeyProvider component is a React component that initializes the Passkey wallet provider
 *
 * Example usage:
 * ```tsx
 * <PasskeyProvider config={...}>
 *   <YourApp />
 * </PasskeyProvider>
 * ```
 *
 * @param {React.ReactNode} children - The child components to render within the provider.
 * @param {Object} [config] - Optional configuration object for the Passkey provider.
 * @returns {JSX.Element} The rendered PasskeyProvider component.
 * @throws {Error} Throws an error if the SDK version cannot be retrieved.
 *
 *
 */
const PasskeyProvider = ({ children, config = {} }: PasskeyProviderProps): JSX.Element => {
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
