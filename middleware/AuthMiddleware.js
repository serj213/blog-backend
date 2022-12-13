const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    // console.log('token ', token)
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' });
    }
    const decoded = jwt.verify(token, process.env.SECKRET_KEY, {'algorithm':'HS256'});
    console.log('decoded ', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('error authMiddleware ', error);
    res.status(401).json({ message: 'Не авторизован' });
  }
};
