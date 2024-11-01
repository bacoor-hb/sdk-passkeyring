
import { base64URLStringToBuffer, bufferToBase64URLString, startAuthentication, startRegistration } from '@simplewebauthn/browser'
// import { toHex } from 'viem'
import { parseSignature } from './utils'
import { BaseAPI } from 'lib/services/api/BaseAPI'

type GroupSlug = string

interface RegisterParams {
  username: string,
  groupSlug: GroupSlug
}
export default class PasskeyWalletAuthentication {
  static async register ({ username, groupSlug }: RegisterParams) {
    try {
      const resOptions = await BaseAPI.put('/passkey/register', { username, groupSlug })
      if (!resOptions?.data?.data) {
        throw new Error('Cannot get registration options')
      }
      console.log('🚀 ~ PasskeyWalletAuthentication ~ register ~ resOptions:', resOptions)
      const options = resOptions?.data?.data?.options
      console.log('🚀 ~ PasskeyWalletAuthentication ~ register ~ options:', options)

      if (!options || !options.challenge) {
        throw new Error('Invalid registration options: missing challenge')
      }

      const cred = await startRegistration(options)
      const resRegister = await BaseAPI.post('/passkey/register', {
        userId: resOptions?.data?.data?.userId,
        username,
        cred,
      })

      return {
        ...resRegister?.data?.data,
      }
    } catch (error) {
      console.log('🚀 ~ PasskeyWalletAuthentication ~ register ~ error:', error)
      throw error
    }
  }

  /**
   *
   * @param {*} groupSlug
   * @param {*} options
   * @param {*} options.filterIdCredential : boolean
   * @param {*} options.listFilterIdCredential
   * listFilterIdCredential: [
   * {
   * id: 'id',
   * type: 'public-key'
   * }
   * @returns
   */
  static async login (groupSlug: GroupSlug, options = {
    includesLoginCredential: false,
    filterIdCredential: false,
    listFilterIdCredential: [],
  }) {
    // const { includesLoginCredential, filterIdCredential, listFilterIdCredential } = options
    // const resOptions = await BaseAPI.get(`/passkey/login/${groupSlug}`)

    // if (!resOptions?.data?.data) {
    //   throw new Error('Cannot get login options')
    // }

    // const userGroupData = ReduxServices.getReduxDataByKey('userGroupData') || {}

    // const { idCre } = userGroupData

    // let listFilterIdCredentialFinal = []

    // if (idCre) {
    //   listFilterIdCredentialFinal.push({
    //     id: idCre,
    //     type: 'public-key'
    //   })
    // }
    // if (listFilterIdCredential?.length > 0) {
    //   listFilterIdCredentialFinal = listFilterIdCredentialFinal.concat(listFilterIdCredential)
    // }

    // const optionsJSON = {
    //   ...resOptions.data?.data,
    //   ...(listFilterIdCredentialFinal?.length > 0 && filterIdCredential) ? {
    //     allowCredentials: listFilterIdCredentialFinal
    //   } : {}
    // }

    // const loginCred = await startAuthentication(optionsJSON)

    // if (!loginCred) {
    //   throw Error('Error when authenticating credential!')
    // }

    // const resLogin = await BaseAPI.post('/passkey/login', { cred: loginCred })

    // if (!resLogin.data?.data) {
    //   throw Error('Error when verifying credential!')
    // }

    // return { ...resLogin?.data?.data, ...includesLoginCredential ? { loginCred } : {} }
  }

  /**
   *
   * @param {*} groupSlug
   * @param {*} options
   * @param {*} options.filterIdCredential : boolean
   * @param {*} options.listFilterIdCredential
   * listFilterIdCredential: [
   * {
   * id: 'id',
   * type: 'public-key'
   * }
   * @returns
   */
  static async verify (
    groupSlug: GroupSlug,
    options = {
      filterIdCredential: false,
      listFilterIdCredential: [],
    },
  ) {
    // const { filterIdCredential, listFilterIdCredential } = options
    // const resOptions = await BaseAPI.get(`/passkey/login/${groupSlug}`)

    // if (!resOptions?.data?.data) {
    //   throw new Error('Cannot get login options')
    // }
    // const userGroupData = ReduxServices.getReduxDataByKey('userGroupData') || {}

    // const { idCre } = userGroupData

    // let listFilterIdCredentialFinal = []

    // if (idCre) {
    //   listFilterIdCredentialFinal.push({
    //     id: idCre,
    //     type: 'public-key',
    //   })
    // }
    // if (listFilterIdCredential?.length > 0) {
    //   listFilterIdCredentialFinal = listFilterIdCredentialFinal.concat(listFilterIdCredential)
    // }

    // const optionsJSON = {
    //   ...resOptions.data?.data,
    //   ...(listFilterIdCredentialFinal?.length > 0 && filterIdCredential)
    //     ? {
    //         allowCredentials: listFilterIdCredentialFinal,
    //       }
    //     : {},

    // }

    // const loginCred = await startAuthentication(optionsJSON)

    // return loginCred
  }

  static async sign (message:string, options = {
    filterIdCredential: false,
    listFilterIdCredential: [],
  }) {
    // const { filterIdCredential, listFilterIdCredential } = options

    // const userGroupData = ReduxServices.getReduxDataByKey('userGroupData') || {}

    // const { idCre } = userGroupData

    // let listFilterIdCredentialFinal = []

    // if (idCre) {
    //   listFilterIdCredentialFinal.push({
    //     id: idCre,
    //     type: 'public-key',
    //   })
    // }
    // if (listFilterIdCredential?.length > 0) {
    //   listFilterIdCredentialFinal = listFilterIdCredentialFinal.concat(listFilterIdCredential)
    // }

    // const credential = await startAuthentication({
    //   challenge: bufferToBase64URLString(Buffer.from(message.slice(2), 'hex')),
    //   rpId: window.location.hostname,
    //   timeout: 60000,
    //   userVerification: 'preferred',
    //   ...(listFilterIdCredentialFinal?.length > 0 && filterIdCredential)
    //     ? {
    //         allowCredentials: listFilterIdCredentialFinal,
    //       }
    //     : {},
    // }).catch((_error) => {
    //   throw new Error('Error when authenticating credential!')
    // })

    // if (!credential) {
    //   throw new Error('Error when authenticating credential!')
    // }

    // const authenticatorData = toHex(new Uint8Array(base64URLStringToBuffer(credential.response.authenticatorData)))

    // const utf8Decoder = new TextDecoder('utf-8')

    // const decodedClientData = utf8Decoder.decode(base64URLStringToBuffer(credential.response.clientDataJSON))
    // const clientDataObj = JSON.parse(decodedClientData)

    // const signature = parseSignature(new Uint8Array(base64URLStringToBuffer(credential?.response?.signature)))

    // return {
    //   rawId: toHex(new Uint8Array(base64URLStringToBuffer(credential.rawId))),
    //   authenticatorData,
    //   clientData: {
    //     type: clientDataObj.type,
    //     challenge: clientDataObj.challenge,
    //     origin: clientDataObj.origin,
    //     crossOrigin: clientDataObj.crossOrigin,
    //   },
    //   signature,
    // }
  }
}
