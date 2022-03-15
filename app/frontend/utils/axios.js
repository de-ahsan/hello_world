import autoTypeCast from 'auto-type-cast'
import { HistoryProvider } from '../components/app/history'
import * as routes from '../constants/routes'
import { PathAfterSignIn } from './local_storage'

const JWT_EXPIRED = 'Signature has expired'

const configureAxios = (axiosInstance) => {
  // mobile only! HttpOnly session cookie used instead on web side
  // Use authorization header from JWT on all requests.
  // axiosInstance.interceptors.request.use((request) => {
  //   const authHeaders = requestHeaders()
  //   request.headers = {
  //     ...authHeaders,
  //     ...request.headers,
  //   }
  //   return request
  // })

  // mobile only! HttpOnly session cookie used instead on web side
  // If ever given an authorization header, set the JWT in localStorage.
  // axiosInstance.interceptors.response.use((response) => {
  //   setAuthTokenFromHeader(response.headers.authorization)
  //   return response
  // })

  // If session expired, redirect to sign in. Keep track of the path so
  // we can redirect to the current location after sign in.
  axiosInstance.interceptors.response.use(null, (error) => {
    const { response } = error

    // todo: handle many more error types
    if (response.status === 401 &&  response?.data?.error === JWT_EXPIRED) {
      PathAfterSignIn.set()
      HistoryProvider.history.push(routes.SIGN_IN)
      // signal to other error handlers that they don't need to alert the user, etc.
      error.handled = true
    }

    return Promise.reject(error)
  })

  // Cast all response data to model classes.
  axiosInstance.interceptors.response.use((response) => {
    if (response?.data) {
      if(response.data.status === 'pending')
      {
        PathAfterSignIn.set(routes.WELCOME_PAGE)
      }
      autoTypeCast(response.data)
    }
    return response
  })
}

export default configureAxios
