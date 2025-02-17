import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('pets', (table: Knex.TableBuilder) => {
    table.date('dataNascimento').notNullable().alter(); // Adicionando dataNascimento

    table.dropColumn('idade'); // Removendo o campo idade
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('pets', (table: Knex.TableBuilder) => {
    table.integer('idade').notNullable(); // Voltando o campo idade

    table.dropColumn('dataNascimento'); // Removendo o campo dataNascimento
  });
}
