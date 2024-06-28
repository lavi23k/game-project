import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

export async function fetchCars() {
  try {
    const res = await pool.query('SELECT * FROM cars ORDER BY RANDOM() LIMIT 10;');
    return res.rows;
  } catch (err) {
    console.error('Error executing query', err.stack);
    throw err;
  }
}