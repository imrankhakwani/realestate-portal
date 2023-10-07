import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))

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
