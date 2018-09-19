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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Request params
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

const apiRouter = require('./routes/index.js')

app.use('/api', apiRouter)
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
