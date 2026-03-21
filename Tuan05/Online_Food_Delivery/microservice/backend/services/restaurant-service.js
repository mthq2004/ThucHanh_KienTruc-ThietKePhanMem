const express = require('express');
const cors = require('cors');
const { restaurants, menus } = require('./data');

const app = express();
const port = 5001;

app.use(cors());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'restaurant-service' });
});

app.get('/restaurants', (req, res) => {
  res.json(restaurants);
});

app.get('/restaurants/:id/menu', (req, res) => {
  const menu = menus[req.params.id];
  if (!menu) {
    return res.status(404).json({ message: 'Restaurant or menu not found' });
  }
  res.json(menu);
});

app.listen(port, () => {
  console.log(`restaurant-service running on ${port}`);
});
