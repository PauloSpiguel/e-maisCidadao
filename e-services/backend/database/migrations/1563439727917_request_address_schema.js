'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RequestAddressSchema extends Schema {
  up() {
    this.create('request_addresses', table => {
      table.increments()
      table
        .integer('bucketRequest_id')
        .unsigned()
        .references('id')
        .inTable('bucket_requests')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('street').notNullable()
      table.integer('number').notNullable()
      table.string('district').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('request_addresses')
  }
}

module.exports = RequestAddressSchema
