import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { Pool } from 'pg';
import App from './App';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/cars', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('*', (req, res) => {
  const html = ReactDOMServer.renderToString(<App />);
  res.send(renderFullPage(html));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function renderFullPage(html) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Game Site</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <div id="root">${html}</div>
        <script src="/static/js/client-bundle.js"></script>
    </body>
    </html>
  `;
}