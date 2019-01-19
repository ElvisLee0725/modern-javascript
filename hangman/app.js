const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guessRemain')
let game

window.addEventListener('keypress', (e) => {
    const keyPressed = String.fromCharCode(e.charCode)
    game.makeGuess(keyPressed)

    render()
})

const render = () => {
    puzzleEl.textContent = game.puzzle
    guessesEl.textContent = game.message
}

const startGame = async () => {   
    const puzzle = await getPuzzle('2')
    game = new Hangman(puzzle, 5)
    
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()
