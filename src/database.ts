import { Client } from 'pg';

const client: Client = new Client({
  user: 'juliano',
  password: '1234',
  host: 'localhost',
  database: 'movies_s2_m4',
  port: 5432,
});

const startDatabase = async (): Promise<void> => {
  await client.connect();
  console.log('Database is loaded');
};

export { client, startDatabase };
