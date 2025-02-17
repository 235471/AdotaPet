import type { Knex } from 'knex';

exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.table('pets', function (table: Knex.TableBuilder) {
    table.date('dataNascimento').nullable(); // A nova coluna é nullable
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.table('pets', function (table: Knex.TableBuilder) {
    table.dropColumn('dataNascimento');
  });
};
