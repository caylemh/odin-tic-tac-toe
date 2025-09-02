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
    let players = [];
    let currentPlayerIndex = 0;

    const startGame = (playerOneName, playerTwoName) => {
        players = [createPlayer(playerOneName, "X"), createPlayer(playerTwoName, "O")];
        currentPlayerIndex = 0;
        GameBoard.resetBoard();
        console.log(`Game started! ${players[currentPlayerIndex].name}'s turn.`);
    };

    const getCurrentPlayer = () => players[currentPlayerIndex];

    const switchPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        console.log(`It's now ${players[currentPlayerIndex].name}'s turn.`);
    };

    const playRound = (index) => {
        const currentPlayer = getCurrentPlayer();
        
        if (GameBoard.placeMarker(index, currentPlayer.marker)) {
            console.log(`${currentPlayer.name} placed ${currentPlayer.marker} at position ${index}`);
            console.log(GameBoard.printBoard());
            switchPlayer();
        } else {
            console.log("Invalid move. Try again!");
        }
    };

    return { startGame, playRound, getCurrentPlayer };
})();

//Testing
GameController.startGame("Alice", "Bob");
GameController.playRound(0);
GameController.playRound(0); // invalid, spot taken
GameController.playRound(4);
