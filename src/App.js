import {useState, useEffect} from 'react'

const width = 8
const colors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
]
const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])

  const checkForColumnOfThree = () => {
    for(let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangement[i]
      
      if(columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
        const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
        const decidedColor = currentColorArrangement[i]
        const isBlank = currentColorArrangement[i] === blank

        if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
            columnOfFour.forEach(square => currentColorArrangement[square] = '')
          
        }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
        const rowOfThree = [i, i + 1, i + 2]
        const decidedColor = currentColorArrangement[i]
        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
        const isBlank = currentColorArrangement[i] === blank

        if (notValid.includes(i)) continue

        if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
            setScoreDisplay((score) => score + 3)
            rowOfThree.forEach(square => currentColorArrangement[square] = blank)
            return true
        }
    }
}

  const createBoard = () => {
    const randomColorArrangement = []
    for(let i = 0; i < width * width; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }
  
  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfThree()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)
  }, [checkForColumnOfThree, currentColorArrangement])

  return (
    <div className='app'>
      <div className='game'>
        {currentColorArrangement.map((color, index) => (
          <img
            key = {index}
            style = {{backgroundColor: color}}
            alt={color}
          />
          
          
        ))}
      </div>
    </div>
  );
}

export default App;
