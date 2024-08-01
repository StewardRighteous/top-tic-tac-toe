function createGameBoard() {
    const gameBoard = [];
    const rows = [0, 3, 6];
    const columns = [0, 1, 2];
    const diagonal1 = 0;
    const diagonal2 = 2;
    let gameOver = false;
    let isJoined = {
        rowStatus: false,
        columnStatus: false,
        diagonalStatus: false,
        winner: "",
    }
    function addMarkerXO(indexValue, marker) {
        gameBoard.at(indexValue).push(marker);
    }
    function getWinner() {
        if (gameOver) {
            return isJoined.winner;
        }
    }
    // Checks for winner
    function isGameOver() {
        isRowJoined();
        isColumnJoined();
        isDiagonalJoined();
        if (isJoined.rowStatus || isJoined.columnStatus || isJoined.diagonalStatus) {
            gameOver = true;
        }
    }
    // Checks if one of the rows has same marker 
    function isRowJoined() {
        for (let row in rows) {
            if (gameBoard[row] == gameBoard[row + 1] == gameBoard[row + 2]) {
                isJoined.rowStatus = true;
                isJoined.winner = gameBoard[row];
            }
        }
    }
    // Checks if one of the Columns has same marker
    function isColumnJoined() {
        for (let column in columns) {
            if (gameBoard[column] == gameBoard[column + 3] == gameBoard[column + 6]) {
                isJoined.columnStatus = true;
                isJoined.winner = gameBoard[column];
            }
        }
    }
    // Checks if one of the diagonal has same marker
    function isDiagonalJoined() {
        if (gameBoard[diagonal1] == gameBoard[diagonal1 + 4] == gameBoard[diagonal1 + 8]) {
            isJoined.diagonalStatus = true;
            isJoined.winner = gameBoard[diagonal1];
        }
        if (gameBoard[diagonal2] == gameBoard[diagonal2 + 2] == gameBoard[diagonal2 + 4]) {
            isJoined.diagonalStatus = true;
            isJoined.winner = gameBoard[diagonal2];
        }
    }

    return { addMarkerXO, getWinner, isGameOver };
}

function createPlayer() {
    let playerName;
    let playerMarker;
    function setPlayerName(name) {
        playerName = name;
    }
    function getPlayerName() {
        return playerName;
    }
    function setPlayerMarker(marker) {
        playerMarker = playerMarker;
    }
    function getPlayerMarker() {
        return playerMarker;
    }
    return { setPlayerMarker, getPlayerMarker, setPlayerName, getPlayerName };
}