export const updateStateDisplay = (elementId, state) => {
    const element = document.getElementById(elementId)
    if (element) {
      if (elementId === 'accountState') {
        element.innerHTML = JSON.stringify(state?.address || '', null, 2)
      } else {
        element.innerHTML = JSON.stringify(state, null, 2)
      }
    }
  }

  export const updateButtonVisibility = (isConnected) => {
    const connectedOnlyButtons = document.querySelectorAll('[data-connected-only]')
    connectedOnlyButtons.forEach(button => {
        if (!isConnected) button.style.display = 'none'
        else button.style.display = ''
    })
  }