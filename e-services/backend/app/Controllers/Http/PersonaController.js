'use strict'

const Persona = use('App/Models/Persona')
class PersonaController {
  async index({ request }) {
    const persona = await Persona.query()
      .with('user')
      .fetch()

    return persona
  }

  async store({ request, response }) {}

  async show({ params, request, view }) {}

  async update({ params, request, response }) {
    const persona = await Persona.findOrFail(params.id)
    const data = request.only(['name', 'document', 'cellphone', 'email'])

    await persona.load('user')

    persona.merge(data)
    await persona.save()

    return persona
  }

  async destroy({ params, request, response }) {}
}

module.exports = PersonaController
