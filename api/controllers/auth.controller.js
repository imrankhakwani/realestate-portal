import User from '../models/user.model.js'
import { errorHandler } from '../utils/errorHandler.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomBytes} from 'crypto'

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const user = new User({ username, password: hashedPassword, email })

  try {
    await user.save()
    res.status(201).send({ message: 'User signup successful.'})
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body

    try {
    const validUser = await User.findOne({ email})
    if(!validUser) return next(errorHandler(401, 'Invalid credentials'))

    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if(!validPassword) return next(errorHandler(401, 'Invalid credentials'))

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    const { password: pass, ...rest } = validUser._doc

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest)
    } catch (error) {
      next(error)
    }
}

export const google = async (req, res, next) => {
  const { email, name, photo } = req.body

  try {
    const user = await User.findOne({ email })
    if(user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = user._doc

      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest)
    } else {
      const generatedPassword = randomBytes(8).toString('hex')
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const userPostfix = Math.random().toString(36).slice(-8)
      const newUser = new User({ 
        username: name.split(' ').join('').toLowerCase() + userPostfix,
        email,
        password: hashedPassword,
        avatar: photo
      })

      await newUser.save()
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = newUser._doc
  
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest)
    }
  } catch (error) {
    next(error)
  }
}
