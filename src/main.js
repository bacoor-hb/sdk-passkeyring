import { appKit, wagmiAdapter } from './config/appKit'
import { store } from './store/appkitStore'
import {  updateButtonVisibility } from './utils/dom'
import { signMessage, sendTx, getBalance } from './services/wallet'
import { initializeSubscribers } from './utils/suscribers'

// Initialize subscribers
initializeSubscribers(appKit)


document.getElementById('disconnect')?.addEventListener(
  'click', () => {
    appKit.disconnect()
  }
)

document.getElementById('sign-message')?.addEventListener(
  'click', async () => {
    const signature = await signMessage(store.eip155Provider, store.accountState.address)

    document.getElementById('signatureState').innerHTML = signature
    document.getElementById('signatureSection').style.display = ''
  }
)

document.getElementById('send-tx')?.addEventListener(
  'click', async () => {
    const tx = await sendTx(store.eip155Provider, store.accountState.address, wagmiAdapter.wagmiConfig)


    document.getElementById('txState').innerHTML = JSON.stringify(tx, null, 2)
    document.getElementById('txSection').style.display = ''
  }
)

document.getElementById('get-balance')?.addEventListener(
  'click', async () => {
    const balance = await getBalance(store.eip155Provider, store.accountState.address, wagmiAdapter.wagmiConfig)

    document.getElementById('balanceState').innerHTML = balance + ' POL'
    document.getElementById('balanceSection').style.display = ''
  }
)

document.addEventListener('DOMContentLoaded', function() {
  // Initial check
  // Set timeout here for development purposes only
  setTimeout(() => {
    updateButtonVisibility(appKit.getIsConnectedState());
  }, 3000);
}, false);
