const express = require('express')
require('dotenv').config({ path: `${__dirname}/../.env` })

// Express middleware
const bodyParser = require('body-parser')
const cors = require('cors')

const main = require('./controllers/main')

const app = express()

app.get('/index.html', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

const whitelist = ['http://localhost:3000', 'add']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(express.static('../public'))
app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('root'))
app.get('/getentities', (req, res) => main.getEntities(req, res))

app.listen(process.env.PORT || 8080, () => {
  console.log(`Localhost is now listening on port: ${process.env.PORT || 8080}`)
})
