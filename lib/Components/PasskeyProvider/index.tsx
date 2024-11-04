'use client'
import React, { useState, ReactNode } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import '../../styles/index.css'
import FloatingActionButton from 'lib/Components/FloatingActionButton'
import PopupProvider from 'lib/Components/PopupProvider'
import { OverlayProvider } from 'lib/Components/MyOverlay/OverlayContext'
import AccountProvider from 'lib/Components/AccountProvider'

const queryClient = new QueryClient()

const PasskeyProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AccountProvider>
        <OverlayProvider>
          <FloatingActionButton />
          {children}
          <PopupProvider />
        </OverlayProvider>
      </AccountProvider>

    </QueryClientProvider>

  )
}

export default PasskeyProvider
