const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const Compression = require('compression')
const BodyParser = require('body-parser')
const Logger = require('morgan')
const Helmet = require('helmet')

// Security
app.use(Helmet())

// Performance
app.use(Compression())

// Debug
app.use(Logger('dev'))

// Request params
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

const apiRouter = require('./routes/index.js')

app.use('/api', apiRouter)
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
