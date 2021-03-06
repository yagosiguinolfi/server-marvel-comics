
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

function auth(req, res, next) {
  console.log('headers >>>>>>> ', req.headers.authorization);
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: 'No token provider' });

  const parts = authHeader.split(' ');

  if (!parts.length == 2)
    return res.status(401).json({ error: "Token error" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ error: 'Token malformatted' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err)
      return res.status(401).json({ error: 'Invalid token' });

    req.id = decoded.id;
    return next();
  });


}

module.exports = auth;
