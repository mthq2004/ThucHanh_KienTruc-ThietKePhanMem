const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

async function forwardJson(res, url, options = {}) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(502).json({ message: 'Upstream service unavailable', detail: error.message });
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'api-gateway' });
});

app.get('/api/restaurants', (req, res) => {
  forwardJson(res, 'http://localhost:5001/restaurants');
});

app.get('/api/restaurants/:id/menu', (req, res) => {
  forwardJson(res, `http://localhost:5001/restaurants/${req.params.id}/menu`);
});

app.get('/api/orders', (req, res) => {
  forwardJson(res, 'http://localhost:5002/orders');
});

app.post('/api/orders', (req, res) => {
  forwardJson(res, 'http://localhost:5002/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });
});

app.get('/api/users/:id', (req, res) => {
  forwardJson(res, `http://localhost:5003/users/${req.params.id}`);
});

app.listen(port, () => {
  console.log(`api-gateway running on ${port}`);
});
