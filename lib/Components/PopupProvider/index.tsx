import usePopupController from 'lib/hook/usePopupController'
import React from 'react'

const PopupProvider = () => {
  const { isShowPopup, openPopup, closePopup } = usePopupController()
  if (!isShowPopup) return null
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '100px',
        right: ' 20px',
        zIndex: '999',
      }}
    >
      PopupProvider
    </div>
  )
}

export default PopupProvider
