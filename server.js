const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  connectionString: 'jdbc:postgresql://performance:E0BqxnU8OOLWiu5olnjcaw@ktb-pfm-core-5108.8nk.cockroachlabs.cloud:26257/sla?sslmode=verify-full',
});

app.get('/query', async (req, res) => {
  const query = req.query.q;

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
