'use strict'

const moment = require('moment')
const crypto = require('crypto')
const requestIp = require('request-ip')
const Mail = use('Mail')
const User = use('App/Models/User')

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      moment.locale('pt-br')
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      // SALVANDO NO BANCO
      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()
      await user.save()

      // ENVIANDO POR EMIAL
      await Mail.send(
        ['emails.forgot_password'],
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`,
          dateNow: moment().format('LLLL')
        },
        message => {
          message
            .to(user.email)
            .from(
              'no-reply-ti@centenariodosul.pr.gov.br',
              'Sistema e-maisCidadão - Governo Municipal'
            )
            .subject('Recuperação de senha')
        }
      )
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Email não cadastrado.' }
      })
    }
  }

  async update({ request, response }) {
    try {
      const clientIp = requestIp.getClientIp(request)
      const { password, token } = request.all()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response.status(401).send({
          error: {
            message: 'Token expirado. Tente recuperar a senha novamente'
          }
        })
      }

      user.token = null
      user.token_created_at = null
      user.password = password
      await user.save()

      // ENVIANDO POR EMIAL
      await Mail.send(
        ['emails.forgot_success'],
        {
          username: user.username,
          email: user.email,
          password,
          link: `http://www.meusite.com/forgot_password`,
          dateNow: moment().format('LLLL'),
          clientIp
        },
        message => {
          message
            .to(user.email)
            .from(
              'no-reply-ti@centenariodosul.pr.gov.br',
              'Sistema e-maisCidadão - Governo Municipal'
            )
            .subject('Recuperação de senha - Sucesso')
        }
      )
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Algo de errado ao recuperar a senha.' }
      })
    }
  }
}

module.exports = ForgotPasswordController
