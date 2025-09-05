// GameBoard module
const GameBoard = (() => {
    let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]; // private

    const getBoard = () => board; // return a copy

    const placeMarker = (index, marker) => {
        if (board[index] === "-") {
            board[index] = marker;
            return true;
        }
        return false; // position already taken
    };

    const resetBoard = () => {
        board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    };

    return { getBoard, placeMarker, resetBoard};
})();


// Player factory
function createPlayer(name, marker) {
  // return object with name and symbol
  return {
    name,
    marker
  }
}

// GameController module
const GameController = (function () {
    let player1, player2;
    let currentPlayer = player1;
    let gameOver = false;
    let scores = { player1: 0, player2: 0 };

    //HTML DOM Elements
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const resetBtn = document.getElementById("resetBtn");
    const startBtn = document.getElementById("startBtn");
    const player1Input = document.getElementById("player1Name");
    const player2Input = document.getElementById("player2Name");
    const playerInputsDiv = document.getElementById("playerInputs");
    const player1ScoreEl = document.getElementById("player1Score");
    const player2ScoreEl = document.getElementById("player2Score");

    const winConditions = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        message.textContent = `${currentPlayer.name}'s turn`;
    };

    const playRound = (index) => {

        if (gameOver) {
            message.textContent = "Game over. Please reset to play again.";
            return;
        }
        
        if (GameBoard.placeMarker(index, currentPlayer.marker)) {
            cells[index].textContent = currentPlayer.marker;

            const winningCells = checkWinner(GameBoard.getBoard(), currentPlayer.marker);
            if (winningCells) {
                message.textContent = `${currentPlayer.name} wins!`;
                gameOver = true;

                // highlight winning cells
                winningCells.forEach(i => cells[i].classList.add("winner"));

                // update score
                if (currentPlayer === player1) scores.player1++;
                else scores.player2++;

                player1ScoreEl.textContent = scores.player1;
                player2ScoreEl.textContent = scores.player2;

                return;
            }

            if (!GameBoard.getBoard().includes("-")) {
                message.textContent = "It's a tie!";
                gameOver = true;
                return;
            }

            switchPlayer();
        }

        // Hide the inputs
        playerInputsDiv.classList.add("hidden");
    };

    const checkWinner = (board, marker) => {
        for (let condition of winConditions) {
            if (condition.every(index => board[index] === marker)) {
                return condition; // return winning cells
            }
        }
        return null;
    };

    const resetGame = () => {
        GameBoard.resetBoard();
        cells.forEach(cell => {
            cell.textContent = "-"
            cell.classList.remove("winner");
        });
        gameOver = false;

        if (player1 && player2) {
            currentPlayer = player1;
            message.textContent = `${currentPlayer.name}'s turn`;
        } else {
            message.textContent = "Enter player names and click Start Game";
        }

        // Show the inputs
        playerInputsDiv.classList.remove("hidden");
    };

    //Event Listeners
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const index = parseInt(cell.dataset.index);
            playRound(index);
        });
    });

    resetBtn.addEventListener("click", resetGame);

    startBtn.addEventListener("click", () => {
        const name1 = player1Input.value.trim() || "Player X";
        const name2 = player2Input.value.trim() || "Player O";
        player1 = createPlayer(name1, "X");
        player2 = createPlayer(name2, "O");
        currentPlayer = player1;
        GameBoard.resetBoard();
        cells.forEach(cell => cell.textContent = "-");
        gameOver = false;
        message.textContent = `${currentPlayer.name}'s turn`;

        // Hide the inputs
        playerInputsDiv.classList.add("hidden");

        //Reset Scores
        scores.player1 = 0;
        scores.player2 = 0;
        player1ScoreEl.textContent = scores.player1;
        player2ScoreEl.textContent = scores.player2;
    });

    return { playRound, resetGame };
})();

//Testing
// GameController.resetGame();