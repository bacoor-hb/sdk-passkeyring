# sdk-v2-egglegamewallet JavaScript

This repository provides example of how to integrate and use **sdk-v2-egglegamewallet** in **Javascript**. This example is designed to demonstrate best practices and simplify the integration process.

> We recommend using [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) to get started with sdk-v2-egglegamewallet JavaScript.

## Prerequisites

**Installation AppKit JavaScript Wagmi**
```
yarn add @reown/appkit @reown/appkit-adapter-wagmi wagmi viem
```
> More detail about install AppKit JavaScript SDK, please visit [here](https://docs.reown.com/appkit/javascript/core/installation)

**Installation sdk-passkeyring package version >=2.4.28**
```
yarn add sdk-v2-egglegamewallet@2.4.28
```
> In this example we're using package `sdk-v2-egglegamewallet@2.4.28`

**Pleae note that sdk-passkeyring supports the following chains**
```
Ethereum:         '0x1'
OP Mainnet:       '0xa'
BNB Smart Chain:  '0x38'
Polygon:          '0x89'
Arbitrum One:     '0xa4b1'
```

## Implementation
**In your `appKit.js` file make sure you have the following settings.**
> Full `appKit.js` file at this example at [/src/config/appKit.js](/src/config/appKit.js)

```javascript
...
import { createAppKit } from '@reown/appkit'
// This import is required to inject global html tag into the app
import { PasskeyProviderJS } from "sdk-v2-egglegamewallet";
...

export const appKit = createAppKit({
  ...
  enableEIP6963: true,
  enableInjected: true
})

```

## Trigger the modal
> Add `<appkit-button>` and `<passkey-provider />` to your html file
> Full html file at this example at [/index.html](index.html)


> Load your javacript config file `main.js` here
> Full code for `main.js` file at this example at [/src/main.js](/src/main.js)
```html
<!doctype html>
<html lang="en">
  ...
  <body>
      ...
        <appkit-button />
        <passkey-provider />
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

## How to run this example t your local?
1. Clone source
2. Run `yarn` to install dependencies
3. Run `yarn dev` to start the development server
4. Open your local url at [http://localhost:3011](http://localhost:3011/)
