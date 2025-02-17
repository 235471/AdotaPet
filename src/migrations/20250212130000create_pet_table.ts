import { Knex } from 'knex';

exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable('pets', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('nome');
    table.string('especie');
    table.integer('idade');
    table.boolean('adotado');
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTableIfExists('pets');
};
