'use strict'

const Schema = use('Schema')

class BucketRequestSchema extends Schema {
  up() {
    this.create('bucket_requests', table => {
      table.increments()
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
      table.string('address').notNullable()
      table.string('trash_type').notNullable()
      table
        .integer('bucket_id')
        .unsigned()
        .references('id')
        .inTable('buckets')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('priority')
        .notNullable()
        .defaultTo('0')
      table
        .string('protocol')
        .notNullable()
        .unique()
      table.timestamp('due_date')
      table.timestamp('updatedAt')
      table.timestamps()
    })
  }

  down() {
    this.drop('bucket_requests')
  }
}

module.exports = BucketRequestSchema
