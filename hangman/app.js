const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guessRemain')

const game = new Hangman("Hello World", 3)

puzzleEl.textContent = game.puzzle
guessesEl.textContent = game.message
console.log(game.status)

window.addEventListener('keypress', function(e) {

    const keyPressed = String.fromCharCode(e.charCode)
    game.makeGuess(keyPressed)

    puzzleEl.textContent = game.puzzle
    guessesEl.textContent = game.message

    console.log(game.status)
})
