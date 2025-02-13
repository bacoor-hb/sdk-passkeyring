# sdk-v2-egglepasskeywallet-decard
## NOTE: Only Support `React.js` and Web application framework Software related to `React.js`( recommended: Next.js)

## Introduction:
> The `sdk-v2-egglepasskeywallet-decard` SDK is built on `React.js`, provides a straightforward way to connect wallets using passkeys, allowing interaction with smart accounts. It is pre-configured with AppKit (web3modal), making it easy to integrate into your projects.

## Prerequisites:
### Before installing the SDK, ensure you have set up AppKit (web3modal).
#### ⚠ If you have already set it up, skip this step.

📚 [AppKit Documentation](https://docs.reown.com/appkit/overview)

```
If you prefer a video tutorial, please click below 👇
```





[![IMAGE ALT TEXT HERE](https://i.ytimg.com/vi/lxTGqXh7LiA/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDOS4gcXwP9GEZB4-Qei0TW-E4z7Q)](https://youtu.be/lxTGqXh7LiA)

```jsx
# NOTE:
// when you are in the modal creation step of web3modal,
// ensure enableEIP6963 = true and enableInjected = true

// Example
const modal = createAppKit({
  ...yourConfig,
  enableEIP6963: true,
  enableInjected: true,
});
```

## Installation

Install the SDK using npm:
```bash
npm install --save sdk-v2-egglepasskeywallet-decard
```
or using yarn:

```bash
yarn add sdk-v2-egglepasskeywallet-decard
```


## Usage

```jsx
// MUST HAVE - Use this in the first file to run (index.js)

import React from "react";
import { PasskeyProvider } from "sdk-v2-egglepasskeywallet-decard";

const App = ({ children }) => {
  return <PasskeyProvider>{children}</PasskeyProvider>;
};

export default App;
```
## #Issue

If you have completed the above steps 
but your wallet is not listed in the AppKit (web3modal) modal

=> Please update AppKit( web3modal) to the [latest version.](https://docs.reown.com/appkit/overview)
 
## #Supported chains
```
Ethereum:         '0x1'
OP Mainnet:       '0xa'
BNB Smart Chain:  '0x38'
Polygon:          '0x89'
Arbitrum One:     '0xa4b1'
```



## #API


| Name                           | Description                                         
| -----------------------------  | -----------------------  
| PasskeyProvider                | Component Passkey Provider     
| infoWallet                     | Wallet information    
| isWeb3Injected                 | Check if Web3 Injected Provider is supported   
 


## #API Details

#### `PasskeyProvider`

PasskeyProvider is a wrapper that supports using wallets.


| Property                      | Description             | Required           |Attribute                                  
| ----------------------------- | ----------------------- | -------------------|----------
| `config`                      | Config Passkey Provider |Optional            |`rpcUrl`


```jsx

import { PasskeyProvider } from "sdk-v2-egglepasskeywallet-decard";

  //Example
  <PasskeyProvider
        config={{
          rpcUrl: {
            137: "http://rpc...",
          },
        }}
      >
        {/*CODE HERE */}
  </PasskeyProvider>
```

#### `infoWallet`
Information about the wallet.

| Property                      | Attribute                                                     
| ----------------------------- | ------------------------------------------------------------- 
| `infoWallet`                  | `ndns`
|                               | `name`
|                               | `icon`
|                               | `id`


```jsx
import { infoWallet } from "sdk-v2-egglepasskeywallet-decard";

  //example
  <div>
    <img src={infoWallet.icon} width={20} height={20} />
    <div>{infoWallet.name}</div>
    <div>{infoWallet.id}</div>
    <div>{infoWallet.ndns}</div>
  </div>
```




#### `isWeb3Injected`

Function to check if the browser supports Web3 provider injection.

| Function                      | result                                                     
| ----------------------------- | ------------------------------------------------------------- 
| `isWeb3Injected()`            | `boolean`


```jsx
import { isWeb3Injected } from "sdk-v2-egglepasskeywallet-decard";

  //Example
  <div> 
    {!isWeb3Injected() && <ButtonConnectWallet />}
  </div>

 // The way to create a ButtonConnectWallet will be in Advanced
```

## #Advanced
### Custom Button to Connect Wallet



#### #Required:  To customize the button to connect the wallet, you can set up one of the below providers.



#1 - [Documentation Provider AppKit ( web3modal)](https://docs.reown.com/appkit/overview) - recommended

Or

#2 - [Documentation Provider wagmi](https://wagmi.sh/react/getting-started)



```
#Target: 

- Connect wallet to browsers that do not support injected providers.
- If you are using Provider AppKit: Resolve the issue of using an older version without updating to the latest version.
- If you are using Provider wagmi: You only need a simple setup with wagmi.
=> Then follow these steps to create a custom connect button.
```

```jsx
// Step 1: Create a button to connect
import React from "react";
import { infoWallet } from "sdk-v2-egglepasskeywallet-decard";
import { useConnect, useConnectors, useSwitchChain } from "wagmi";

const ButtonConnectWallet = () => {
  const { connect } = useConnect();

  const { switchChainAsync } = useSwitchChain();
  const connectors = useConnectors();

  const handleConnect = async () => {
    const chainId = 137;

    await switchChainAsync({ chainId: chainId });// Switch to the chain you want to connect

    connectors.forEach((connector) => {
      if (connector.id === infoWallet.rdns) {
        connect({
          connector,
          chainId: chainId,
        });
      }
    });
  };

  return (
    <button
      onClick={async () => {
        await handleConnect();
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer",
        gap: "10px",
      }}
    >
      <img src={infoWallet.icon} width={20} height={20} />
      <div>{infoWallet.name}</div>
    </button>
  );
};

export default ButtonConnectWallet;
 
// Step 2: Use the connect button

import React from "react";
import { isWeb3Injected } from "sdk-v2-egglepasskeywallet-decard";
import ButtonConnectWallet from "./ButtonConnectWallet";// step 1

const YourComponent = () => {

  return (
    <>
         <ButtonConnectWallet />
    </>
  );
};

export default YourComponent;
```
