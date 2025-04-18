import React, { useEffect, ReactNode } from 'react'
import ReactDOM from 'react-dom'
// @ts-ignore
import reactToWebComponent from 'react-to-webcomponent'
import PasskeyProvider from 'lib/Components/PasskeyProvider'
import { GROUP_SLUG, infoGroup } from 'lib/constants'
import { PasskeyProviderProps, ProviderConfig } from 'lib/Components/PasskeyProvider/types'

const PasskeyProviderJS = ({ children, ...props }: PasskeyProviderProps) => {
  useEffect(() => {
    import('@webcomponents/custom-elements')
  }, [])

  return (
    <PasskeyProvider {...props}>
      {children}
    </PasskeyProvider>
  )
}

export const createPasskeyProvider = (config: ProviderConfig) => {
  if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
    const PasskeyProviderToWebComponent = reactToWebComponent(PasskeyProvider, React, ReactDOM,
      {
        props: {
          config: 'json',
        },
      },
    )
    let elementHTML: any
    if (infoGroup?.[GROUP_SLUG]?.isDecard) {
      customElements.define('passkey-decard-provider', PasskeyProviderToWebComponent)
      elementHTML = document.createElement('passkey-decard-provider')
    } else {
      customElements.define('passkey-provider', PasskeyProviderToWebComponent)
      elementHTML = document.createElement('passkey-provider')
    }
    if (elementHTML) {
      elementHTML.config = config
      document.body.append(elementHTML)
    }
  }
}

export default PasskeyProviderJS
