const express = require('express');

const app = express();
const PORT = 8080;

app.get('/health', (_req, res) => {
  res.json({
    service: 'bai01-image-opt-node',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Service listening on :${PORT}`);
});
