import { GameInfo } from "./game"

function Row({ game, letters, row }: { game: GameInfo, letters: string[], row: number }) {
    return (
        <div className="row">
        {game.correct.map((_, col) => {
            return <div key={col} className={"col " + game.guessClass[row][col]}>{letters[col]}</div>
        })}
        </div>
    )
}

export default function Rows({ game }: { game: GameInfo }) {
    return (
    <div className="rows">
    {game.guess.map((letters, letterKey) => {
        return <Row key={letterKey} letters={letters} row={letterKey} game={game} />
    })}
    </div>
    )
}