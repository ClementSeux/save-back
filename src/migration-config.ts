import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
console.log(
  process.env.DB_HOST,
  process.env.DB_PORT,
  process.env.DB_USER,
  process.env.DB_PASS,
  process.env.DB_NAME,
);

export default new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 3307,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrationsRun: false,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  ssl:
    process.env.ENV === 'prod'
      ? { rejectUnauthorized: true, ca: process.env.CERT_SSL }
      : false,
});
