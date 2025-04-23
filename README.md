# sdk-v2-meteornrun-decard JavaScript

This repository provides example of how to integrate and use **sdk-v2-meteornrun-decard** in **Javascript**. This example is designed to demonstrate best practices and simplify the integration process.

> We recommend using [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) to get started with sdk-v2-meteornrun-decard JavaScript.

## Prerequisites

**Installation AppKit JavaScript Wagmi**
```
yarn add @reown/appkit @reown/appkit-adapter-wagmi wagmi viem
```
> More detail about install AppKit JavaScript SDK, please visit [here](https://docs.reown.com/appkit/javascript/core/installation)

**Installation sdk-v2-meteornrun-decard package version ≥2.5**
```
yarn add sdk-v2-meteornrun-decard@^2.5
```

**Please note that sdk-v2-meteornrun-decard supports the following chains**
```
Ethereum:         '0x1'
OP Mainnet:       '0xa'
BNB Smart Chain:  '0x38'
Polygon:          '0x89'
Arbitrum One:     '0xa4b1'
Base:             '0x2105'
```

## Implementation
**In your `appKit.js` file make sure you have the following settings.**
> Full `appKit.js` file at this example at [/src/config/appKit.js](/src/config/appKit.js)

For version ≥2.6.0
```javascript
...
import { createAppKit } from '@reown/appkit'
// This import is required to inject global html tag into the app
import { createPasskeyProvider } from "sdk-v2-meteornrun-decard";
...

export const appKit = createAppKit({
  ...
  enableEIP6963: true,
  enableInjected: true
})


createPasskeyProvider()
//You can also custom config, example rpcUrl:
// createPasskeyProvider({
//     rpcUrl: {
//       1: 'https://ethereum-rpc.publicnode.com',
//       137: 'https://polygon-bor-rpc.publicnode.com',
//       56: 'https://bsc-rpc.publicnode.com',
//       42161: 'https://arbitrum-one-rpc.publicnode.com',
//       8453: 'https://base-rpc.publicnode.com',
//       10: 'https://optimism-rpc.publicnode.com',
//     }
// })

```

For version <2.6.0
```javascript
...
import { createAppKit } from '@reown/appkit'
// This import is required to inject global html tag into the app
import { PasskeyProviderJS } from "sdk-v2-meteornrun-decard";
...

export const appKit = createAppKit({
  ...
  enableEIP6963: true,
  enableInjected: true
})

```

## Trigger the modal
> For version < 2.6.0 you need add `<passkey-decard-provider />` to your html file,for version ≥ 2.6.0 then you does not need anything else, remove it if you added it

> Full html file at this example at [/index.html](index.html)



> Load your javascript config file `main.js` here
> Full code for `main.js` file at this example at [/src/main.js](/src/main.js)

For version < 2.6.0
```html
<!doctype html>
<html lang="en">
  ...
  <body>
      ...
        <appkit-button />
        <passkey-decard-provider />//add this line
      ...
      <script type="module" src="/src/main.js"></script>
  </body>
</html>
```
For version ≥ 2.6.0

```html
<!doctype html>
<html lang="en">
  ...
  <body>
      ...
        <appkit-button />
         <!-- <passkey-decard-provider />--> // Remove this line 
      ...
      <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

## Blockchain Interaction
> You can use `provider.request()` method to call Ethereum JSON-RPC API
> For example you can call `eth_getBalance` like below
> Full code for `eth_getBalance` at this example at [/src/services/wallet.js](/src/services/wallet.js)
```javascript
const getBalance = async (provider, address) => {
    ...
    const balance = await provider.request({
      method: 'eth_getBalance',
      params: [address, 'latest']
    })
    ...
  }
```

## We already deployed this example to Vercel for testing
You can access this example at [https://sdk-v2-meteornrun-decard-javascript.vercel.app/](https://sdk-v2-meteornrun-decard-javascript.vercel.app/)

## Or you can run this example locally
1. Clone source
2. Run `yarn` to install dependencies
3. Run `yarn dev` to start the development server
4. Open your local url at [http://localhost:3011](http://localhost:3011/)
