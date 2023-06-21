import { Knex } from 'knex';
import { Keys } from '../../constants';
import { Rol } from '../../domain/Rol';

type TRolData = {
  nombre: string;
};

export async function seed(knex: Knex): Promise<void> {
  const rolesData: TRolData[] = Object.values(Keys.roles).map((r: string) => ({
    nombre: r,
  }));
  const roles = await knex('roles').select().orderBy('id');
  if (roles.length !== 0 || roles.length === rolesData.length) {
    let i = 0;
    const rolesMap = rolesData.map((r: TRolData) => {
      return { nombre: r.nombre, id: roles[i++].id };
    });
    await Promise.all(
      rolesMap.map((rol: Rol) => knex('roles').where('id', rol.id).update({ nombre: rol.nombre }))
    );
  } else {
    await knex('roles').insert(rolesData);
  }
}
