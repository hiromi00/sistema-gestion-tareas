import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tareas', (table) => {
    table.increments('id').primary();
    table.string('titulo', 100).notNullable();
    table.text('descripcion').notNullable();
    table.boolean('estatus').notNullable();
    table.date('fecha_entrega').notNullable();
    table.string('publica', 100).notNullable();
    table.text('comentarios').notNullable();
    table.integer('creado_por').unsigned();
    table.foreign('creado_por').references('id').inTable('usuarios').onDelete('CASCADE');
    table.integer('responsable').unsigned();
    table.foreign('responsable').references('id').inTable('usuarios').onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tareas');
}
