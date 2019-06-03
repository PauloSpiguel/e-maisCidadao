'use strict'

const crypto = require('crypto')
const Mail = use('Mail')
const User = use('App/Models/User')

class ForgotPasswordController {
  async store({ request, response }) {
    try {
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
          link: `${request.input('redirect_url')}?token=${user.token}`
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

  async update({ request }) {
    const password = request.input('password')
    const token = request.query

    console.log(token)
  }
}

module.exports = ForgotPasswordController
