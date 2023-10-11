import jwt from 'jsonwebtoken'
import { errorHandler } from "../utils/errorHandler.js"

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token

  if(!token) return next(errorHandler(401, 'Invalid token'))

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if(error) return next(errorHandler(403, 'Forbidden credentials'))

    req.user = user
    next()
  })
}