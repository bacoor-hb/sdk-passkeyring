import { polygon } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
// This import is required to inject global html tag into the app
// import { PasskeyProviderJS } from "sdk-v2-meteornrun-decard"; // used for version <2.6.0
import { createPasskeyDecardProvider } from "sdk-v2-meteornrun-decard"; // used for version >= 2.6.0


const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

// supported networks by sdk-v2-meteornrun-decard: mainnet, optimism, bsc, polygon, arbitrum
export const networks = [polygon]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
})

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  enableEIP6963: true,
  enableInjected: true,
})

createPasskeyDecardProvider()
