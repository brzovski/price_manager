require('dotenv').config();  // Loads environment variables
const cors = require('cors');
const bodyParser = require('body-parser');





const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL Client Setup


/*const client = new Client({
  user: 'brzovski',
  host: 'localhost',
  database: 'price_manager',
  password: 'isqrtaexpn',
  port: 5432,
});*/


require('dotenv').config(); // Load environment variables from .env file

const client = new Client({
  user: process.env.DB_USER,       // Get value from .env
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use(cors());
app.use(bodyParser.json());


// Listens for GET requests at http://localhost:3000/api/users
// Fetches all records from the users table in PostgreSQL
// Returns the users as JSON
// Handles errors gracefully

app.get('/api/users', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows); // Send all users as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});
