import { ProviderConfig } from './../../web3/type'
import { ReactNode } from 'react'

export interface PasskeyProviderProps {
  children: ReactNode;
  config?: ProviderConfig;
}
