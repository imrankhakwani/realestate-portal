import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import listingRouter from './routes/listing.routes.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to mongo db server')
  })
  .catch((error) => {
    console.error('Error connecting to mongo db server', error.message)
  })

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})