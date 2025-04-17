import { createPublicClient, http, maxUint144, maxUint256, parseEther } from 'viem'
import { ethers } from 'ethers'
import {
  chainsSupported,
  GROUP_SLUG,
  infoGroup,
  RPC_DEFAULT,
  SDK_VERSION,
  STORAGE_KEY,
  TYPE_CLOSE_POPUP_GROUP_SLUG,
  URL_PASSKEY,
} from 'lib/constants'
import {
  convertChainIdToChainView,
  decodeBase64,
  encodeBase64,
  getVersionSdk,
  isObject,
  sleep,
} from 'lib/function'
import {
  EventHandler,
  I_TYPE_URL,
  RequestArguments,
  TYPE_ERROR,
  TYPE_REQUEST,
  WalletProvider,
} from 'lib/web3/type'
import { isMobile } from 'react-device-detect'
import { createProviderRpcError } from 'lib/web3/errors'
import EventEmitter from 'eventemitter3'

interface MyPasskeyWalletProviderProps {
  config?: any;
}

class MyPasskeyWalletProvider extends EventEmitter implements WalletProvider {
  name: string
  icon: string
  uuid: string
  version: string
  signer: any
  isMetaMask?: boolean
  private rpcUrl: { [key: number]: string }
  private permissions: Record<string, boolean> = {}
  private accounts: string[] = []
  private chainId: (typeof chainsSupported)[number] = '0x1' // Ethereum Mainnet
  private currentPopup: Window | null = null // Track the currently opened popup

  constructor (props?: MyPasskeyWalletProviderProps) {
    super()
    this.rpcUrl = isObject(props?.config?.rpcUrl, true)
      ? { ...RPC_DEFAULT, ...props?.config?.rpcUrl }
      : RPC_DEFAULT
    this.name = infoGroup[GROUP_SLUG].name
    this.icon = infoGroup[GROUP_SLUG].icon
    this.uuid = infoGroup[GROUP_SLUG].uuid
    this.version = SDK_VERSION
    this.isMetaMask = false
    this.init()
  }

  private async init () {
    try {
      if (this.accounts.length === 0) {
        const accountPasskey = localStorage.getItem(
          STORAGE_KEY.ACCOUNT_PASSKEY,
        )
        if (accountPasskey) {
          const accountPasskeyParse = JSON.parse(accountPasskey)
          this.accounts = [accountPasskeyParse.address]
          this.chainId = accountPasskeyParse.chainId || this.chainId
          this.version = getVersionSdk(false)
          await this.createProviderWeb3()
          this.emit('connect', { chainId: this.chainId })
          this.emit('accountsChanged', this.accounts)
          this.emit('chainChanged', this.chainId)
        }
      }
      const formatNameGroup = GROUP_SLUG.charAt(0).toUpperCase() + GROUP_SLUG.slice(1)
      ;(this as any)[`is${formatNameGroup}`] = true
    } catch (error) {
      console.log('🚀 ~ init ~ error:', error)
    }
  }

