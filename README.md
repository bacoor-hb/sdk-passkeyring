# Passkey connect

> The sdk package provides a simple support connect Smart account.


## Install (for single position)

```bash
npm install --save sdk-v2-passkeywallet


```

```bash
yarn add sdk-v2-passkeywallet
```

## Usage
```jsx
//Used for the first file to run (index.js)
import React from "react";
import { PasskeyProvider } from "sdk-v2-passkeywallet";

const App = ({children}) => {

  return (
    <PasskeyProvider>
     {children}
    </PasskeyProvider>
  );
};

export default App;

```
