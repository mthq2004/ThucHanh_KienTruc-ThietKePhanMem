const express = require('express');
const cors = require('cors');
const { menus } = require('./data');

const app = express();
const port = 5002;
const orders = [];

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'order-service' });
});

app.get('/orders', (req, res) => {
  res.json(orders);
});

app.post('/orders', (req, res) => {
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
  const order = {
    id: `mo${orders.length + 1}`,
    customerName,
    items: normalizedItems,
    total,
    status: 'PLACED',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  console.log('event: order.created', { orderId: order.id, total: order.total });

  res.status(201).json(order);
});

app.listen(port, () => {
  console.log(`order-service running on ${port}`);
});
