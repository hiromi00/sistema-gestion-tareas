import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tareas_usuarios', (table) => {
    table.integer('tarea_id').unsigned();
    table.integer('usuario_id').unsigned();
    table.foreign('tarea_id').references('id').inTable('tareas').onDelete('CASCADE');
    table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tareas_usuarios');
}
