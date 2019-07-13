'use strict'

const Mail = use('Mail')

class UpBucketRequestMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'UpBucketRequestMail-job'
  }

  // This is where the work is done.
  async handle({
    email,
    name,
    address,
    cellphone,
    protocol,
    created_at,
    trash_type,
    done_request,
    date
  }) {
    console.log(`Job: ${UpBucketRequestMail.key}`)

    await Mail.send(
      ['emails.up_bucket_request'],
      {
        name,
        address,
        cellphone,
        protocol,
        created_at,
        trash_type,
        done_request,
        date
      },
      message => {
        message
          .to(email)
          .from('ti@centenariodosul.pr.gov.br', 'SIC.GOV | SERVIÇOS PÚBLICOS')
          .subject('Atualização de serviço agendado')
      }
    )
  }
}

module.exports = UpBucketRequestMail
