export const Game: GameInfo = {
    status: '',
    correct: [],
    guess: [[]],
    round: 0,
    total: 0,
    keys: [],
    keyClass: [],
    guessClass: []
} satisfies GameInfo

export interface GameInfo {
    status: string,
    correct: string[]
    guess: string[][]
    round: number,
    total: number,
    keys: string[][],
    keyClass: string[][],
    guessClass: string[][]
  }

  export const DefaultKeys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "del"]
  ]

  export function AssignKeyboard(): string[][] {
    return DefaultKeys.map(row => {
        return row.map(key => {
            return key.toUpperCase()
        })
    })
  }