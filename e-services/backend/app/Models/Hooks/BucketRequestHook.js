'use strict'

const BucketRequestHook = (exports = module.exports = {})

const moment = require('moment')
const JobCreate = use('App/Jobs/NewBucketRequestMail')
const JobUp = use('App/Jobs/UpBucketRequestMail')
const Kue = use('Kue')

moment.locale('pt-br')

BucketRequestHook.sendNewBucketRequestMail = async bucketRequestInstance => {
  const {
    email,
    name,
    cellphone
  } = await bucketRequestInstance.persona().fetch()

  const {
    address,
    protocol,
    created_at,
    done_request,
    trash_type
  } = bucketRequestInstance

  if (bucketRequestInstance.priority) {
    Kue.dispatch(
      JobCreate.key,
      {
        email,
        name,
        address,
        cellphone,
        protocol,
        trash_type,
        done_request,
        date: moment().format('LLLL')
      },
      { attempts: 3 }
    )
  } else if (
    bucketRequestInstance.dirty.address ||
    bucketRequestInstance.dirty.trash_type ||
    bucketRequestInstance.dirty.done_request
  ) {
    // console.log(
    //   `Nome: ${name} | Address: ${address} | Email: ${email} | Done: ${done_request}`
    // )

    Kue.dispatch(
      JobUp.key,
      {
        email,
        name,
        address,
        cellphone,
        protocol,
        created_at: moment(created_at).format('LLLL'),
        trash_type,
        done_request,
        date: moment().format('LLLL')
      },
      { attempts: 3 }
    )
  }
}

// BucketRequestHook.personaCreateOrUpdate = async personaInstance => {
//   console.log(personaInstance.dirty)
// }
