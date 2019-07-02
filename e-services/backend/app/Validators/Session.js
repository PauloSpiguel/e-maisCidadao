'use strict'

class Session {
  get vilidateAll() {
    return true
  }
  get rules() {
    return {
      username: 'required',
      password: 'required'
    }
  }
}

module.exports = Session
