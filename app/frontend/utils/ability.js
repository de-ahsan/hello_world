import { Ability } from '@casl/ability'

const createAbility = (ability_rules = []) => new Ability(ability_rules, {
  subjectName(item) {
    if (!item || typeof item === 'string') {
      return item
    }

    if (item.__type) {
      return item.__type
    }

    const Type = typeof item === 'object' ? item.constructor : item;
    return Type.modelName || Type.name;
  }
})

export default createAbility
