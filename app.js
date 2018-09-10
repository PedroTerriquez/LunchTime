const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const foods = ['Pollito chiken, gallina hen','Ensaladita, ponte sano bb','Dick']

app.get('/food/today', (req, res) => res.send(foods[Math.floor(Math.random()*foods.length)]))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
