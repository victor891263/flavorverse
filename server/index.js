require('dotenv').config()
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')

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

// connect to database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to database'))
    .catch(error => console.log('Error connecting to database', error))

// routes
app.use('/auth', require('./routes/auth'))
app.use(require('./middleware/auth')) // authentication middleware
app.use('/recipes', require('./routes/recipes'))
app.use(require('./middleware/handleError'))

app.listen(4000, () => console.log('listening'))