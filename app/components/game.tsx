export const Game: GameInfo = {
    status: '',
    correct: [],
    guess: [[]],
    round: 0,
    keys: [],
    keyClass: [],
    guessClass: []
} satisfies GameInfo

export interface GameInfo {
    status: string,
    correct: string[]
    guess: string[][]
    round: number,
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

  export const words = "happy drive sound"