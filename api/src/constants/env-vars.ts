export default {
  Port: process.env.PORT ?? 3000,
  DB: {
    Host: process.env.DB_HOST ?? '',
    Port: (process.env.DB_PORT ?? '3306') as unknown as number,
    Database: process.env.DB_DATABASE ?? '',
    User: process.env.DB_USER ?? '',
    Password: process.env.DB_PASSWORD ?? '',
    PoolMin: process.env.DB_POOL_MIN ?? '2',
    PoolMax: process.env.DB_POOL_MAX ?? '10',
  },
} as const;
