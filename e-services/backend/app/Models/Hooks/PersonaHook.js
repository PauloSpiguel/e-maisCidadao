'use strict'

const PersonaHook = (exports = module.exports = {})

PersonaHook.personaCreateOrUpdate = async personaInstance => {
  const { name } = personaInstance

  console.log(personaInstance)
  console.log(name)
}
