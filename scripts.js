// GameBoard module
const GameBoard = (() => {
    let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]; // private

    const getBoard = () => [...board]; // return a copy

    const placeMarker = (position, marker) => {
        if (board[position] === "-") {
            board[position] = marker;
            return true;
        }
        return false; // position already taken
    };

    const resetBoard = () => {
        board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    };

    const printBoard = () => {
        console.log(
            `${board[0] || "-"} | ${board[1] || "-"} | ${board[2] || "-"}`
        );
        console.log("---------");
        console.log(
            `${board[3] || "-"} | ${board[4] || "-"} | ${board[5] || "-"}`
        );
        console.log("---------");
        console.log(
            `${board[6] || "-"} | ${board[7] || "-"} | ${board[8] || "-"}`
        );
    };

    return { getBoard, placeMarker, resetBoard, printBoard };
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
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");
    let currentPlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        console.log(`It's now ${currentPlayer.name}'s turn.`);
    };

    const playRound = (index) => {

        if (gameOver) {
            console.log("Game over. Please reset to play again.");
            return;
        }
        
        if (GameBoard.placeMarker(index, currentPlayer.marker)) {
            console.log(`${currentPlayer.name} placed ${currentPlayer.marker} at position ${index}`);
            console.log(GameBoard.printBoard());

            if (checkWinner(GameBoard.getBoard(), currentPlayer.marker)) {
                console.log(`${currentPlayer.name} wins!`);
                gameOver = true;
                return;
            }

            if (!GameBoard.getBoard().includes("-")) {
                console.log("It's a tie!");
                gameOver = true;
                return;
            }

            switchPlayer();
        } else {
            console.log("Invalid move. Try again!");
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
        currentPlayer = player1;
        gameOver = false;
        console.log("Game reset. Let's play!");
        GameBoard.printBoard();
    };

    return { playRound, resetGame };
})();

//Testing
// GameController.resetGame();