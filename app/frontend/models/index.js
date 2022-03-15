import { registerClass } from 'auto-type-cast'
import User from './user'

const modelClasses = [
  User
]

const registerModels = () => {
  modelClasses.forEach(registerClass)
}

export {
  registerModels,
}
