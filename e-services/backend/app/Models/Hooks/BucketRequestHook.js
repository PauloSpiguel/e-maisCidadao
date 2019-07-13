'use strict'

const BucketRequestHook = (exports = module.exports = {})

const Mail = use('Mail')
const moment = require('moment')

BucketRequestHook.sendNewBucketRequestMail = async bucketRequestInstance => {
  const {
    email,
    name,
    cellphone
  } = await bucketRequestInstance.persona().fetch()

  const { address, protocol, done_request, trash_type } = bucketRequestInstance

  console.log(bucketRequestInstance.protocol)

  if (bucketRequestInstance.protocol) {
    await Mail.send(
      ['emails.new_bucket_request'],
      {
        name,
        address,
        protocol,
        cellphone,
        date: moment()
          .locale('pt-br')
          .format('LLL'),
        done_request
      },
      message => {
        message
          .to(email)
          .from('ti@centenariodosul.pr.gov.br', 'SIC.GOV | SERVIÇOS PÚBLICOS')
          .subject('Novo Serviço Agendado')
      }
    )
  } else if (
    bucketRequestInstance.dirty.address ||
    bucketRequestInstance.dirty.trash_type ||
    bucketRequestInstance.dirty.done_request
  ) {
    await Mail.send(
      ['emails.update_bucket_request'],
      {
        name,
        address,
        protocol,
        cellphone,
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
          .subject('Atualização de Serviço Agendado')
      }
    )
  }
}
