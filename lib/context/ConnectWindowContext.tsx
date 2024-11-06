import React, { createContext, useState, useContext, ReactNode, useRef } from 'react'

interface ConnectWindowContextProps {
  connectWindow: React.MutableRefObject<Window | null>;
  setConnectWindow: (window: Window | null) => void;
}

const ConnectWindowContext = createContext<ConnectWindowContextProps | undefined>(undefined)

export const ConnectWindowProvider = ({ children }: { children: ReactNode }) => {
  const connectWindow = useRef<Window | null>(null)
  const setConnectWindow = (window: Window | null) => {
    connectWindow.current = window
  }

  return (
    <ConnectWindowContext.Provider value={{ connectWindow, setConnectWindow }}>
      {children}
    </ConnectWindowContext.Provider>
  )
}

export const useConnectWindow = () => {
  const context = useContext(ConnectWindowContext)
  if (context === undefined) {
    throw new Error('useConnectWindow must be used within a ConnectWindowProvider')
  }
  return context
}
