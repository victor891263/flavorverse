require('dotenv').config()
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')
const cloudinary = require('cloudinary').v2

const app = express()
app.use(cors({
    exposedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// handle errors that are not caught by anything
process.on('uncaughtException', (error, source) => {
    console.log('uncaughtException', error, source)
})

// handle promises that are rejected and not handled by anything
process.on('unhandledRejection', (error, source) => {
    console.log('unhandledRejection', error, source)
})

// terminate connection to database when api stops running
process.on('SIGINT', () => {
    mongoose.connection.close()
        .then(() => console.log('Connection to database closed'))
        .catch(error => console.log('Error closing connection to database', error))
        .finally(() => process.exit(0))
})

// setup cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// connect to database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to database'))
    .catch(error => console.log('Error connecting to database', error))

// routes
app.use('/recover', require('./routes/recover'))
app.use('/auth', require('./routes/auth'))
app.use('/verify', require('./routes/verify'))
app.use(require('./middleware/auth')) // authentication middleware
app.use('/mail', require('./routes/mail'))
app.use('/users', require('./routes/users'))
app.use('/recipes', require('./routes/recipes'))
app.use(require('./middleware/handleError'))

app.listen(4000, () => console.log('listening'))