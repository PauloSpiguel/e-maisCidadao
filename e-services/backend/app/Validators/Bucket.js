'use strict'

const Antl = use('Antl')

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
  get messages() {
    return Antl.list('validation')
  }
}

module.exports = Bucket
