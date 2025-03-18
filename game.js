"use strict";

  (function () {
    let playerBalls = 5;
    let botBalls = 5;
    let playerName = prompt("Введите имя", "");
    let botName = "Бот";

    alert(`Старт игры!
        Количество шариков:
        ${playerName}: 5
        ${botName}: 5`);
    
    const getRandomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    
    const playRPS = () => {
      const choices = ["Камень", "Ножницы", "Бумага"];
      const playerChoice = prompt(
        `${playerName}, выберите: ${choices.join(", ")}`
      );
      const botChoice = choices[getRandomInt(0, 2)];
      alert(`${botName} выбрал: ${botChoice}`);
    
      if (
        (playerChoice === "Камень" && botChoice === "Ножницы") ||
        (playerChoice === "Ножницы" && botChoice === "Бумага") ||
        (playerChoice === "Бумага" && botChoice === "Камень")
      ) {
        alert(`${playerName} выиграл! Вы начинаете первым.`);
        return true; 
      } else if (playerChoice === botChoice) {
        alert("Ничья! Игрок начинает первым.");
        return true; 
      } else {
        alert(`${botName} выиграл! Он начинает первым.`);
        return false;
      }
    };
    
    const playMarbles = (firstPlayer) => {
      while (playerBalls > 0 && botBalls > 0) {
        let currentPlayer = firstPlayer ? playerName : botName;
        let currentBalls = firstPlayer ? playerBalls : botBalls;
    
        let guess, playedBalls;
        if (currentPlayer === playerName) {
          playedBalls = parseInt(
            prompt(`Сколько шариков вы хотите загадать? (1 - ${currentBalls})`),
            10
          );
          while (
            isNaN(playedBalls) ||
            playedBalls < 1 ||
            playedBalls > currentBalls
          ) {
            playedBalls = parseInt(
              prompt(
                `Недопустимое значение. Сколько шариков вы хотите загадать? (1 - ${currentBalls})`
              ),
              10
            );
          }
          guess = confirm(
            "Угадайте четное количество? (ОК - четное, Отмена - нечетное)"
          )
            ? "even"
            : "odd";
        } else {
          playedBalls = getRandomInt(1, currentBalls);
          guess = getRandomInt(0, 1) ? "even" : "odd";
        }
    
        const totalPlayedBalls = playedBalls;
    
        const isEven = totalPlayedBalls % 2 === 0;
        const botGuessedCorrectly =
          (isEven && guess === "even") || (!isEven && guess === "odd");
    
        if (botGuessedCorrectly) {
          alert(`${botName} угадал! Он забирает все шарики.`);
          botBalls += totalPlayedBalls;
          firstPlayer
            ? (playerBalls -= totalPlayedBalls)
            : (botBalls -= totalPlayedBalls);
        } else {
          alert(`${botName} не угадал! Вы забираете все шарики.`);
          playerBalls += totalPlayedBalls;
          firstPlayer
            ? (playerBalls -= totalPlayedBalls)
            : (botBalls += totalPlayedBalls);
        }
    
        firstPlayer = !firstPlayer;
      }
    
      if (playerBalls <= 0) {
        alert(`${botName} победил!`);
      } else {
        alert(`${playerName} победил!`);
      }
    };
    
    const startGame = () => {
      playerBalls = 5; 
      botBalls = 5; 
    
      const firstPlayer = playRPS(); 
      playMarbles(firstPlayer); 
    
      const playAgain = confirm("Хотите сыграть еще?");
      if (playAgain) {
        startGame(); 
      }
    };
    
    window.Game = startGame;
  })();
