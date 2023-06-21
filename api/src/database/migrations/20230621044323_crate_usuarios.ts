import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('usuarios', (table) => {
    table.increments('id').primary();
    table.string('email', 100).notNullable();
    table.string('password').notNullable();
    table.integer('rol_id').unsigned();
    table.foreign('rol_id').references('id').inTable('roles').onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('usuarios');
}
