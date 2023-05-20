const jwt = require('jsonwebtoken');
const User = require('../models/userScema');

const requireAuth = async(req, res, next) => {
  // verify if the user is logged in
  const { authorization } = req.headers;
  if(!authorization) {
    return res.status(401).json({ error: 'You must be logged in.' })
  }
  const token = authorization.replace('Bearer ', ''); // remove the Bearer string from the token
  try {
    const {_id} = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({_id}).select('_id'); // find the user in the database and attach it to the request object
    next();
  } catch (error) {
    return res.status(401).json({ error: 'You must be Authorized.' })
  }
};

module.exports = requireAuth;
