import resourceBuilder from './resource_builder'
import defaultResourceSchema from './default_resource_schema'
import { clearAll as clearLocalStorage, CachedUser } from '../utils/local_storage'

const sessionsResource = resourceBuilder.build('/users', {
  signIn: {
    method: 'post',
    url: '/sign_in',
    call: (email, password, registrationToken) => {
      const data = { user: { email, password } }
      return { data }
    },
    then: (response) => {
      if(response.data) {
        CachedUser.set(response.data)
      }
      return response
    },
  },
  signOut: {
    method: 'delete',
    url: '/sign_out',
    then: (response) => {
      clearLocalStorage()
      return response
    },
  },
  forgotPassword: {
    method: 'post',
    url: '/password',
    call: (email) => {
      const data = { user: { email: email } }
      return { data }
    },
  },
  resetPassword: {
    method: 'put',
    url: '/password',
    call: (password, passwordConfirmation, resetToken) => {
      const data = {
        user: {
          password: password,
          password_confirmation: passwordConfirmation,
          reset_password_token: resetToken,
        }
      }
      return { data }
    },
  },
})

export default sessionsResource
