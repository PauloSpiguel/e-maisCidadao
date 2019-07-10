'use strict'

class Session {
  get vilidateAll() {
    return true
  }
  get rules() {
    return {
      email: 'required|email',
      password: 'required'
    }
  }
}

module.exports = Session
