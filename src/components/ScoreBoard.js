import axios from 'axios'
import { useEffect, useState } from 'react'
import React from 'react'

const randomUserNames = [
  'PurpleFish',
  'LankyLama',
  'SillySloth',
  'LizardEyes',
  'BlowBlizzard',
  'AnteaterEars',
  "BulbBear",
  'OstrichOar',
  'CamelLegs',
  'KolaKoala',
  'LionLives',
  'MouthyTiger'
]

const ScoreBoard = ({ score }) => {
  const [gameStates, setGameStates] = useState(null)
  const [userName, setUserName] = useState(null)
  const fetchData = async () => {
    const response = await axios.get('http://localhost:8000/scores')
    const list = Object.keys(response.data.data).map(item => response.data.data[item])
    setGameStates(list)
    
  }

  const saveData = () => {
    const data = {
      username: userName,
      score: score
    }

    axios.post('http://localhost:8000/addscore', data)
      .then(response => console.log(response))
      .catch(err => console.log(err))
      .then(fetchData)
  }

  useEffect(() => {
    fetchData()
    setUserName(randomUserNames[Math.floor(Math.random() * randomUserNames.length)])
  }, [])

  const descendingGameStates = gameStates?.sort((a, b) => a.score - b.score)

  return (
    <div className="score-board">
      <h2>{userName} score: {score}</h2>
      <h2>High Scores</h2>
      {descendingGameStates?.map((gameState, index) =>  (
        <div key={index}>
          <h1>{gameState.username}: {gameState.score}</h1>
        </div>
      ))}
      <button onClick={saveData}>Save Score</button>
    </div>
  )
}

export default ScoreBoard