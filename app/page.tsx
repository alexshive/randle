"use client"

import { useEffect, useState } from 'react';

import Keyboard from "./components/keyboard";
import Rows from "./components/guess";
import { Game, GameInfo, AssignKeyboard, words } from "./components/game";

export default function Home() {

const [game, setGame] = useState<GameInfo>(Game)

function getGuess(params: string[]) {
  if (game.round >= game.guess.length || game.status == 'WIN') return
  const newGuess = [...game.guess]
  newGuess[game.round] = params
  setGame({...game, guess: newGuess })
}

function submitGuess(newWord: string[]) {
  
  if (game.round >= game.guess.length) return

  const guessClass: string[] = []

  // remove letters to avoid extra contain colors
  const remaining: string[] = [...game.correct]

  // go through each word in the submitted word to find used/correct

  // check for correct, remove in remaining
  newWord.map((w, ind) => {
    // correct match
    let className = 'used'
    if (game.correct[ind] == w) {
      (game.letters.correct as string[]).push(w)
      className = 'correct'
      remaining[ind] = ''
    }
    guessClass.push(className)
  })

  // loop again (combine?), check remaining
  newWord.map((w, ind) => {
    let className = guessClass[ind]
    const remainingIndex = remaining.indexOf(w)
    if (remainingIndex >= 0 && game.correct.indexOf(w) >= 0) {
      (game.letters.contains as string[]).push(w)
      className = 'contains'
      remaining[remainingIndex] = ''
    }
    (game.letters.used as string[]).push(w)
    guessClass[ind] = className
  })

  game.keys.map((keyRow, rowIndex) => {
    keyRow.map((key, keyIndex) => {
      let keyClass = game.keyClass[rowIndex][keyIndex]
      if ((game.letters.used as string[]).indexOf(key) >= 0 && (game.letters.correct as string[]).indexOf(key) < 0) {
        keyClass = "used"
      }
      if ((game.letters.contains as string[]).indexOf(key) >= 0 && (game.letters.correct as string[]).indexOf(key) < 0) {
        keyClass = "contains"
      }
      if ((game.letters.correct as string[]).indexOf(key) >= 0) {
        keyClass = "correct"
      }
      game.keyClass[rowIndex][keyIndex] = keyClass
    })
  })

  game.guessClass[game.round] = guessClass

  setGame({...game, round: game.round+1})
}

function gameReset() {

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
    guessClass: [[], [], [], [], []],
    letters: {
      used: [], contains: [], correct: []
    }
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
