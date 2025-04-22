import React, { useEffect, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import type { JSX } from 'react'
// @ts-ignore
import reactToWebComponent from 'react-to-webcomponent'
import PasskeyProvider from '../PasskeyProvider'
import { GROUP_SLUG, infoGroup } from '../../constants'
import { PasskeyProviderProps } from '../PasskeyProvider/types'
import { ProviderConfig } from '../../web3/type'
import { checkVersion } from '../../function'

const PasskeyProviderJS = ({ children, ...props }: PasskeyProviderProps): JSX.Element => {
  useEffect(() => {
    import('@webcomponents/custom-elements')
  }, [])

  return (
    <PasskeyProvider {...props}>
      {children}
    </PasskeyProvider>
  )
}

if (checkVersion('2.6.0') === false) {
  if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
    const PasskeyProviderToWebComponent = reactToWebComponent(PasskeyProvider, React, ReactDOM)
    if (infoGroup?.[GROUP_SLUG]?.isDecard) {
      customElements.define('passkey-decard-provider', PasskeyProviderToWebComponent)
    } else {
      customElements.define('passkey-provider', PasskeyProviderToWebComponent)
    }
  }
}

export const createPasskeyProvider = (config?: ProviderConfig) => {
  if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
    const PasskeyProviderToWebComponent = reactToWebComponent(PasskeyProvider, React, ReactDOM)
    let elementHTML: any
    if (infoGroup?.[GROUP_SLUG]?.isDecard) {
      customElements.define('passkey-decard-provider', PasskeyProviderToWebComponent)
      elementHTML = document.createElement('passkey-decard-provider')
    } else {
      customElements.define('passkey-provider', PasskeyProviderToWebComponent)
      elementHTML = document.createElement('passkey-provider')
    }
    if (elementHTML) {
      if (config) {
        elementHTML.config = config
      }
      document.body.append(elementHTML)
    }
  }
}

export const createPasskeyDecardProvider = (config?: ProviderConfig) => {
  if (infoGroup?.[GROUP_SLUG]?.isDecard) {
    createPasskeyProvider(config)
  } else {
    console.error('This is not a Decard group')
  }
}

export default PasskeyProviderJS
