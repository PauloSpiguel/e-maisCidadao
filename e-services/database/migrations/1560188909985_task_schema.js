'use strict'

const Schema = use('Schema')

class TaskSchema extends Schema {
  up() {
    this.create('tasks', table => {
      table.increments()
      table
        .integer('service_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('services')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('persona_id')
        .unsigned()
        .references('id')
        .inTable('personas')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.text('description')
      table.string('address').notNullable()
      table
        .string('protocol')
        .notNullable()
        .unique()
      table.timestamp('due_date')
      table.timestamps()
    })
  }

  down() {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
