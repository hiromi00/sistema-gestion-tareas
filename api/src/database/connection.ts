import knex from 'knex';
import config from './knexfile';

const configs = config.development;

const db = knex(configs);

export default db;
