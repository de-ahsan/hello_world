import resourceBuilder from './resource_builder'
import defaultResourceSchema from './default_resource_schema'
import { CachedUser } from '../utils/local_storage'

let { create, update } = defaultResourceSchema
create.then = (response) => {
  return response
}

const usersResource = resourceBuilder.build('/users', {
  create,
  confirmEmail: {
    url: '/confirmation',
    call: (confirmation_token) => {
      const params = { confirmation_token }
      return { params }
    },
  },
  showCurrent: {
    then: (response) => {
      if(response.data) {
        CachedUser.set(response.data)
      }
      return response
    },
  },
  updateCurrent: {
    ...update,
    url: null,
  }
})

window.usersResource = usersResource

export default usersResource
