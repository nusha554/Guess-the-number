import React, { useEffect, useState } from 'react'
import winnerAudio from './sounds/winner.mp3';
import './Game.css'

const EASY = 10;
const MEDIUM = 50;
const HARD = 100;
let levelRange;

function Game() {

    const [isOn, setIsOn] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 100));
    const [guessedRight, setGuessedRight] = useState(false);
    const [isTooHigh, setIsTooHigh] = useState(false);
    const [numOfAttemps, setNumOfAttemps] = useState(1);
    const [level, setLevel] = useState(false);
    


    const checkUserGuess = (userInput) => {
        console.log(secretNumber)
        if (userInput == secretNumber) {
            setGuessedRight(true);
            setIsTooHigh(false);
        } else if (userInput > secretNumber) {
           setIsTooHigh(true);
           setGuessedRight(false);
           setNumOfAttemps(numOfAttemps + 1);
        } else {
            setGuessedRight(false);
            setIsTooHigh(false);
            setNumOfAttemps(numOfAttemps + 1);
        }         
    }

    const userInputValidation = (userInput) => {

    }

    const handleUserInput = (event) => {
        event.preventDefault();
        console.log(event.target.userInput.value);
        const userInput = event.target.userInput.value;
        setUserInput(userInput);
        checkUserGuess(userInput);
    }

    const setSecretNumberByLevel = (event) => {
        event.preventDefault();
        setIsOn(true);
        if (event.target.id == 'EASY') {
            setSecretNumber((Math.floor(Math.random() * EASY)));
            levelRange = EASY;
        } else if (event.target.id == 'MEDIUM') {
            setSecretNumber((Math.floor(Math.random() * MEDIUM)));
            levelRange = MEDIUM;
        } else {
            setSecretNumber((Math.floor(Math.random() * HARD)));
            levelRange = HARD;
        }
    }

    const restartGame = () => {
        setIsOn(false);
        setGuessedRight(false);
        setNumOfAttemps(1);
        setIsTooHigh(false);
        setUserInput('');
    } 

    const playWinnerAudio = () => {
        new Audio(winnerAudio).play();
      }

    return (
        <div className = "game">
           <div className='wrapper'>
                <h1 className="header"> Guess The Number! </h1>
                {!isOn ? 
                    (<div> 
                        <button id="EASY" className="easyBtn" onClick={setSecretNumberByLevel}> Nice'n Easy </button> 
                        <button id="MEDIUM" className="mediumBtn" onClick={setSecretNumberByLevel}> Let's spice things up </button>
                        <button id="HARD" className="hardBtn" onClick={setSecretNumberByLevel}> Give all you've got! </button>
                    </div>
                    ) :
               ( <div> 
                   { levelRange && !guessedRight && (<h1 className="headerSmall"> Guess number between 1 to {levelRange} </h1>)}
                    <form onSubmit={handleUserInput}>
                     { !guessedRight && ( <input required type="number" name="userInput" placeholder="Your guess"/>)}
                        { !guessedRight ? ( <input className="playBtn" type="submit" value="Lets check!"/> ) : 
                            ( <button className="restartBtn" onClick={restartGame}> Let's play again </button> )}
                    </form>
                    { userInput ? 
                        (
                            <div className='result'> 
                                { guessedRight && playWinnerAudio()}
                                { guessedRight && (<span  className={secretNumber > 9 ? "guessNumberLarge": "guessNumberSmall"}> {secretNumber} </span>) }
                                { guessedRight && (<span  className="success"> You guessed right after <span className="numOfGuess"> {numOfAttemps} </span> attemps!</span>)}
                                {isTooHigh && (<span  className="guessAgain"> Your Guess is too high! </span>)}
                                {!isTooHigh && !guessedRight && (<span className="guessAgain"> Your Guess is too low! </span>)}
                            </div> 
                        ) : ""
                    }
               </div>
               )}
           </div>
        </div>
    )

}


export default Game;