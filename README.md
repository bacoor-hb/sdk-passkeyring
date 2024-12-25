# sdk-v2-egglepasskeywallet-decard


> The sdk package provides a simple wallet connection support using passkey to interact with smart account, with pre-setup AppKit( web3modal) provider

## Required setup before install sdk
### Install and setup AppKit( web3modal)
#### ⚠ If you have already set it up, skip this step.



📚 [Documentation AppKit](https://docs.reown.com/appkit/overview)

```
If you prefer referring to a video tutorial for this,
please click below 👇
```





[![IMAGE ALT TEXT HERE](https://i.ytimg.com/vi/lxTGqXh7LiA/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDOS4gcXwP9GEZB4-Qei0TW-E4z7Q)](https://youtu.be/lxTGqXh7LiA)

```
NOTE: In step create the modal of web3modal,
make sure enableEIP6963 = true, enableInjected = true
```

```jsx
//example
const modal = createAppKit({
...yourConfig
  enableEIP6963:true,
  enableInjected:true
})
```


## Install (for single position)

```bash
npm install --save sdk-v2-egglepasskeywallet-decard
```
or 

```bash
yarn add sdk-v2-egglepasskeywallet-decard
```


## Usage
```
NOTE:You have setup AppKit(web3modal) in your dapp,
In step create the modal of web3modal, 
make sure enableEIP6963 = true, enableInjected = true
```

```jsx
//MUST HAVE - Used for the first file to run (index.js)

import React from "react";
import { PasskeyProvider } from "sdk-v2-egglepasskeywallet-decard";

const App = ({ children }) => {
  return <PasskeyProvider>{children}</PasskeyProvider>;
};

export default App;
```
```
In case you have done the above steps,
but your wallet is not listed on modal of AppKit( web3modal)
=>Please update the AppKit to the latest version.
```

## 
### Import

#### PasskeyProvider

PasskeyProvider is a wrapper that supports using wallets

```jsx
import { PasskeyProvider } from "sdk-v2-egglepasskeywallet-decard";
```

| Property                      | Description             | required           |Attribute                                  
| ----------------------------- | ----------------------- | -------------------|----------
| `config`                      | Config Passkey Provider       |optional|`rpcUrl`



```jsx
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

#### infoWallet
Information about wallet
```jsx
  import { infoWallet } from "sdk-v2-egglepasskeywallet-decard";
```

| Property                      | Attribute                                                     
| ----------------------------- | ------------------------------------------------------------- 
| `infoWallet`                  | `ndns`
|                               | `name`
|                               | `icon`
|                               | `id`



#### isWeb3Injected

Function check browsers support web3 provider injected

```jsx
import { isWeb3Injected } from "sdk-v2-egglepasskeywallet-decard";
```



```jsx
//Example
<div> 
   {!isWeb3Injected() && <ButtonConnectWallet />}
</div>

//If you want. The way to create a ButtonConnectWallet will be in Advanced

 
```

## Advanced
### Custom Button connect wallet

if you don't want use provider AppKit(web3modal),

📚 [Documentation Provider AppKit](https://docs.reown.com/appkit/overview)

then you can also use wagmi provider

📚 [Documentation Provider wagmi](https://wagmi.sh/react/getting-started)


```
- After you have set up one of the above providers
- If you want to connect wallet to browsers that do not support injected 
or in case you are using AppKit(web3modal)/wagmi with too old version but you don't want to update to new version
=> will create a custom connect button
Then follow these steps.
```

```jsx
//step 1 : create button to connect
import React from "react";
import { infoWallet } from "sdk-v2-egglepasskeywallet-decard";
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
 
//step 2: use button connect

import React from "react";
import { isWeb3Injected } from "sdk-v2-egglepasskeywallet-decard";
import ButtonConnectWallet from "./ButtonConnectWallet";// step 1

const YourComponent = () => {

  return (
    <>
      {!isWeb3Injected() && (
         <ButtonConnectWallet />
      )
       }
    </>
  );
};

export default YourComponent;
```
