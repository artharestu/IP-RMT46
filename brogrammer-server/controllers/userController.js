const { compare } = require("../helpers/bcrypt")
const { sign } = require("../helpers/jwt")
const { User, Profile } = require("../models")
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const { v4: uuidv4 } = require('uuid');

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

const googleLogin = async (req, res, next) => {
  const { googleToken } = req.body
  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, given_name, family_name } = ticket.getPayload();

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        email,
        password: uuidv4(),
        authType: 'google'
      }
    })

    if (created) await Profile.create({
      UserId: user.id,
      firstName: given_name,
      lastName: family_name
    })

    res.status(200).json({ email, given_name, family_name })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  register,
  login,
  googleLogin
}