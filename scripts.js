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
    // const player1 = createPlayer("Player 1", "X");
    // const player2 = createPlayer("Player 2", "O");
    let currentPlayer = player1;
    let gameOver = false;

    //HTML DOM Elements
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const resetBtn = document.getElementById("resetBtn");
    const startBtn = document.getElementById("startBtn");
    const player1Input = document.getElementById("player1Name");
    const player2Input = document.getElementById("player2Name");

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

            if (checkWinner(GameBoard.getBoard(), currentPlayer.marker)) {
                message.textContent = `${currentPlayer.name} wins!`;
                gameOver = true;
                return;
            }

            if (!GameBoard.getBoard().includes("-")) {
                message.textContent = "It's a tie!";
                gameOver = true;
                return;
            }

            switchPlayer();
        }
    };

    const checkWinner = (board, marker) => {
        const winConditions = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // cols
        [0,4,8], [2,4,6]           // diagonals
        ];
        return winConditions.some(condition => 
            condition.every(index => board[index] === marker)
        );
    };

    const resetGame = () => {
        GameBoard.resetBoard();
        cells.forEach(cell => cell.textContent = "-");
        currentPlayer = player1;
        gameOver = false;
        message.textContent = `${currentPlayer.name}'s turn`;
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
    });

    return { playRound, resetGame };
})();

//Testing
// GameController.resetGame();