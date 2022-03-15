import { resourceSchemaDefault} from 'axios-rest-resource'
const { create, update } = resourceSchemaDefault

//Map axios-rest-resource default method names to rails controller action names
const schema = {
  create,
  update,
  index: resourceSchemaDefault.read,
  show: resourceSchemaDefault.readOne,
  destroy: resourceSchemaDefault.remove,
}

export default schema
