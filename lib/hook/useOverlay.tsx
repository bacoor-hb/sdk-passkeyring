'use client'
import { OBSERVER_KEY } from '../constants/index'
import Observer from '../utils/observer'

import { OverlayContext } from '../Components/MyOverlay/OverlayContext'

import React, { useCallback, useContext, useState } from 'react'

interface OverlayContextType {
  openOverlay: (options: {
    content?: any;
    height?: string;
    width?: string;
  }) => void;
  closeOverlay: (callbackFunction?: () => void) => void;
  isOpen: boolean;
}

const useOverlay = () => {
  const { openOverlay: openD, closeOverlay: closeD } = useContext(OverlayContext)
  const [isOpen, setIsOpen] = useState(false)
  const openOverlay = useCallback(
    ({
      content = null as any | null,
      height,
      width,
    }) => {
      setIsOpen(true)
      openD({
        content,
        height,
        width,
      })
    },
    [],
  )

  const closeOverlay = useCallback((callbackFunction = null) => {
    setIsOpen(false)
    closeD
      ? closeD(callbackFunction)
      : Observer.emit(OBSERVER_KEY.HIDDEN_OVERLAY, {})
  }, [])

  return { closeOverlay, openOverlay, isOpen }
}

export default useOverlay
