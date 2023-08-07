const http = require('http');
const { Pool } = require('pg');

const server = http.createServer(async (req, res) => {
  if (req.url === '/query') {
    const query = req.headers.query;

    try {
      const pool = new Pool({
        connectionString: 'postgresql://performance@ktb-pfm-core-5108.8nk.cockroachlabs.cloud:26257/sla?sslmode=verify-full',
      });

      const result = await pool.query(query);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
