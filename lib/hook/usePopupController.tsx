import React from 'react'

const usePopupController = () => {
  const [isShowPopup, setIsShowPopup] = React.useState<boolean>(false)

  const openPopup = () => {
    setIsShowPopup(true)
  }
  const closePopup = () => {
    setIsShowPopup(false)
  }
  return { isShowPopup, openPopup, closePopup }
}

export default usePopupController
