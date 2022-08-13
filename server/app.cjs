const express = require('express')
const jsonfile = require('jsonfile')
const fs = require('fs')
var cors = require('cors')
const app = express()

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(cors())
app.use(myLogger)

app.get('/questions', function (req, res) {
  const result = []

  fs.readdirSync(`${__dirname}/questions`).forEach(file => {
    const fileName = file.replace('.json', '')
    result.push({[fileName]: jsonfile.readFileSync(`${__dirname}/questions/${file}`)})
  })

  res.json(result)
})

app.listen(3300)
