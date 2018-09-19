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
 	response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

// Request params
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

const apiRouter = require('./routes/index.js')

app.use('/api', apiRouter)
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
