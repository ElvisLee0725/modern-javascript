const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guessRemain')
let game

window.addEventListener('keypress', (e) => {
    const keyPressed = String.fromCharCode(e.charCode)
    game.makeGuess(keyPressed)

    render()
})

const render = () => {
    puzzleEl.innerHTML = ''
    guessesEl.textContent = game.message

    game.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleEl.appendChild(letterEl)
    })
}

const startGame = async () => {   
    const puzzle = await getPuzzle('2')
    game = new Hangman(puzzle, 5)
    
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()
