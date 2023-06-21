import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('roles_permisos', (table) => {
    table.integer('rol_id').unsigned();
    table.integer('permiso_id').unsigned();
    table.foreign('rol_id').references('id').inTable('roles').onDelete('CASCADE');
    table.foreign('permiso_id').references('id').inTable('permisos').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('roles_permisos');
}
