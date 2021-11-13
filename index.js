const PORT = 8000

const axios = require('axios')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
require('dotenv').config()

app.use(express.json())

const URL = 'https://a6b7892a-c37c-4614-aee6-0fe743c78cf3-us-east-1.apps.astra.datastax.com/api/rest/v2/namespaces/highscores/collections/scores'
const TOKEN = 'AstraCS:SrrZdAEXBXPTIYtmBiwBnKox:1bb927872b816e4bc396ecaa68f4b8316a9c977fda50cdd5738e173642705f6a'

app.get('/', async (req, res) => {
  res.json('Home Page')
})

// Recuperando os scores
app.get('/scores', async (req, res) => {
  
  const options = {
    method: "GET",
    headers: {
      Accepts: 'application/json',
      'X-Cassandra-Token': TOKEN
    }
  }

  axios(`${URL}?page-size=20`, options)
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json({message: err}))
})

app.post('/addscore', async (req, res) => {
  const bodyContent = req.body

  const options = {
    method: "POST",
    headers: {
      Accepts: 'application/json',
      'X-Cassandra-Token': TOKEN,
      'Content-Type': 'application/json'
    },
    data: bodyContent
  }

  axios(URL, options)
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json({message: err}))
})
app.listen(PORT, () => console.log(`Server's running on ${PORT}`))