  request = async ({ method, params = [] }: RequestArguments): Promise<any> => {
    console.log('🚀 ~ MyPasskeyWalletProvider ~ request ~ method:', method)
    console.log('🚀 ~ MyPasskeyWalletProvider ~ request ~ params', params)
    switch (method) {
      case 'wallet_requestPermissions':
        return this.requestPermissions(params)
      case 'eth_requestAccounts':
        return this.enable()
      case 'eth_accounts':
        return this.getAccounts()
      case 'eth_chainId':
        return this.getChainId()
      case 'net_version':
        return Number(this.chainId.toString())
      case 'wallet_getNetwork':
        return this.getNetwork()
      case 'eth_sendTransaction':
      case 'wallet_sendCalls':
        return this.sendTransaction(params)
      case 'eth_sign':
        return this.signMessage(params)
      case 'personal_sign':
        return this.personalSign(params)
      case 'eth_signTypedData':
      case 'eth_signTypedData_v1':
      case 'eth_signTypedData_v3':
      case 'eth_signTypedData_v4':
        return this.signTypedData(method, params)
      case 'eth_signTransaction':
        return this.signTransaction(params)
      case 'eth_subscribe':
        return this.subscribe(params)
      case 'eth_unsubscribe':
        return this.unsubscribe(params)
      case 'wallet_switchEthereumChain':
        return this.switchEthereumChain(params)
      case 'wallet_addEthereumChain':
        return this.addEthereumChain(params)
      case 'eth_estimateGas':
        return this.estimateGas(params)
      // case 'eth_gasPrice':
      //   return this.getGasPrice()
      // case 'eth_blockNumber':
      //   return this.getBlockNumber()
      // case 'eth_getBalance':
      //   return this.getBalance(params)
      // case 'eth_getTransactionByHash':
      //   return this.getTransactionByHash(params)
      // case 'eth_getTransactionReceipt':
      //   return this.getTransactionReceipt(params)
      // case 'eth_getCode':
      //   return this.getCode(params?.[0])
      // case 'eth_getTransactionCount':
      //   return this.getTransactionCount(params?.[0], params?.[1] || 'latest')
      case 'disconnect':
      case 'wallet_revokePermissions':
        return this.disconnect()
      case 'wallet_showCallsStatus':
        return this.showCallsStatus()
      case 'wallet_getCapabilities':
        return this.getCapabilities()
      case 'eth_ecRecover':
        return this.ecRecover(params)
      case 'personal_ecRecover':
        return this.personalEcRecover(params)
      case 'wallet_grantPermissions':
        return this.grantPermissions(params)
      default:
        return this.proxyRequest(method, params)
    }
  }

  private async requestPermissions (params: any[]): Promise<any> {
    // Define supported permissions
    const supportedPermissions = ['eth_accounts', 'eth_chainId']

    // Validate requested permissions
    const requestedPermissions =
      params[0]?.permissions ||
      (params?.length > 0 && params?.map((obj) => Object.keys(obj)[0])) ||
      []
    const invalidPermissions = requestedPermissions.filter(
      (perm: string) => !supportedPermissions.includes(perm),
    )

    if (invalidPermissions.length > 0) {
      throw new Error(
        `Unsupported permissions requested: ${invalidPermissions.join(', ')}`,
      )
    }

    // Simulate user approval (replace with actual UI prompt for production)
    const grantedPermissions = requestedPermissions.reduce(
      (acc: Record<string, boolean>, perm: string) => {
        acc[perm] = true
        return acc
      },
      {},
    )

    // Persist granted permissions
    this.permissions = { ...this.permissions, ...grantedPermissions }
    localStorage.setItem(
      STORAGE_KEY.PERMISSIONS_PASSKEY,
      JSON.stringify(this.permissions),
    )

    return {
      permissions: this.permissions,
    }
  }

  // Add a method to retrieve current permissions
  private getPermissions (): Record<string, boolean> {
    return this.permissions
  }

  private getUrl (type?: I_TYPE_URL): string {
    switch (type) {
      case TYPE_REQUEST.LOGIN:
        return `${URL_PASSKEY}/activate-by-passkey/${GROUP_SLUG}`
      case TYPE_REQUEST.SEND_TRANSACTION:
      case TYPE_REQUEST.PERSONAL_SIGN:
      case TYPE_REQUEST.SIGN_TYPED_DATA:
      case TYPE_REQUEST.SIGN_TRANSACTION:
        return `${URL_PASSKEY}/${GROUP_SLUG}/mypage/${this.accounts[0]}`
      default:
        if (this.accounts.length > 0) {
          return `${URL_PASSKEY}/${GROUP_SLUG}/mypage/${this.accounts[0]}`
        }
        return `${URL_PASSKEY}/activate-by-passkey/${GROUP_SLUG}`
    }
  }

  private getFavicon () {
    const link = document.querySelector("link[rel~='icon']")
    return link ? (link as HTMLLinkElement).href : `${URL_PASSKEY}/favicon.ico` // Trả về favicon mặc định nếu không tìm thấy
  }

