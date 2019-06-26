'use strict'

const Schema = use('Schema')

class PersonaSchema extends Schema {
  up() {
    this.create('personas', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('name').notNullable()
      table
        .string('document')
        .notNullable()
        .unique()
      table.string('cellphone').notNullable()
      table.string('email').unique()
      table.string('address').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('personas')
  }
}

module.exports = PersonaSchema
