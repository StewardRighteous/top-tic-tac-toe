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
    function clearBoard() {
        gameBoard.fill(undefined);
        gameOver = false;
    }
    // Checks for winner
    function isGameOver() {
        // we need atleast six markers inorder for the game to get over
        if (numberOfMarkerInGameBoard() >= 5) {
            isRowJoined();
            isColumnJoined();
            isDiagonalJoined();
            isDraw();
            gameOver = (isJoined.rowStatus || isJoined.columnStatus || isJoined.diagonalStatus || isJoined.drawSatus) ? true : false;
            return gameOver;
        }
        return gameOver;
    }
    // Returns number of markers in the gameBoard
    function numberOfMarkerInGameBoard() {
        let count = 0;
        let noOfUnmarkedValues = 0;
        let totalLength = gameBoard.length;
        for (let i = 0; i < totalLength; i++) {
            if (gameBoard[i] == undefined) {
                noOfUnmarkedValues++;
            }
        }
        count = totalLength - noOfUnmarkedValues;
        return count;
    }
    // Checks if one of the rows has same marker 
    function isRowJoined() {
        rows.forEach(value => {
            let rowJoined = (gameBoard[value] != undefined
                && gameBoard[value] == gameBoard[value + 1]
                && gameBoard[value] == gameBoard[value + 2]) ? true : false;
            if (rowJoined) {
                isJoined.rowStatus = true;
                isJoined.winner = gameBoard[value];
            }
        });
    }
    // Checks if one of the Columns has same marker
    function isColumnJoined() {
        columns.forEach(value => {
            let columnJoined = (gameBoard[value] != undefined
                && gameBoard[value] == gameBoard[value + 3]
                && gameBoard[value] == gameBoard[value + 6]) ? true : false;
            if (columnJoined) {
                isJoined.columnStatus = true;
                isJoined.winner = gameBoard[value];
            }
        });
    }
    // Checks if one of the diagonal has same marker
    function isDiagonalJoined() {
        let diagonal1Joined = (gameBoard[diagonal1] != undefined
            && gameBoard[diagonal1] == gameBoard[diagonal1 + 4]
            && gameBoard[diagonal1] == gameBoard[diagonal1 + 8]) ? true : false;
        let diagonal2Joined = (gameBoard[diagonal2] != undefined
            && gameBoard[diagonal2] == gameBoard[diagonal2 + 2]
            && gameBoard[diagonal2] == gameBoard[diagonal2 + 4]) ? true : false;
        if (diagonal1Joined) {
            isJoined.diagonalStatus = true;
            isJoined.winner = gameBoard[diagonal1];
        }
        if (diagonal2Joined) {
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
    function getPlayerNames() {
        let playerName = prompt("Enter Player Name:");
        player1.setPlayerName(playerName);
        player1.setPlayerMarker("X");
        playerName = prompt("Enter 2 player name: ");
        player2.setPlayerName(playerName);
        player2.setPlayerMarker("O");
    }
    // Play given number of rounds
    function round() {
        let players = [player1, player2];
        while (currentRound <= rounds && !gameBoard.isGameOver()) {
            players.forEach(player => {
                 // check for game over after index selection
                 if (currentRound <= rounds && gameBoard.isGameOver()) {
                    winners.push(gameBoard.getWinner());
                    alert(`The winner is ${gameBoard.getWinner()}`);
                    gameBoard.clearBoard();
                    currentRound++;
                }else{
                     // Each Player select an index 
                    let indexValue = player.selectIndex();
                    gameBoard.addMarkerXO(indexValue, player.getPlayerMarker());
                }  
            });
        }
    }
    // Winner of Three Rounds
    function showTotalWinner() {
        // no of games X won
        let firstPlayerWon = winners.filter(value => value == "X").length;
        // no of games O won
        let secondPlayerWon = winners.filter(value => value == "O").length;
        // no of games that was draw
        let draw = winners.filter(value => value == "draw").length;
        // display who got the most
        if (firstPlayerWon > secondPlayerWon && firstPlayerWon > draw) {
            alert(player1.getPlayerName());
        } else if (secondPlayerWon > firstPlayerWon && secondPlayerWon > draw) {
            alert(player2.getPlayerName());
        } else {
            alert("Draw");
        }
    }
    // play game
    function startGame() {
        getPlayerNames();
        round(); 
        showTotalWinner();
    }
    return { startGame };
}



