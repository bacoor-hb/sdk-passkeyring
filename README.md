# Passkey connect

> The sdk package provides a simple support connect Smart account.


## Install (for single position)

```bash
npm install --save sdk-passkeyring
```

```bash
yarn add sdk-passkeyring
```

## Usage
```jsx
//Used for the first file to run (index.js)
import React from "react";
import { PasskeyProvider } from "sdk-passkeyring";

const App = ({children}) => {

  return (
    <PasskeyProvider>
     {children}
    </PasskeyProvider>
  );
};

export default App;

```


```jsx
//example 
import React from "react";
import { useConnect, useAccount, PasskeyProvider } from "sdk-passkeyring";

const Home = () => {
  const { onConnect, isConnected, onDisconnect } = useConnect();
  const account = useAccount() ;
  const { address } = account;

  return (
    <div>
      {isConnected ? (
        <div>
          <h1>Connected</h1>
          <button
            onClick={() => {
              onConnect();
            }}
          >
            Address: {address}
          </button>
          <br />
          <button
            onClick={() => {
              onDisconnect();
            }}
          >
            disConnect
          </button>
        </div>
      ) : (
        <button onClick={onConnect}>Connect</button>
      )}
    </div>
  );
};

export default Home;

```


<!-- ## License -->

<!-- MIT © [HoDienCong12c5](https://github.com/CongSofwareEngineer) -->
