function createGameBoard() {
    const gameBoard = new Array(9);
    const rows = [0, 3, 6];
    const columns = [0, 1, 2];
    const diagonal1 = 0;
    const diagonal2 = 2;
    let gameOver = false;
    let isJoined = {
        rowStatus: false,
        columnStatus: false,
        diagonalStatus: false,
        drawSatus: false,
        winner: "",
    }
    function addMarkerXO(indexValue, marker) {
        if (gameBoard[indexValue] == null || gameBoard[indexValue] == undefined) {
            gameBoard.splice(indexValue, 1, marker);
        }
    }
    function getWinner() {
        if (gameOver) {
            return isJoined.winner;
        }
    }
    // clears board for New round
    function clearBoard(){
        gameBoard = new Array(9);
    }
    // Checks for winner
    function isGameOver() {
        isRowJoined();
        isColumnJoined();
        isDiagonalJoined();
        isDraw();
        if (isJoined.rowStatus || isJoined.columnStatus || isJoined.diagonalStatus || isJoined.drawSatus) {
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
        let diagonalValue1 = gameBoard[diagonal1];
        let diagonalValue2 = gameBoard[diagonal1 + 4];
        let diagonalValue3 = gameBoard[diagonal1 + 8];
        if (diagonalValue1== (diagonalValue2 == diagonalValue3)) {
            isJoined.diagonalStatus = true;
            isJoined.winner = gameBoard[diagonal1];
        }
        if (gameBoard[diagonal2] == gameBoard[diagonal2 + 2] == gameBoard[diagonal2 + 4]) {
            isJoined.diagonalStatus = true;
            isJoined.winner = gameBoard[diagonal2];
        }
    }
    // Checks for a draw Match
    function isDraw() {
        let draw = gameBoard.slice(0, 9).includes(undefined);
        if (!draw) {
            isJoined.drawSatus = true;
            isJoined.winner = "draw";
        }
    }

    return { addMarkerXO, getWinner, isGameOver, clearBoard };
}

function createPlayer() {
    let playerName = "player 1";
    let playerMarker = "player 2";
    function setPlayerName(name) {
        playerName = name;
    }
    function setPlayerMarker(marker) {
        playerMarker = marker;
    }
    function getPlayerName() {
        return playerName;
    }
    function getPlayerMarker() {
        return playerMarker;
    }
    function selectIndex() {
        let indexValue = prompt("Enter an Index Value");
        return indexValue;
    }
    return { getPlayerMarker, getPlayerName, selectIndex, setPlayerName, setPlayerMarker };
}

function createNewGame() {
    let gameBoard = createGameBoard();
    const rounds = 3;
    let currentRound = 1;
    const winners = [];
    let player1 = createPlayer();
    let player2 = createPlayer();
    // Get player names from the user and sets their respective markers
    function getPlayerNames(){
        let playerName = prompt("Enter Player Name:");
        player1.setPlayerName(playerName);
        player1.setPlayerMarker("X");
        playerName= prompt("Enter 2 player name: ");
        player2.setPlayerName(playerName);
        player2.setPlayerMarker("O");
    }
    // Play one round
    function round(){
        let players = [player1, player2];
        while(!gameBoard.isGameOver()){
            players.forEach(player =>{
                let indexValue = player.selectIndex();
                gameBoard.addMarkerXO(indexValue,player.getPlayerMarker());
                if(gameBoard.isGameOver()){
                    winners.push(gameBoard.getWinner());
                    alert(`The winner is ${gameBoard.getWinner()}`);
                    gameBoard.clearBoard();
                }
            });
        }
    }
    // Winner of Three Rounds
    function showTotalWinner(){
        let firstPlayerWon= winners.filter(value => value == "X").length;
        let secondPlayerWon= winners.filter(value => value == "O").length;
        let draw= winners.filter(value => value == "draw").length;
        if(firstPlayerWon > secondPlayerWon && firstPlayerWon > draw){
            alert(firstPlayerWon.getPlayerName());
        }else if (secondPlayerWon > firstPlayerWon && secondPlayerWon > draw){
            alert(secondPlayerWon.getPlayerName());
        }else{
            alert("Draw");
        }
    }
    // play game
    function startGame(){
        getPlayerNames();
        while(currentRound <= rounds){
            round();
            currentRound++;
        }
        showTotalWinner();
    }
    return{startGame};
}

function startGame(){
    let newgame = createNewGame();
    newgame.startGame()
}

