import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/errorHandler.js'

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const user = new User({ username, password: hashedPassword, email })
  
  try {
    await user.save()
    res.status(201).send({ message: "User signup successful."})
  } catch (err) {
    next(error)
  }
}