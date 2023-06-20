import type { Knex } from 'knex';
import { EnvVars } from '../constants';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: EnvVars.DB.Host,
      port: EnvVars.DB.Port,
      database: EnvVars.DB.Database,
      user: EnvVars.DB.User,
      password: EnvVars.DB.Password,
    },
    pool: {
      min: parseInt(EnvVars.DB.PoolMin ?? '2', 10),
      max: parseInt(EnvVars.DB.PoolMax ?? '10', 10),
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default config;
