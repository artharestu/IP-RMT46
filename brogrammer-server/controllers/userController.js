const { compare } = require("../helpers/bcrypt")
const { sign } = require("../helpers/jwt")
const { User, Profile } = require("../models")

const register = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.create({ email, password })
    await Profile.create({ UserId: user.id })

    res.status(201).json({
      email: user.email,
      role: user.role,
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    if (!email || !password) throw { name: 'InvalidEmailPassword' };

    const user = await User.findOne({ where: { email } });
    if (!user) throw { name: 'InvalidEmailPassword' };

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw { name: 'InvalidEmailPassword' };

    const token = sign({ id: user.id });
    if (!token) throw { name: 'Unauthorized' };

    res.status(200).json({ access_token: token });
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login
}