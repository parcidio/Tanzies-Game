// ctr + shift + L => will select the next occurances of a word
// ctr + D => will select all the occurances of a word
import React from "react";
import "./App.css";
import Die from "./button";
import Confetti from "react-confetti";

import Timer from "./timer";

function App() {
  //Hooks

  const [randomNumbers, setRandomNumber] = React.useState(allNewDice());
  const [numberOfRolls, setnumberOfRolls] = React.useState(0);

  //custume timer hook
  const time = new Date();
  const oneMinute = 60;
  time.setSeconds(time.getSeconds() + oneMinute); // 1 minutes timer
  //end timer hook
  const [tenzies, setTenzies] = React.useState(false);
  const [tenziesLost, setTenziesLost] = React.useState(false);

  React.useEffect(() => {
    //CHECK THE CODITIONS TO WIN/LOOSE THE GAME
    let isAllValueEqual = randomNumbers.every(
      (die) => die.value === randomNumbers.at(0).value
    );
    let isAllHeld = randomNumbers.every(
      (die) => die.isHeld === randomNumbers.at(0).isHeld
    );
    if (isAllHeld && isAllValueEqual) {
      setTenzies(true);
    }
  }, [randomNumbers]);

  //End Hooks
  function handleClick() {
    setRandomNumber((dices) =>
      dices.map((currentDie) => {
        let arrayElement = allNewDice().at(currentDie.id);
        return currentDie.id === arrayElement.id && currentDie.isHeld === false
          ? { ...currentDie, value: arrayElement.value }
          : currentDie;
      })
    );
    if (tenzies) {
      setTenzies(false);
      setRandomNumber(allNewDice());
    }
    setnumberOfRolls((prevNumberOfRolls) => prevNumberOfRolls + 1);
  }
  function hold(id) {
    setRandomNumber((oldDice) =>
      oldDice.map((oldDie) => {
        return oldDie.id === id
          ? { ...oldDie, isHeld: !oldDie.isHeld }
          : oldDie;
      })
    );
  }
  function allNewDice() {
    const MAX = 6;
    let randomNumberArray = [];
    for (let i = 0; i < 10; i++) {
      randomNumberArray.push({
        id: i,
        value: Math.ceil(Math.random() * MAX),
        isHeld: false,
      });
    }
    return randomNumberArray;
  }

  let dices = randomNumbers.map((number) => {
    return (
      <Die
        key={number.id}
        isHeld={number.isHeld}
        number={number.value}
        id={number.id}
        handleClick={handleClick}
        holdFunction={hold}
      />
    );
  });

  return (
    <div className="container">
      {tenzies && <Confetti />}
      <div className="sub-container">
        <Timer
          expiryTimestamp={time}
          timeExpired={setTenziesLost}
          hasWon={tenzies}
        />
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="button-container">{dices}</div>

        {!tenziesLost ? (
          <button className="main-button" onClick={() => handleClick()}>
            {tenzies ? "New Game" : "Roll"}
          </button>
        ) : (
          //GIVES THE OPTION TO RESTART THE GAME IF THE USER LOST
          <button
            className="restart-button"
            onClick={() => window.location.reload()}
          >
            Restart
          </button>
        )}

        {(tenzies || tenziesLost) && (
          <p>
            You <strong>{tenziesLost ? "lost" : "won"} </strong>the game in{" "}
            {numberOfRolls} roll
            {numberOfRolls >= 1 && "s"}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
