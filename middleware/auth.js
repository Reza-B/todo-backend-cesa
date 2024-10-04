import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config.js';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Access denied' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    req.user = user;
    next();
  });
};

export default authenticateToken;
