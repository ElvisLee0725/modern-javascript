// 'use strict'

const Hangman = function(wordToGuess, guessRemaining) {
    this.wordToGuess = wordToGuess.toLowerCase().split('')
    this.guessRemaining = guessRemaining
    this.letterGuessed = [];
}

Hangman.prototype.getPuzzle = function() {
    // 1. Loop through each wordToGuess, if that char is contained in letterGuessed, return the letter
    // 2. If not, return *
    let puzzle = ''
    this.wordToGuess.forEach((ch) => {
        if(this.letterGuessed.includes(ch)) {
            puzzle += ch
        }
        else {
            puzzle += '*'
        }
    })
    return puzzle
}

Hangman.prototype.makeGuess = function(guess) {
    guess = guess.toLowerCase()
    const isUnique = !this.letterGuessed.includes(guess)
    const isBadGuess = !this.wordToGuess.includes(guess)
    if(isUnique) {
        this.letterGuessed.push(guess)
    }

    if(isUnique && isBadGuess) {
        this.guessRemaining -= 1
    }
}

const game = new Hangman("Hello", 3)

console.log(game.getPuzzle())
console.log(`You have ${game.guessRemaining} guesses remaining`)

window.addEventListener('keypress', function(e) {
    const keyPressed = String.fromCharCode(e.charCode)
    game.makeGuess(keyPressed)

    console.log(game.getPuzzle())
    console.log(`You have ${game.guessRemaining} guesses remaining`)
})