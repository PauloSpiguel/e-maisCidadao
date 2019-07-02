'use strict'

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
}

module.exports = BucketRequestDone
