import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUser } from "./findUser.js";
import { insertUser } from "./insertUser.js";

export async function signup(req, res) {
  console.log('Starting Signing Up user')
  const { username, email, password } = req.body;
  try {
    const userExist = await findUser(email)

    if (userExist) {
      return res.status(401).send('User already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await insertUser({ username, email, hashedPassword })
    const token = jwt.sign({ newUser }, process.env.JWT_SECRET)
    return res.send({
      message: 'user has been created',
      response: token
    })
  } catch (error) {
    res.status(400).send(error)
  }
}