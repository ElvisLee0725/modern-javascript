 'use strict'
class Hangman {
    constructor(wordToGuess, guessRemaining, letterGuessed = [], status = 'playing') {
        this.wordToGuess = wordToGuess.toLowerCase().split('')
        this.guessRemaining = guessRemaining
        this.letterGuessed = letterGuessed
        this.status = status
    }
    updateStatus() {
        if(this.guessRemaining > 0 && !this.puzzle.includes('*')) {
            this.status = 'finished'
        }
        else if(this.guessRemaining === 0) {
            this.status = 'failed'
        }
        else {
            this.status = 'playing'
        }
    }
    get puzzle() {
        // 1. Loop through each wordToGuess, if that char is contained in letterGuessed, return the letter
        // 2. If not, return *
        let puzzle = ''
        this.wordToGuess.forEach((ch) => {
            if(this.letterGuessed.includes(ch)) {
                puzzle += ch
            }
            else if(ch === ' '){
                puzzle += ' '
            }
            else {
                puzzle += '*'
            }
        })
        return puzzle
    }
    makeGuess(guess) {
        if(this.status !== 'playing') {
            return
        }
    
        guess = guess.toLowerCase()
        const isUnique = !this.letterGuessed.includes(guess)
        const isBadGuess = !this.wordToGuess.includes(guess)
        if(isUnique) {
            this.letterGuessed.push(guess)
        }
    
        if(isUnique && isBadGuess) {
            this.guessRemaining -= 1
        }
        this.updateStatus()
    }
    get message() {
        if(this.status === 'playing') {
            return `You have ${this.guessRemaining} guesses remaining.`
        }
        else if(this.status === 'failed') {
            return `Nice try, the answer is "${this.wordToGuess.join('')}".`
        }
        else if(this.status === 'finished') {
            return `Good job! You got the word!!`
        }
    }
}

export { Hangman as default} 



