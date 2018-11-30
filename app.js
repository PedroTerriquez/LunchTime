const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

const Compression = require('compression')
const BodyParser = require('body-parser')
const Logger = require('morgan')
const Helmet = require('helmet')
const cors = require('cors')

const slackRouter = require('./routes/slack-router');

app.use(cors())

// Security
app.use(Helmet())

// Performance
app.use(Compression())

// Debug
app.use(Logger('dev'))

// Request params
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

app.use(express.static('dist'))

const apiRouter = require('./routes/index.js')

app.use('/api', apiRouter)

app.use('/slack', slackRouter)

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
