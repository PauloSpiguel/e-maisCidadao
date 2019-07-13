'use strict'

const Mail = use('Mail')
const moment = require('moment')

class NewBucketRequestMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'BucketRequestMail-job'
  }

  // This is where the work is done.
  async handle({
    email,
    name,
    address,
    cellphone,
    protocol,
    trash_type,
    done_request
  }) {
    console.log(`Job:${NewBucketRequestMail.key}`)

    await Mail.send(
      ['emails.new_bucket_request'],
      {
        name,
        address,
        cellphone,
        protocol,
        date: moment()
          .locale('pt-br')
          .format('LLL'),
        trash_type,
        done_request
      },
      message => {
        message
          .to(email)
          .from('ti@centenariodosul.pr.gov.br', 'SIC.GOV | SERVIÇOS PÚBLICOS')
          .subject('Novo Serviço Agendado')
      }
    )
  }
}

module.exports = NewBucketRequestMail
