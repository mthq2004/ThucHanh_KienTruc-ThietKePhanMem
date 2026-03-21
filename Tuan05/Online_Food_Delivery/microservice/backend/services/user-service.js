const express = require('express');
const cors = require('cors');

const app = express();
const port = 5003;

const users = {
  u1: { id: 'u1', fullName: 'Demo Customer', tier: 'Gold' },
  u2: { id: 'u2', fullName: 'New User', tier: 'Standard' },
};

app.use(cors());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user-service' });
});

app.get('/users/:id', (req, res) => {
  const user = users[req.params.id];
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

app.listen(port, () => {
  console.log(`user-service running on ${port}`);
});
