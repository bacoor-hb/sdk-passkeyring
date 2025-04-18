import React, { useEffect, ReactNode } from 'react'
import ReactDOM from 'react-dom'
// @ts-ignore
import reactToWebComponent from 'react-to-webcomponent'
import PasskeyProvider from 'lib/Components/PasskeyProvider'
import { GROUP_SLUG, infoGroup } from 'lib/constants'
import { PasskeyProviderProps } from 'lib/Components/PasskeyProvider/types'

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

if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  const PasskeyProviderToWebComponent = reactToWebComponent(PasskeyProvider, React, ReactDOM)

  if (infoGroup?.[GROUP_SLUG]?.isDecard) {
    customElements.define('passkey-decard-provider', PasskeyProviderToWebComponent)
  } else {
    customElements.define('passkey-provider', PasskeyProviderToWebComponent)
  }
}

export default PasskeyProviderJS
