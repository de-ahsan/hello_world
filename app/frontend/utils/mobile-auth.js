// mobile only!
// import jwtDecode from 'jwt-decode'
//export const clearToken = () => {
//   localStorage.removeItem('token')
// }
//
// export const getAuthToken = () => {
//   return localStorage.getItem('token')
// }
//
// export const getAuthTokenPayload = () => {
//   const token = getAuthToken()
//   if (!token) {
//     return
//   }
//   return jwtDecode(token)
// }
// mobile only! HttpOnly session cookie used instead on web side
// export const setAuthTokenFromHeader = (authHeader) => {
//   if (authHeader && authHeader.startsWith('Bearer ')){
//     const token = authHeader.substring(7, authHeader.length)
//     localStorage.setItem('token', token)
//   }
// }

// mobile only! HttpOnly session cookie used instead on web side
// export const requestHeaders = () => {
//   const authToken = getAuthToken()
//   if (authToken !== null && authToken !== '') {
//     return {
//       authorization: `Bearer ${authToken}`
//     }
//   }
// }
