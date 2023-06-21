import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('archivos', (table) => {
    table.increments('id').primary();
    table.string('nombre').notNullable();
    table.string('tipo').notNullable();
    table.string('ruta').notNullable();
    table.text('meta');
    table.integer('tarea_id').unsigned();
    table.foreign('tarea_id').references('id').inTable('tareas').onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('archivos');
}
