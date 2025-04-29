"use client"

import { useEffect, useState } from 'react';

import Keyboard from "./components/keyboard";
import Rows from "./components/guess";
import { Game, GameInfo, AssignKeyboard, words } from "./components/game";

export default function Home() {

const [letters, setLetters] = useState<string[]>([])
const [contains, setContains] = useState<string[]>([])
const [correct, setCorrect] = useState<string[]>([])

const [game, setGame] = useState<GameInfo>(Game)

function getGuess(params: []) {
  if (game.round >= game.guess.length || game.status == 'WIN') return
  let newGuess = [...game.guess]
  newGuess[game.round] = params
  setGame({...game, guess: newGuess })
}

function submitGuess(newWord: [string]) {
  
  if (game.round >= game.guess.length) return

  // go through each word in the submitted word to find used/correct
  newWord.map((w, ind) => {
    let index = game.correct.indexOf(w)
    if (index >= 0) contains.push(w)
    if (game.correct[ind] == w) correct.push(w)
    letters.push(w)
  })

  // set unique letters
  let newLetters = [...new Set(letters)]
  let newContains = [...new Set(contains)]
  let newCorrect = [...new Set(correct)]

  setLetters(newLetters)
  setCorrect(newCorrect)
  setContains(newContains)

  // color in the keys that match
  game.keys.map((keyRow, rowIndex) => {
    keyRow.map((key, keyIndex) => {
      var keyClass = letters.indexOf(key) >= 0 ? "used": ""
      if (contains.indexOf(key) >= 0) {
        keyClass = "contains"
      }
      if (correct.indexOf(key) >= 0) {
        keyClass = "correct"  
      }
      game.keyClass[rowIndex][keyIndex] = keyClass
    })
  })

  // color in the guesses
  game.guess.map((_, rowIndex) => {
    var correct = 0
    game.correct.map((key, keyIndex) => {
      let guessKey = game.guess[rowIndex][keyIndex]
      var keyClass = ""
      if (contains.indexOf(guessKey) >= 0) {
        keyClass = "contains"
      }
      if (key == guessKey) {
        keyClass = "correct"
        correct += 1
      }
      game.guessClass[rowIndex][keyIndex] = keyClass
      if (correct >= game.correct.length) game.status = "WIN"
    })
  })

  setGame({...game, round: game.round+1})
}

function gameReset() {
  
  setLetters([])
  setCorrect([])
  setContains([])

  const wordsArray = words.toUpperCase().split(' ')
  const randomNumber = Math.floor(Math.random() * wordsArray.length)
  const randomWord = wordsArray[randomNumber]

  if (randomWord == '') return

  const word = randomWord.split('')
  const guesses = Array(5).fill('')

  setGame({
    ...game,
    status: 'PLAY',
    guess: guesses,
    correct: word,
    round: 0,
    keys: AssignKeyboard(),
    keyClass: [[],[],[]],
    guessClass: [[], [], [], [], []]
  })
}

useEffect(() => {
  if (game.status == '') gameReset()
})

return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <h1>RANDLE</h1>
        
      <main className="row-start-2 items-center text-center py-10">

        <span className='items-center justify-items-center'>
          <button className='key-start' onClick={gameReset}>RANDOMIZE</button>
        </span>
        
        <span className={'alert ' + game.status.toLowerCase()}>{game.status}</span>
        
        <Rows game={game} />
        
        <Keyboard game={game} getGuess={getGuess} submitGuess={submitGuess} />

      </main>

      <footer className="row-start-3 flex flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/alexshive/randle"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github project
        </a>
      </footer>
    </div>
  );
}
