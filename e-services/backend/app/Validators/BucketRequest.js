'use strict'

class BucketRequest {
  get validateAll() {
    return true
  }
  get rules() {
    return {
      persona: 'required',
      document: 'required',
      cellphone: 'required',
      address: 'required'
    }
  }
}

module.exports = BucketRequest
