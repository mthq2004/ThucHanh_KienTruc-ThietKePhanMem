const express = require('express');
const cors = require('cors');
const { restaurants, menus, orders } = require('./data');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', architecture: 'monolith' });
});

app.get('/api/restaurants', (req, res) => {
  res.json(restaurants);
});

app.get('/api/restaurants/:id/menu', (req, res) => {
  const menu = menus[req.params.id];
  if (!menu) {
    return res.status(404).json({ message: 'Restaurant or menu not found' });
  }
  res.json(menu);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const { customerName, items } = req.body;

  if (!customerName || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'customerName and items are required' });
  }

  const allMenuItems = Object.values(menus).flat();
  const normalizedItems = items.map((item) => {
    const menuItem = allMenuItems.find((m) => m.id === item.menuItemId);
    if (!menuItem) {
      return null;
    }
    const quantity = Number(item.quantity || 1);
    return {
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity,
      lineTotal: Number((menuItem.price * quantity).toFixed(2)),
    };
  });

  if (normalizedItems.includes(null)) {
    return res.status(400).json({ message: 'Invalid menu item in order' });
  }

  const total = Number(normalizedItems.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));
  const newOrder = {
    id: `o${orders.length + 1}`,
    customerName,
    items: normalizedItems,
    total,
    status: 'PLACED',
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.listen(port, () => {
  console.log(`Monolith backend is running on port ${port}`);
});
