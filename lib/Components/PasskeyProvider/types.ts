import { ProviderConfig } from 'lib/web3/type'
import { ReactNode } from 'react'

export interface PasskeyProviderProps {
  children: ReactNode;
  config?: ProviderConfig;
}
