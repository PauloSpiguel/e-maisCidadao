'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BucketSchema extends Schema {
  up() {
    this.create('buckets', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('number_bucket')
        .notNullable()
        .unique()
      table.string('description')
      table.integer('conservation').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('buckets')
  }
}

module.exports = BucketSchema
