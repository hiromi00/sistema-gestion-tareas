import { Knex } from 'knex';
import bcrypt from 'bcrypt';
import { Keys } from '../../constants';

const superEmail = 'super@mock.com';

export async function seed(knex: Knex): Promise<void> {
  const [user, rol] = await Promise.all([
    knex('usuarios').select('id').where('email', superEmail).first(),
    knex('roles').select('id').where('nombre', Keys.roles.admin).first(),
  ]);

  const payload = {
    email: superEmail,
    password: await bcrypt.hash('sgtP4ss!123', await bcrypt.genSalt(10)),
    rol_id: rol.id,
  };

  if (!user) {
    await knex('usuarios').insert(payload);
  }
}
