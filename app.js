const express = require('express')
const app = express()

const foods = ['Pollito chiken, gallina hen','Ensaladita, ponte sano bb','Dick']

app.get('/food/today', (req, res) => res.send(foods[Math.floor(Math.random()*foods.length)]))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
