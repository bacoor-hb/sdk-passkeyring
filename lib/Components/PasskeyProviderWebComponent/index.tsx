'use client'
import '@webcomponents/custom-elements'
import React, { useEffect, ReactNode } from 'react'
import ReactDOM from 'react-dom'
// @ts-ignore
import reactToWebComponent from 'react-to-webcomponent'
import PasskeyProvider from 'lib/Components/PasskeyProvider'

interface PasskeyProviderProps {
  children: ReactNode;
  config?: any;
}
const PasskeyProviderJS = ({ children, config = {} }: PasskeyProviderProps) => {
  return (
    <PasskeyProvider>
      {children}
    </PasskeyProvider>
  )
}
const PasskeyProviderToWebComponent = reactToWebComponent(PasskeyProvider, React, ReactDOM)

customElements.define('passkey-provider', PasskeyProviderToWebComponent)

export default PasskeyProviderJS
