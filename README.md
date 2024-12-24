# Passkey connect

> The sdk package provides a simple support connect Smart account.

## Install (for single position)

```bash
npm install --save sdk-v2-egglepasskeywallet
```

```bash
yarn add sdk-v2-egglepasskeywallet
```

## Usage

```jsx
//Step Setup: MUST HAVE - Used for the first file to run (index.js)

//NOTE:You have setup AppKit(web3modal) in your dapp, make sure enableEIP6963 = true, enableInjected = true

//if you are using appkit(web3modal) with too old version then update to the latest appkit version

#### 📚 [Documentation AppKit](https://docs.reown.com/appkit/overview)

import React from "react";
import { PasskeyProvider } from "sdk-v2-egglepasskeywallet";

const App = ({ children }) => {
  return <PasskeyProvider>{children}</PasskeyProvider>;
};

export default App;
```

## 
## Export

#### PasskeyProvider
```jsx
import { PasskeyProvider } from "sdk-v2-egglepasskeywallet";
```

| Property                      | Description                                                     
| ----------------------------- | ------------------------------------------------------------- 
| `config`                      | config passkey

```jsx
PasskeyProvider is a wrapper that supports using wallets
```

```jsx
//Example

   <PasskeyProvider
        config={{
          rpc: {
            1337: "http://rpc...",
          },
        }}
      >
        {/*CODE HERE */}
      </PasskeyProvider>
```

#### infoWallet
```jsx
  import { infoWallet } from "sdk-v2-egglepasskeywallet";
```

| Property                      | Attribute                                                     
| ----------------------------- | ------------------------------------------------------------- 
| `infoWallet`                  | `ndns`
|                               | `name`
|                               | `icon`
|                               | `id`



#### isWeb3Injected
```jsx
import { isWeb3Injected } from "sdk-v2-egglepasskeywallet";
```
```jsx
Function check bowers support web3 provider injected
```



```jsx
//Example
<div> 
   {!isWeb3Injected() && <ButtonConnectWallet />}
</div>

 
```

## Support
```jsx
//If you want to connect wallet to browsers that do not support injected 
//or in case you are using appkit(web3modal) with too old version but you don't want to update to new version
//Then follow these steps.


//step 1 : create button to connect
import React from "react";
import { infoWallet } from "sdk-v2-egglepasskeywallet";
import { useConnect, useConnectors, useSwitchChain } from "wagmi";

const ButtonConnectWallet = () => {
  const { connect } = useConnect();

  const { switchChainAsync } = useSwitchChain();
  const connectors = useConnectors();

  const handleConnect = async () => {
    const chainId = 137;

    await switchChainAsync({ chainId: chainId }); //  switch to chain you want connect

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



//step 2:

import React from "react";
import { isWeb3Injected } from "sdk-v2-egglepasskeywallet";
import ButtonConnectWallet from "./ButtonConnectWallet";// step above
import { useWeb3Modal } from "@web3modal/wagmi/react";

const YourComponent = () => {
  const { open } = useWeb3Modal();

  return (
    <>
      {isWeb3Injected() ? (
        <div
          onClick={() => {
            open({ view: "Connect" });
          }}
        >
          Connect
        </div>
      ) : (
        <ButtonConnectWallet />
      )}
    </>
  );
};

export default YourComponent;






```
