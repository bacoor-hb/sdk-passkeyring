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

/**
 * A React component that wraps the `PasskeyProvider` component and converts it into a web component
 * using `react-to-webcomponent`. It also dynamically imports the `@webcomponents/custom-elements` polyfill
 * for compatibility with older browsers.
 *
 * @param children - The child components to be rendered inside the `PasskeyProvider`.
 * @param props - The props to be passed to the `PasskeyProvider` component.
 * @returns A JSX element wrapping the `PasskeyProvider` component.
 */
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

/**
 * Creates and registers a web component for the `PasskeyProvider` component.
 * It registers the component as `passkey-provider`,
 * The web component is appended to the document body.
 *
 * @param config - Optional configuration object of type `ProviderConfig` to be passed to the web component.
 */
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

/**
 * Creates and registers a web component specifically for Decard groups.
 * If the group is not identified as Decard, an error is logged to the console.
 * If the group is identified as Decard, it registers the component as `passkey-decard-provider`,
 * The web component is appended to the document body.
 *
 * @param config - Optional configuration object of type `ProviderConfig` to be passed to the web component.
 */
export const createPasskeyDecardProvider = (config?: ProviderConfig) => {
  if (infoGroup?.[GROUP_SLUG]?.isDecard) {
    createPasskeyProvider(config)
  } else {
    console.error('This is not a Decard group')
  }
}

export default PasskeyProviderJS
