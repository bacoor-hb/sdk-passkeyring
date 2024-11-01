'use client'
import { OBSERVER_KEY } from '../constants/index'
import Observer from '../utils/observer'

import { OverlayContext } from '../Components/MyOverlay/OverlayContext'

import React, { useCallback, useContext } from 'react'

interface OverlayContextType {
  openOverlay: (options: {
    content?: any;
    height?: string;
    width?: string;
  }) => void;
  closeOverlay: (callbackFunction?: () => void) => void;
}

const useOverlay = () => {
  const { openOverlay: openD, closeOverlay: closeD } = useContext(OverlayContext)

  const openOverlay = useCallback(
    ({
      content = null as any | null,
      height,
      width = '100%',
    }) => {
      openD({
        content,
        height,
        width,
      })
    },
    [],
  )

  const closeOverlay = useCallback((callbackFunction = null) => {
    closeD
      ? closeD(callbackFunction)
      : Observer.emit(OBSERVER_KEY.HIDDEN_OVERLAY, {})
  }, [])

  return { closeOverlay, openOverlay }
}

export default useOverlay
