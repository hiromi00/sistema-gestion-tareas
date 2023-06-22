import { Knex } from 'knex';
import bcrypt from 'bcrypt';
import { Keys } from '../../constants';

export async function seed(knex: Knex): Promise<void> {
  const rol = await knex('roles').select('id').where('nombre', Keys.roles.otro).first();

  const payload1 = {
    email: 'user1@mock.com',
    password: await bcrypt.hash('user1', await bcrypt.genSalt(10)),
    rol_id: rol.id,
  };
  const payload2 = {
    email: 'user2@mock.com',
    password: await bcrypt.hash('user2', await bcrypt.genSalt(10)),
    rol_id: rol.id,
  };
  const payload3 = {
    email: 'user3@mock.com',
    password: await bcrypt.hash('user3', await bcrypt.genSalt(10)),
    rol_id: rol.id,
  };
  const payload4 = {
    email: 'user4@mock.com',
    password: await bcrypt.hash('user4', await bcrypt.genSalt(10)),
    rol_id: rol.id,
  };
  const payload5 = {
    email: 'user5@mock.com',
    password: await bcrypt.hash('user5', await bcrypt.genSalt(10)),
    rol_id: rol.id,
  };

  await knex('usuarios').insert([payload1, payload2, payload3, payload4, payload5]);
}
