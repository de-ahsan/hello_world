import PathAfterSignIn from './path_after_sign_in'
import CachedUser from './user'

const localStorageWrappers = [
  CachedUser,
  PathAfterSignIn,
]

const clearAll = () => {
  localStorageWrappers.forEach(wrapper => wrapper.clear())
}

export {
  clearAll,
  CachedUser,
  PathAfterSignIn
}
