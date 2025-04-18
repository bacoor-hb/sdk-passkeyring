import { RPC_DEFAULT } from 'lib/constants'
import { ReactNode } from 'react'

export interface ProviderConfig {
  rpcUrl?: typeof RPC_DEFAULT;
}

export interface PasskeyProviderProps {
  children: ReactNode;
  config?: ProviderConfig;
}
