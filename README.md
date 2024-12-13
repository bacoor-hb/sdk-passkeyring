# Passkey connect

> The sdk package provides a simple support connect Smart account.


## Install (for single position)

```bash
npm install --save sdk-v2-egglegamewallet


```

```bash
yarn add sdk-v2-egglegamewallet
```

## Usage
```jsx
//Used for the first file to run (index.js)
import React from "react";
import { PasskeyProvider } from "sdk-v2-egglegamewallet";

const App = ({children}) => {

  return (
    <PasskeyProvider>
     {children}
    </PasskeyProvider>
  );
};

export default App;

```
