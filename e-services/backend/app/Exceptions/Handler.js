'use strict'

const Env = use('Env')
const Youch = use('youch')
const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { request, response }) {
    // Todos os erro passam por aqui
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }
    // Caso esteja em desenvolvimento cai neste erro mais detalhado
    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      const errorJSON = await youch.toJSON()

      return response.status(error.status).send(errorJSON)
    }
    // Retorna erro simples para usuário
    return response.status(error.status)
  }

  async report(error, { request }) {
    console.log(error)
  }
}

module.exports = ExceptionHandler
