'use strict'

const Schema = use('Schema')

class ServiceSchema extends Schema {
  up() {
    this.create('services', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.text('description').notNullable()
      table
        .integer('priority')
        .notNullable()
        .defaultTo('0')
      table.timestamps()
    })
  }

  down() {
    this.drop('services')
  }
}

module.exports = ServiceSchema
