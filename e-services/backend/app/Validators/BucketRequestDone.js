'use strict'

const Antl = use('Antl')

class BucketRequestDone {
  get validateAll() {
    return true
  }
  get rules() {
    return {
      number_bucket: 'required',
      done_request: 'required|number'
    }
  }
  get messages() {
    return Antl.list('validation')
  }
}

module.exports = BucketRequestDone
