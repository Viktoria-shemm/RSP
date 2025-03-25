"use strict";

(function () {
  let playerBalls = 5;
  let botBalls = 5;
  let playerName = prompt("Введите имя", "") || "Игрок";
  let botName = "Бот";

  alert(`Старт игры!
        Количество шариков:
        ${playerName}: 5
        ${botName}: 5`);

  const choices = ["камень", "ножницы", "бумага"];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getPlayerChoice() {
    let playerChoice = prompt(
      "Выберите: камень, ножницы или бумага"
    ).toLowerCase();
    const matchedOption = choices.find((option) =>
      option.startsWith(playerChoice)
    );
    if (matchedOption) {
      return matchedOption;
    } else {
      alert("Неверный выбор! Пожалуйста, выберите камень, ножницы или бумагу.");
      return getPlayerChoice();
    }
  }

  function playRockPaperScissors() {
    const playerChoice = getPlayerChoice();
    const botChoice = choices[getRandomInt(0, 2)];
    alert(`Бот выбрал: ${botChoice}`);

    if (playerChoice === botChoice) {
      alert("Ничья!");
      return playRockPaperScissors();
    } else if (
      (playerChoice === "камень" && botChoice === "ножницы") ||
      (playerChoice === "ножницы" && botChoice === "бумага") ||
      (playerChoice === "бумага" && botChoice === "камень")
    ) {
      alert("Вы выиграли!");
      return true;
    } else {
      alert("Бот выиграл!");
      return false;
    }
  }

  function askForBalls(player) {
    let balls;
    do {
      balls = prompt(
        `Сколько шариков вы хотите загадать? (1 - ${
          player ? playerBalls : botBalls
        })`
      );
      if (balls === null) return null;
      balls = parseInt(balls);
    } while (
      isNaN(balls) ||
      balls < 1 ||
      balls > (player ? playerBalls : botBalls)
    );
    return balls;
  }

  function isOdd(num) {
    return num % 2 !== 0;
  }

  function playMarbles(startingPlayer) {
    let currentPlayer = startingPlayer;

    while (playerBalls > 0 && botBalls > 0) {
      if (currentPlayer) {
        let ballsToGuess = askForBalls(true);
        if (ballsToGuess === null) return;

        let isPlayerEven = !isOdd(ballsToGuess);
        let botGuess = Math.random() < 0.5 ? "нечетное" : "четное";
        alert(`Бот угадывает: ${botGuess}`);
        let isBotEven = botGuess === "четное";

        if (isPlayerEven === isBotEven) {
          alert("Бот угадал! Он забирает ваши шарики.");
          botBalls += ballsToGuess;
          playerBalls -= ballsToGuess;
          alert(`У Вас ${playerBalls} шариков`);
        } else {
          alert("Бот не угадал! Вы забираете шарики.");
          playerBalls += ballsToGuess;
          botBalls -= ballsToGuess;
          alert(`У Вас ${playerBalls} шариков`);
        }
      } else {
        let ballsToGuessBot = getRandomInt(1, botBalls);

        let playerGuess = confirm(
          `Угадайте, четное или нечетное количество шариков загадал бот? (Нажмите "ОК" для "четное" или "Отмена" для "нечетное")`
        );
        if (playerGuess === null) return;
        alert(`Бот загадал ${ballsToGuessBot} шариков.`);

        let isPlayerEven = !playerGuess;
        let isBotEven = isOdd(ballsToGuessBot);

        if (isPlayerEven === isBotEven) {
          alert("Вы угадали! Вы зарабатываете шарики.");
          playerBalls += ballsToGuessBot;
          botBalls -= ballsToGuessBot;
        } else {
          alert("Вы не угадали! Бот забирает ваши шарики.");
          playerBalls -= ballsToGuessBot;
          botBalls += ballsToGuessBot;
        }
      }

      currentPlayer = !currentPlayer;
    }

    if (playerBalls <= 0) {
      alert("Вы проиграли! У вас больше нет шариков.");
    } else {
      alert("Бот проиграл! Вы выиграли!");
    }
  }

  function startGame() {
    const firstPlayer = playRockPaperScissors();
    playMarbles(firstPlayer);
    if (confirm("Хотите сыграть еще?")) {
      playerBalls = 5;
      botBalls = 5;
      startGame();
    } else {
      alert("Спасибо за игру!");
    }
  }

  window.Game = startGame;
})();
