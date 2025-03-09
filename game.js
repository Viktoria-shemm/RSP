'use strict';
(() => {
    const FIGURES_RUS = ["камень", "ножницы", "бумага"];
    const result = {
        computer: 0,
        player: 0,
    };

    const getRandomIntInclusive = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const playRound = (playerChoice) => {
        const computerChoice = FIGURES_RUS[getRandomIntInclusive(0, FIGURES_RUS.length - 1)];
        let outcome = '';

        if (playerChoice === computerChoice) {
            outcome = 'Ничья!';
        } else if (
            (playerChoice === 'камень' && computerChoice === 'ножницы') ||
            (playerChoice === 'ножницы' && computerChoice === 'бумага') ||
            (playerChoice === 'бумага' && computerChoice === 'камень')
        ) {
            outcome = 'Вы выиграли!';
            result.player++;
        } else {
            outcome = 'Компьютер выиграл!';
            result.computer++;
        }

        alert(`Вы выбрали: ${playerChoice}\n Компьютер выбрал: ${computerChoice}\n Результат: ${outcome}`);
    };

    const game = () => {
        const playerChoice = prompt("Введите камень, ножницы или бумага (или отмена для выхода):");
        
        if (playerChoice === null) {
            const confirmExit = confirm("Вы точно хотите выйти?");
            if (confirmExit) {
                alert(`Итог: Вы - ${result.player}, Компьютер - ${result.computer}`);
                return;
            } else {
                game(); 
            }
        } else if (FIGURES_RUS.includes(playerChoice)) {
            playRound(playerChoice);
            game(); 
        } else {
            alert("Некорректный ввод. Пожалуйста, попробуйте снова.");
            game(); 
        }
    };

    window.RSP = game;
})();
