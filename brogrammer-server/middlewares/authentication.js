const { verify } = require('../helpers/jwt')
const { User } = require('../models');

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: 'Unauthorized' };

    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') throw { name: 'Unauthorized' };

    const payload = verify(token);

    const user = await User.findByPk(payload.id);
    if (!user) throw { name: 'Unauthorized' };

    req.user = {
      id: user.id,
      role: user.role,
      email: user.email
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;