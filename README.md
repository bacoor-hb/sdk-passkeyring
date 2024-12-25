# Passkey connect

> The sdk package provides a simple wallet connection support using passkey to interact with smart account, with pre-setup Appkit ( web3modal) provider

## Install (for single position)

```bash
npm install --save sdk-v2-egglegamewallet
```

```bash
yarn add sdk-v2-egglegamewallet
```

## Install AppKit ( web3modal )

📚 [Documentation AppKit](https://docs.reown.com/appkit/overview)

If you prefer referring to a video tutorial for this, please click below 👇

[![IMAGE ALT TEXT HERE](https://i.ytimg.com/vi/lxTGqXh7LiA/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDOS4gcXwP9GEZB4-Qei0TW-E4z7Q)](https://youtu.be/lxTGqXh7LiA)

## Usage

```jsx

//NOTE:You have setup AppKit(web3modal) in your dapp, make sure enableEIP6963 = true, enableInjected = true

//Step Setup: MUST HAVE - Used for the first file to run (index.js)

//if you are using Appkit(web3modal) with too old version then update to the latest Appkit version



import React from "react";
import { PasskeyProvider } from "sdk-v2-egglegamewallet";

const App = ({ children }) => {
  return <PasskeyProvider>{children}</PasskeyProvider>;
};

export default App;
```

## 
## Export

#### PasskeyProvider
```jsx
import { PasskeyProvider } from "sdk-v2-egglegamewallet";
```

| Property                      | Description             | required                                             
| ----------------------------- | ----------------------- | -----------------------------
| `config`                      | config passkey          |`optional`

```jsx
PasskeyProvider is a wrapper that supports using wallets
```

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
```jsx
  import { infoWallet } from "sdk-v2-egglegamewallet";
```

| Property                      | Attribute                                                     
| ----------------------------- | ------------------------------------------------------------- 
| `infoWallet`                  | `ndns`
|                               | `name`
|                               | `icon`
|                               | `id`



#### isWeb3Injected
```jsx
import { isWeb3Injected } from "sdk-v2-egglegamewallet";
```
```jsx
Function check browsers support web3 provider injected
```



```jsx
//Example
<div> 
   {!isWeb3Injected() && <ButtonConnectWallet />}
</div>

//If you want. The way to create a ButtonConnectWallet will be in the step below

 
```

## Support

if you don't want use provider AppKit(web3modal),

📚 [Documentation Provider AppKit](https://docs.reown.com/appkit/overview)

then you can also use wagmi provider

📚 [Documentation Provider wagmi](https://wagmi.sh/react/getting-started)



```jsx
//After you have set up one of the above providers
//If you want to connect wallet to browsers that do not support injected 
//or in case you are using Appkit(web3modal)/wagmi with too old version but you don't want to update to new version
// => will create a custom connect button
//Then follow these steps.


//step 1 : create button to connect
import React from "react";
import { infoWallet } from "sdk-v2-egglegamewallet";
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
import { isWeb3Injected } from "sdk-v2-egglegamewallet";
import ButtonConnectWallet from "./ButtonConnectWallet";// step above

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
