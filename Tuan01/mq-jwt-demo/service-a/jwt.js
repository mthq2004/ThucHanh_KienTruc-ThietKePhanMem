const jwt = require('jsonwebtoken');

const ACCESS_SECRET = 'ACCESS_SECRET_KEY';

exports.generateToken = (payload) => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, ACCESS_SECRET);
};