  async openPopup (
    type?: I_TYPE_URL,
    query?: { [key: string]: any },
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const infoPageConnected = {
        site: window.location.origin,
        icon: this.getFavicon(),
        timeStamp: Date.now(),
        expiry: Date.now() + 1000 * 60 * 5,
      }
      const url = this.getUrl(type)

      const width = 470
      const height = 800
      let left: number, top: number

      if (type === TYPE_REQUEST.LOGIN) {
        left = window.innerWidth / 2 - width / 2 + window.screenX
        top = window.innerHeight / 2 - height / 2 + window.screenY
      } else {
        left = window.screenX + window.innerWidth - width
        top = window.screenY
      }

      if (isObject(query, true)) {
        query = {
          ...query,
          infoPageConnected,
          id: Date.now(),
          type_request: type,
        }
      }

      const encodedQuery = encodeBase64(query)
      let urlWithQuery = ''
      switch (type) {
        case TYPE_REQUEST.SEND_TRANSACTION:
          urlWithQuery = `${url}?raw-transaction=${encodedQuery}`
          break
        case TYPE_REQUEST.PERSONAL_SIGN:
          urlWithQuery = `${url}?sign-message=${encodedQuery}`
          break
        case TYPE_REQUEST.SIGN_TYPED_DATA:
          urlWithQuery = `${url}?sign-typed-data=${encodedQuery}`
          break
        case TYPE_REQUEST.SIGN_TRANSACTION:
          urlWithQuery = `${url}?sign-transaction=${encodedQuery}`
          break
        default:
          urlWithQuery = ''
          break
      }

      const urlFinal = encodedQuery ? urlWithQuery : url

      if (this.currentPopup && !this.currentPopup.closed && isMobile) {
        this.currentPopup.close()
      }

      const popup = window.open(
        urlFinal,
        `${GROUP_SLUG}`,
        `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=${width},height=${height},top=${top},left=${left}`,
      )

      if (!popup) {
        reject(new Error('Pop-up window failed to open'))
        return
      }

      this.currentPopup = popup

      const handleMessage = (event: MessageEvent) => {
        if (
          event?.data?.type === TYPE_CLOSE_POPUP_GROUP_SLUG &&
          popup &&
          !popup.closed
        ) {
          popup.close()
        }
      }

      window.removeEventListener('message', handleMessage)
      window.addEventListener('message', handleMessage)

      const interval = setInterval(() => {
        if (popup.closed) {
          clearInterval(interval)
          reject(new Error('Popup closed before completing authentication'))
        }
      }, 1000)

      window.addEventListener('message', function onMessage (event) {
        if (event.origin !== new URL(URL_PASSKEY).origin) {
          return
        }

        if (event?.data) {
          clearInterval(interval)
          window.removeEventListener('message', onMessage)
          resolve({ data: event.data })
          const closePopupAfterDone = event?.data?.closePopupAfterDone
          if (isMobile || closePopupAfterDone) {
            popup.close()
          }
        }
      })
    })
  }

  connect = (): Promise<string[]> => {
    return this.enable()
  }

  private async enable (): Promise<string[]> {
    try {
      const typeRequest = TYPE_REQUEST.LOGIN
      const { data } = await this.openPopup(typeRequest)

      // Xử lý kết quả trả về từ popup
      this.accounts = [data.addressPasskey] // Giả sử popup trả về thông tin account

      localStorage.setItem(
        STORAGE_KEY.ACCOUNT_PASSKEY,
        JSON.stringify({ address: this.accounts[0], chainId: this.chainId }),
      )

      await this.createProviderWeb3()

      this.emit('connect', { chainId: this.chainId })
      this.emit('accountsChanged', this.accounts)
      return this.accounts
    } catch (error) {
      console.error('Error during enable:', error)
      throw error
    }
  }

  disconnect = async (): Promise<void> => {
    this.accounts = []
    localStorage.removeItem(STORAGE_KEY.ACCOUNT_PASSKEY)
    localStorage.removeItem(STORAGE_KEY.PERMISSIONS_PASSKEY)

    const message = createProviderRpcError(
      'The Provider is disconnected',
      4900,
    )

    this.emit('accountsChanged', [])
    this.emit('disconnect', message)

    if (this.currentPopup && !this.currentPopup.closed) {
      this.currentPopup.close()
    }
  }

  selectedAddress = (): string | null => {
    return this.accounts.length > 0 ? this.accounts[0] : null
  }

  networkVersion = (): string | null => {
    return this.chainId ? BigInt(this.chainId).toString() : null
  }

  private async getAccounts (): Promise<string[]> {
    return this.accounts
  }

  private async getChainId (): Promise<string> {
    return this.chainId
  }

  private async sendTransaction (params: any[]): Promise<string | undefined> {
    const typeRequest = TYPE_REQUEST.SEND_TRANSACTION

    const tx = params[0]

    if (!tx.chainId) {
      tx.chainId = this.chainId
    }

    const { data } = await this.openPopup(typeRequest, { transaction: tx })

    if (data.type === TYPE_ERROR.ERROR_TRANSACTION) {
      throw new Error(data.payload?.message || 'Error send transaction')
    }
    if (data.type === typeRequest) {
      return data?.payload?.hash
    }
  }

  private async signMessage (params: any[]): Promise<any> {
    return this.personalSign([params[1], params[0]])
  }

  private async personalSign (params: any[]): Promise<string | undefined> {
    const typeRequest = TYPE_REQUEST.PERSONAL_SIGN
    const { data } = await this.openPopup(typeRequest, {
      chainId: this.chainId,
      message: params[0],
      account: params[1],
    })
    if (data.type === TYPE_ERROR.ERROR_TRANSACTION) {
      throw createProviderRpcError(
        data?.payload?.message || 'Error sign message',
        data?.payload?.code || 4001,
        data?.payload?.data,
      )
    }
    if (data.type === typeRequest) {
      return data?.payload?.signature
    }
  }

  private async signTypedData (
    method: string,
    params: any[],
  ): Promise<string | undefined> {
    const typeRequest = TYPE_REQUEST.SIGN_TYPED_DATA

    if (!Array.isArray(params)) {
      throw createProviderRpcError(
        'No transactions provided or invalid format.',
        4001,
      )
    }

    const address = params[method === 'eth_signTypedData_v1' ? 1 : 0]
    const rawData = params[method === 'eth_signTypedData_v1' ? 0 : 1]
    const { data } = await this.openPopup(typeRequest, {
      chainId: this.chainId,
      account: address,
      message: rawData,
      addPrefix: false,
    })

    if (data.type === TYPE_ERROR.ERROR_TRANSACTION) {
      throw createProviderRpcError(
        data?.payload?.message || 'Error sign message',
        data?.payload?.code || 4001,
        data?.payload?.data,
      )
    }
    if (data.type === typeRequest) {
      return data?.payload.signature
    }
  }

  private async signTransaction (params: any[]): Promise<string | undefined> {
    const typeRequest = TYPE_REQUEST.SIGN_TRANSACTION

    if (!Array.isArray(params)) {
      throw createProviderRpcError(
        'No transactions provided or invalid format.',
        4001,
      )
    }

    const tx = params[0]

    if (!tx.chainId) {
      tx.chainId = this.chainId
    }

    const { data } = await this.openPopup(typeRequest, {
      chainId: this.chainId,
      account: this.accounts[0],
      transaction: tx,
    })

    if (data.type === TYPE_ERROR.ERROR_TRANSACTION) {
      throw createProviderRpcError(
        data?.payload?.message || 'Error send transaction',
        data?.payload?.code || 4001,
        data?.payload?.data,
      )
    }
    if (data.type === typeRequest) {
      return data?.payload?.signature
    }
  }

  private async subscribe (params: any[]): Promise<string> {
    // return 'subscriptionId'
    throw new Error('Unsupported method subscribe')
  }

  private async unsubscribe (params: any[]): Promise<boolean> {
    // return true
    throw new Error('Unsupported method unsubscribe')
  }

  private async switchEthereumChain (params: any[]): Promise<void> {
    const chainId = params[0].chainId

    if (!chainsSupported.includes(chainId)) {
      throw createProviderRpcError(`Unsupported chainId: ${chainId}`, 4001)
    }

    this.chainId = chainId
    localStorage.setItem(
      STORAGE_KEY.ACCOUNT_PASSKEY,
      JSON.stringify({ address: this.accounts[0], chainId }),
    )

    // Kích hoạt sự kiện chainChanged
    this.emit('chainChanged', chainId)
  }

  private async addEthereumChain (params: any[]): Promise<void> {
    throw createProviderRpcError('Unsupported method addEthereumChain', 4200)
  }

  private async estimateGas (params: any[]): Promise<any> {
    try {
      const publicClient = await this.createPublicClientViem()
      const rawTransaction = params[0]
      const account = rawTransaction.from

      const data = await publicClient.estimateGas({
        account,
        data: rawTransaction.data,
        to: rawTransaction.to,
        value: rawTransaction.value,
        stateOverride: [
          {
            address: account,
            balance: maxUint256,

          },
        ],
      })

      return data
    } catch (error) {
      throw createProviderRpcError(
        'Error in estimateGas',
        4001,
        error,
      )
    }
  }

  private async createProviderWeb3 (url?: string | undefined): Promise<any> {
    const rpc =
      url ||
      this.rpcUrl?.[Number(this.chainId)] ||
      RPC_DEFAULT[Number(this.chainId) as keyof typeof RPC_DEFAULT]
    const provider = new ethers.providers.JsonRpcProvider(rpc)
    this.signer = provider.getSigner()
    return provider
  }

  private async getGasPrice (): Promise<string> {
    const provider = await this.createProviderWeb3()
    const gasPrice = await provider.getGasPrice()
    return gasPrice
  }

  private async getBlockNumber (): Promise<string> {
    const provider = await this.createProviderWeb3()
    const blockNumber = await provider.getBlockNumber()
    return blockNumber
  }

  private async getBalance (
    params: any[],
  ): Promise<string | ethers.BigNumber | bigint> {
    const [address, blockNumber] = params
    const provider = await this.createProviderWeb3()
    const balance = await provider.getBalance(address, blockNumber)
    return BigInt(balance.toString())
  }

  private async getTransactionByHash (params: any[]): Promise<any> {
    try {
      const [transactionHash] = params
      if (!transactionHash) {
        throw createProviderRpcError('Transaction hash is required.', 4001)
      }

      const provider = await this.createProviderWeb3()
      const transaction = await provider.getTransaction(transactionHash)

      if (!transaction) {
        throw createProviderRpcError(
          `Transaction not found for hash: ${transactionHash}`, 4001,
        )
      }

      return transaction
    } catch (error) {
      throw createProviderRpcError(
        'Error in getTransactionByHash:',
        4001,
        error,
      )
    }
  }

  private async getTransactionReceipt (params: any[]): Promise<any> {
    try {
      const [transactionHash] = params
      if (!transactionHash) {
        throw createProviderRpcError('Transaction hash is required.', 4001)
      }

      const provider = await this.createProviderWeb3()
      const receipt = await provider.getTransactionReceipt(transactionHash)

      if (!receipt) {
        throw createProviderRpcError(
          `Transaction receipt not found for hash: ${transactionHash}`,
          4001,
        )
      }

      return receipt
    } catch (error) {
      throw createProviderRpcError(
        'Error in getTransactionReceipt:',
        4001,
        error,
      )
    }
  }

  private async getCode (address: string): Promise<string> {
    try {
      // Kiểm tra đầu vào hợp lệ
      if (!address || typeof address !== 'string') {
        throw createProviderRpcError(
          'A valid address is required to get the code.',
          4001,
        )
      }

      const provider = await this.createProviderWeb3()

      // Lấy bytecode của địa chỉ
      const code = await provider.getCode(address)

      // Trả về bytecode (hex string)
      return code
    } catch (error) {
      throw createProviderRpcError('Error in getCode', 4001, error)
    }
  }

  private async getTransactionCount (
    address: string,
    blockTag: string = 'latest',
  ): Promise<number> {
    try {
      if (!address || typeof address !== 'string') {
        throw createProviderRpcError(
          'A valid address is required to get the transaction count.',
          4001,
        )
      }

      const provider = await this.createProviderWeb3()
      const count = await provider.getTransactionCount(address, blockTag)
      return count
    } catch (error) {
      throw createProviderRpcError('Error in getTransactionCount', 4001, error)
    }
  }

  private async getNetwork (): Promise<any> {
    try {
      const provider = await this.createProviderWeb3()

      const network = await provider.getNetwork()

      return network
    } catch (error) {
      throw createProviderRpcError('Error in getNetwork', 4001, error)
    }
  }

  private async showCallsStatus (): Promise<any> {
    return {
      connected: this.accounts.length > 0,
      accounts: this.accounts,
      chainId: this.chainId,
      permissions: this.permissions,
    }
  }

  private async getCapabilities (): Promise<string[]> {
    return [
      'eth_accounts',
      'eth_chainId',
      'eth_sendTransaction',
      'personal_sign',
      'eth_signTypedData',
      'wallet_getCapabilities',
      'eth_ecRecover',
      'personal_ecRecover',
      'wallet_showCallsStatus',
    ]
  }

  private async ecRecover (params: any[]): Promise<string> {
    const [message, signature] = params
    if (!message || !signature) {
      throw createProviderRpcError(
        'Message and signature are required for ecRecover.',
        4001,
      )
    }

    const address = ethers.utils.verifyMessage(message, signature)
    return address
  }

  private async personalEcRecover (params: any[]): Promise<string> {
    const [message, signature] = params
    if (!message || !signature) {
      throw createProviderRpcError(
        'Message and signature are required for personalEcRecover.',
        4001,
      )
    }

    const prefixedMessage = ethers.utils.hashMessage(message)
    const address = ethers.utils.recoverAddress(prefixedMessage, signature)
    return address
  }

  private async grantPermissions (params: any[]): Promise<any> {
    try {
      const requestedPermissions = params[0]?.permissions || []

      if (!Array.isArray(requestedPermissions)) {
        throw createProviderRpcError(
          'Invalid permissions format. Expected an array.',
          4001,
        )
      }

      // user approval
      const grantedPermissions = requestedPermissions.reduce(
        (acc: Record<string, boolean>, permission: string) => {
          acc[permission] = true
          return acc
        },
        {},
      )

      this.permissions = { ...this.permissions, ...grantedPermissions }

      localStorage.setItem(
        STORAGE_KEY.PERMISSIONS_PASSKEY,
        JSON.stringify(this.permissions),
      )

      return {
        permissions: this.permissions,
      }
    } catch (error) {
      throw createProviderRpcError('Error in grantPermissions', 4001, error)
    }
  }

  private async createPublicClientViem () {
    const provider = await this.createProviderWeb3()
    const client = createPublicClient({
      chain: convertChainIdToChainView(this.chainId),
      transport: http(provider.connection.url),
    })
    return client
  }

  private async proxyRequest (method: string, params: any[]): Promise<any> {
    try {
      const provider = await this.createProviderWeb3()

      const client = createPublicClient({
        chain: convertChainIdToChainView(this.chainId),
        transport: http(provider.connection.url),
      })
      const res = await client.request({
        method: method as keyof (typeof client)['request'],
        params: params as any,
      })

      return res
    } catch (error) {
      console.log('🚀 ~ MyPasskeyWalletProvider ~ proxyRequest ~ error:', error)
      throw createProviderRpcError(
        `Error in proxyRequest: method ${method}`,
        4001,
        error,
      )
    }
  }

  on = <T extends string | symbol>(
    event: T,
    listener: (...args: any[]) => void,
  ): this => {
    return super.on(event, listener)
  }

  removeListener = <T extends string | symbol>(
    event: T,
    listener?: (...args: any[]) => void,
  ): this => {
    return super.removeListener(event, listener)
  }
}

const isWeb3Injected = () => {
  return (
    typeof window !== 'undefined' && typeof window?.ethereum !== 'undefined'
  )
}

export { MyPasskeyWalletProvider, isWeb3Injected }
