const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

async function checkDb() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rows] = await connection.query('SELECT 1 + 1 AS result');
  await connection.end();
  return rows[0].result;
}

app.get('/', async (req, res) => {
  try {
    const result = await checkDb();
    res.json({ message: 'Node.js connected to MySQL successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
