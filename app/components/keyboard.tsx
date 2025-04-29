"use client"

import { useState } from 'react';
import { GameInfo } from './game';

export interface KeyInfo {
  k: string
  onClickHandle: (letter: string) => void,
  className: string
}

function Key({k, onClickHandle, className }: KeyInfo) {
    return <button type="button" aria-label={"Key: " + k} onClick={() => onClickHandle(k)}
    className={"key-" + k + " key " + className} value={k}>
    {k}
  </button>
}

export default function Keyboard({
  game,
  getGuess,
  submitGuess
}: {
  game: GameInfo,
  getGuess: (props: string[]) => void,
  submitGuess: (props: string[]) => void
}) {
  const [word, setWord] = useState<string[]>([])

  function handleClick(letter: string) {

    const newWord = word.concat()

    if (letter == 'DEL') {
      newWord.pop()
      setWord([...newWord])
      getGuess([...newWord])
      return
    }

    if (letter == 'ENTER') {
      if (newWord.length < game.correct.length) return
      setWord([])
      submitGuess(newWord)
      return
    }

    if (word.length >= game.correct.length) return

    getGuess([...newWord, letter])
    setWord([...newWord, letter])
  }

  return <div className="keyboard">
  { game.keys.map((keyArr, rowKey) => {
      return <div key={rowKey} className="keys">
        { keyArr.map((key, keyIndex) => {
          if (!game.keyClass[rowKey]) return
          return <Key onClickHandle={handleClick} key={"k-" + key} k={key} className={game.keyClass[rowKey][keyIndex]} />
        }) }
      </div>
  }) }
  </div>
}
