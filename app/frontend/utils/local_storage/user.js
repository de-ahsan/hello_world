import LocalStorageWrapper from './base'

const USER_KEY = 'cachedUser'

class UserWrapper extends LocalStorageWrapper {
  constructor() {
    super(USER_KEY, true)
  }
}

export default new UserWrapper()
