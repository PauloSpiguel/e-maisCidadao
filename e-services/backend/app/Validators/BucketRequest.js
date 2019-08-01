'use strict'

const Antl = use('Antl')

class BucketRequest {
  get validateAll() {
    return true
  }
  get rules() {
    return {
      trash_type: 'required'
    }
  }
  get messages() {
    return Antl.list('validation')
  }
}

module.exports = BucketRequest
