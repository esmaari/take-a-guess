import { useState } from 'react'
import { clsx } from 'clsx';
import { getRandomWord } from "./utils"
import takeClose from './assets/take_close.png'
import takeOpen from './assets/take_open.png'


export default function App() {
  // State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])


  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const clapperboards = [1,2,3,4,5,6,7,8,9]

  // Derived values

  const gameStatusClass = clsx('game-status')
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= clapperboards.length 
  const isGameOver = isGameWon || isGameLost


  // Functions

 function addGuessedLetter(letter) {
  setGuessedLetters(prevLetters => 
    prevLetters.includes(letter) ? 
    prevLetters : [...prevLetters, letter])
  }

  function startNewGame() {
    setCurrentWord(getRandomWord()) // why not   setCurrentWord(() => getRandomWord())
    setGuessedLetters([])
  }


  // Elements

  function renderGameStatus() {
      if (!isGameOver) {
          return null
      }

      if (isGameWon) {
          return (
              <>
                  <h2>You win!</h2>
                  <p>Well done! 🎉</p>
              </>
          )
      } else {
          return (
              <>
                  <h2>Game over!</h2>
                  <p>You lose! Better start learning Assembly 😭</p>
                  <p>Word: {currentWord}</p>
              </>
          )
      }
  }

  const clapperboardElements = clapperboards.map((clipper, index) => {
    
    const isItAnotherTake = index < wrongGuessCount

    const classNames = clsx("clapperboard")

    if (isItAnotherTake) {
      return(
        <div key={index} className={classNames}>
          <img src={takeClose} alt=''/>
          <span>{index + 1}</span>
        </div>      
      )
    } else {
      return(
        <div key={index} className={classNames}>
          <img src={takeOpen} alt=''/>
        </div>      
      )
    }
      
  })


  const currentWordElements = currentWord.split("").map((letter) => {
    return (      
     <span>{guessedLetters.includes(letter) ? letter.toUpperCase() : ""}</span>
    )
  })

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })


    return (
     <button
      className={className} 
      onClick={() => addGuessedLetter(letter)}
      >
      {letter}
      </button>
    )
  })

  return (
    <>
    <main>

      <header>
          <h1>Take a Guess</h1>
          <p>Lights. Camera. Guess! You only get 9 takes to nail this scene.</p>
      </header>

      <section className={gameStatusClass}>
        {renderGameStatus()}
      </section>

       <section className="clapperboards">
        {clapperboardElements}
      </section>

      <section className="word">
        {currentWordElements}
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>

      {isGameOver && <button className="new-game" onClick={startNewGame}>New Game</button>}

    </main>

   
       
    </>
  )
}


