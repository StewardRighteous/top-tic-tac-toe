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
        return gameOver;
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

function createPlayer(playerName, playerMarker) {
    let playerName;
    let playerMarker;
    function getPlayerName() {
        return playerName;
    }
    function getPlayerMarker() {
        return playerMarker;
    }
    function selectIndex(){
        let indexValue = prompt("Enter an Index Value");
        return indexValue;
    }
    return { getPlayerMarker, getPlayerName, selectIndex };
}

function gameController(){
    const totalRounds = 3;
    const eachRoundWinner = [];
    let roundCounter = 0;
    player1Name = prompt("Player 1 name : ");
    player2Name = prompt("Player 2  name :");
    player1 = createPlayer(player1Name, "X");
    player2 = createPlayer(player2Name , "O");
    function startGame(){
        while(roundCounter != totalRounds){
            gameBoard = createGameBoard();
            if(!gameBoard.gameOver()){
                let indexValue = player1.selectIndex();
                gameBoard.addMarkerXO(indexValue, player1.marker);
                if(gameBoard.gameOver()){
                    break;
                }
                indexValue =player2.selectIndex();
                gameBoard.addMarkerXO(indexValue, player2.marker);
            }
        }
    }   
}