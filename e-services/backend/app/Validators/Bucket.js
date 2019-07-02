'use strict'

class Bucket {
  get validateAll() {
    return true
  }
  get rules() {
    return {
      number_bucket: 'required|unique:buckets',
      description: 'required'
    }
  }
}

module.exports = Bucket
