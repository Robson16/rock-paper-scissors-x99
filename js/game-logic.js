// Player One
let playerOneMoveOneType = undefined;
let playerOneMoveOneValue = undefined;
let playerOneMoveTwoType = undefined;
let playerOneMoveTwoValue = undefined;
let playerOneMoveThreeType = undefined;
let playerOneMoveThreeValue = undefined;

// Player Two
let playerTwoMoveOneType = undefined;
let playerTwoMoveOneValue = undefined;
let playerTwoMoveTwoType = undefined;
let playerTwoMoveTwoValue = undefined;
let playerTwoMoveThreeType = undefined;
let playerTwoMoveThreeValue = undefined;

const setPlayerMoves = (player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) => {
  // 'Player One' or 'Player Two'
  if (player !== 'Player One' && player !== 'Player Two') {
    return;
  }

  if (!moveOneType || !moveTwoType || !moveThreeType) {
    return;
  }

  if (moveOneType !== 'rock' && moveOneType !== 'paper' && moveOneType !== 'scissors') {
    return;
  }

  if (moveTwoType !== 'rock' && moveTwoType !== 'paper' && moveTwoType !== 'scissors') {
    return;
  }

  if (moveThreeType !== 'rock' && moveThreeType !== 'paper' && moveThreeType !== 'scissors') {
    return;
  }

  if (!Number.isInteger(moveOneValue) || !Number.isInteger(moveTwoValue) || !Number.isInteger(moveThreeValue)) {
    return;
  }

  if (moveOneValue < 1 || moveTwoValue < 1 || moveThreeValue < 1) {
    return;
  }

  if (moveOneValue > 99 || moveTwoValue > 99 || moveThreeValue > 99) {
    return;
  }

  if (moveOneValue + moveTwoValue + moveThreeValue > 99) {
    return;
  }

  if (player === 'Player One') {
    playerOneMoveOneType = moveOneType;
    playerOneMoveOneValue = moveOneValue;
    playerOneMoveTwoType = moveTwoType;
    playerOneMoveTwoValue = moveTwoValue;
    playerOneMoveThreeType = moveThreeType;
    playerOneMoveThreeValue = moveThreeValue;
  } else if (player === 'Player Two') {
    playerTwoMoveOneType = moveOneType;
    playerTwoMoveOneValue = moveOneValue;
    playerTwoMoveTwoType = moveTwoType;
    playerTwoMoveTwoValue = moveTwoValue;
    playerTwoMoveThreeType = moveThreeType;
    playerTwoMoveThreeValue = moveThreeValue;
  }
}

const setComputerMoves = () => {
  const moveTypes = ['rock', 'paper', 'scissors'];

  playerTwoMoveOneType = moveTypes[Math.floor(Math.random() * moveTypes.length)];
  playerTwoMoveTwoType = moveTypes[Math.floor(Math.random() * moveTypes.length)];
  playerTwoMoveThreeType = moveTypes[Math.floor(Math.random() * moveTypes.length)];

  let remainingPoints = 99 - 3; // Reserving 1 minimum point for each play

  // First value: ensures at least 1 point is left for the second value
  const firstValue = Math.floor(Math.random() * (remainingPoints - 1)) + 1;
  remainingPoints -= firstValue;

  // Second value: can take any value from 1 to remainingPoints
  const secondValue = Math.floor(Math.random() * remainingPoints) + 1;
  remainingPoints -= secondValue;

  // Third value: takes what remains and adds the reserved point
  const thirdValue = remainingPoints + 1;

  // Adding the reserved minimum points (1 for each move)
  playerTwoMoveOneValue = firstValue + 1;
  playerTwoMoveTwoValue = secondValue + 1;
  playerTwoMoveThreeValue = thirdValue;
};


const getWinner = (playerOneMoveType, playerOneMoveValue, playerTwoMoveType, playerTwoMoveValue) => {
  if (playerOneMoveType === playerTwoMoveType) {
    if (playerOneMoveValue > playerTwoMoveValue) {
      return 'Player One';
    } else if (playerOneMoveValue < playerTwoMoveValue) {
      return 'Player Two';
    } else {
      return 'Tie';
    }
  } else if (
    (playerOneMoveType === 'rock' && playerTwoMoveType === 'scissors') ||
    (playerOneMoveType === 'paper' && playerTwoMoveType === 'rock') ||
    (playerOneMoveType === 'scissors' && playerTwoMoveType === 'paper')
  ) {
    return 'Player One';
  } else {
    return 'Player Two';
  }
}

const getRoundWinner = (round) => {
  switch (round) {
    case 1:
      if (
        playerOneMoveOneType === undefined || playerOneMoveOneValue === undefined ||
        playerTwoMoveOneType === undefined || playerTwoMoveOneValue === undefined
      ) {
        return null;
      }
      return getWinner(playerOneMoveOneType, playerOneMoveOneValue, playerTwoMoveOneType, playerTwoMoveOneValue);
    case 2:
      if (
        playerOneMoveTwoType === undefined || playerOneMoveTwoValue === undefined ||
        playerTwoMoveTwoType === undefined || playerTwoMoveTwoValue === undefined
      ) {
        return null;
      }
      return getWinner(playerOneMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoType, playerTwoMoveTwoValue);
    case 3:
      if (
        playerOneMoveThreeType === undefined || playerOneMoveThreeValue === undefined ||
        playerTwoMoveThreeType === undefined || playerTwoMoveThreeValue === undefined
      ) {
        return null;
      }
      return getWinner(playerOneMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeType, playerTwoMoveThreeValue);
    default:
      return null;
  }
}

const getGameWinner = () => {
  if (
    playerOneMoveOneType === undefined || playerOneMoveOneValue === undefined ||
    playerOneMoveTwoType === undefined || playerOneMoveTwoValue === undefined ||
    playerOneMoveThreeType === undefined || playerOneMoveThreeValue === undefined ||
    playerTwoMoveOneType === undefined || playerTwoMoveOneValue === undefined ||
    playerTwoMoveTwoType === undefined || playerTwoMoveTwoValue === undefined ||
    playerTwoMoveThreeType === undefined || playerTwoMoveThreeValue === undefined
  ) {
    return null;
  }

  const playerOneWins = [1, 2, 3].filter(round => getRoundWinner(round) === 'Player One').length;
  const playerTwoWins = [1, 2, 3].filter(round => getRoundWinner(round) === 'Player Two').length;

  if (playerOneWins > playerTwoWins) {
    return 'Player One';
  } else if (playerTwoWins > playerOneWins) {
    return 'Player Two';
  } else {
    return 'Tie';
  }
}
