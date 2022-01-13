import { makeAutoObservable } from "mobx"
import list from '../fiveLetterWords.js'

class GameStore {
  constructor() {
    makeAutoObservable(this)
    this.secretWord = list.words[Math.floor(Math.random() * (list.words.length))]
    console.log('secret word is ' + this.secretWord)
  }

  wordGuesses = [];
  lettersTried = [];
  currentGuess = new Array(5)
  secretWord = ""
  isCurrentWordInvalid = false;

  createWord = () => {
    this.wordGuesses = []
  }

  recordLetter = (value, position) => {
    this.isCurrentWordInvalid = false;
    this.currentGuess[position] = value;
  }

  submitGuess = () => {
    if (!list.words.includes(this.currentGuess.join(""))) {
      this.isCurrentWordInvalid = true;
      return false;
    }
    this.wordGuesses.push(this.currentGuess.join(""))
    this.currentGuess = new Array(5)
  }

  resetGuess = () => {
    this.currentGuess = new Array(5)
  }

  getGuessLocationInWord = (letter, position) => {
    const positionOfCharacter = this.secretWord.indexOf(letter);
    if (positionOfCharacter < 0) {
      return {none: true}
    }
    return this.secretWord.charAt(position) === letter ? {correct: true}: {wrongPosition: true};
  }

  getStatusOfLetterInPreviousGuesses = (letter) => {
    let match = false;
    let alreadyGuessed = false;
    this.wordGuesses.every((guess) => {
      if (guess.includes(letter)){
        if (this.secretWord.includes(letter)) {
          match = true;
          alreadyGuessed = true;
          return false;
        }
        alreadyGuessed = true;
        return true;
      }
      return true;
    })

    if (!alreadyGuessed) {
      return {neverUsed: true}
    }
    return match ? {match: true} : {alreadyGuessed: true}

  }

}

export default new GameStore();