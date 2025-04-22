'use client'
import React, { useEffect } from 'react'
import type { JSX } from 'react'

import '../../styles/index.css'
import AccountProvider from '../AccountProvider'
import { getVersionSdk, onPageLoad } from '../../function'
import { TYPE_CLOSE_POPUP_GROUP_SLUG } from '../../constants'
import { PasskeyProviderProps } from './types'

/**
 * PasskeyProvider is a React component that wraps its children
 * and initializes various side effects related to the SDK and browser events.
 *
 * @param {PasskeyProviderProps} props - The props for the PasskeyProvider component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 * @param {object} [props.config={}] - Optional configuration object passed to the `onPageLoad` function.
 *
 * @remarks
 * - On mount, it triggers the `onPageLoad` function with the provided `config`.
 * - It attempts to retrieve and log the SDK version using `getVersionSdk`.
 * - It sets up a `beforeunload` event listener to send a message when the page is about to unload.
 *
 * @returns {JSX.Element} A React element wrapping the children
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
