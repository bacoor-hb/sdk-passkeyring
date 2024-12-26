# sdk-v2-keyringpasskeywallet

> The SDK package provides simple wallet connection support using passkey to interact with smart accounts, with a pre-setup AppKit (web3modal) provider.

## Required Setup Before Installing the SDK
### Install and Set Up AppKit (web3modal)
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

```bash
npm install --save sdk-v2-keyringpasskeywallet
```
or 

```bash
yarn add sdk-v2-keyringpasskeywallet
```


## Usage

```jsx
// MUST HAVE - Use this in the first file to run (index.js)

import React from "react";
import { PasskeyProvider } from "sdk-v2-keyringpasskeywallet";

const App = ({ children }) => {
  return <PasskeyProvider>{children}</PasskeyProvider>;
};

export default App;
```
## #Issue
```
If you have completed the above steps 
but your wallet is not listed in the AppKit (web3modal) modal
=> Please update AppKit to the latest version.
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


| Property                      | Description             | required           |Attribute                                  
| ----------------------------- | ----------------------- | -------------------|----------
| `config`                      | Config Passkey Provider |optional            |`rpcUrl`


```jsx

import { PasskeyProvider } from "sdk-v2-keyringpasskeywallet";

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
import { infoWallet } from "sdk-v2-keyringpasskeywallet";

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
import { isWeb3Injected } from "sdk-v2-keyringpasskeywallet";

  //Example
  <div> 
    {!isWeb3Injected() && <ButtonConnectWallet />}
  </div>

  //The way to create a ButtonConnectWallet will be in Advanced
```

## #Advanced
### Custom Button connect wallet



#### #Required: To customize the button to connect the wallet, you can set up one of the below providers. 



#1 - [Documentation Provider AppKit ( web3modal)](https://docs.reown.com/appkit/overview) - recommended

Or

#2 - [Documentation Provider wagmi](https://wagmi.sh/react/getting-started)



```
# Target:

- Connect a wallet to browsers that do not support injected wallets.
- If you are using Provider AppKit: This resolves the issue of using an older version without needing to update to the latest version.
- If you are using Provider wagmi: You only need a simple setup with wagmi.
=> Follow these steps to create a custom connect button.
```

```jsx
// Step 1: Create a button to connect
import React from "react";
import { infoWallet } from "sdk-v2-keyringpasskeywallet";
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
import { isWeb3Injected } from "sdk-v2-keyringpasskeywallet";
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
