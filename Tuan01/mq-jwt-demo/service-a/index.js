const express = require('express');
const { generateToken, verifyToken } = require('./jwt');
const { sendMessage } = require('./rabbit');

const app = express();
app.use(express.json());

// Login -> trả JWT
app.post('/login', (req, res) => {
  const user = { id: 1, username: 'demo' };
  const token = generateToken(user);
  res.json({ accessToken: token });
});

// Middleware kiểm tra JWT
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Publish event
app.post('/publish', auth, async (req, res) => {
  await sendMessage({
    event: 'USER_CREATED',
    data: req.user
  });
  res.json({ message: 'Event sent to RabbitMQ' });
});

app.listen(3000, () => {
  console.log('Service A running on port 3000');
});
