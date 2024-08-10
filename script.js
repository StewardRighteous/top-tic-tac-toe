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
    // Returns the marker in the gameboard for the given index
    function getGameBoardMarkers(index) {
        return gameBoard[index];
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
    function clearLastRoundWinner() {
        isJoined = {
            rowStatus: false,
            columnStatus: false,
            diagonalStatus: false,
            drawSatus: false,
            winner: "",
        }
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

    return { addMarkerXO, getWinner, isGameOver, clearBoard, getGameBoardMarkers, clearLastRoundWinner };
}

function createPlayer() {
    let playerName = "player 1";
    let playerMarker = "X";
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
    return { getPlayerMarker, getPlayerName, setPlayerName, setPlayerMarker };
}

function createNewGame(gameBoard, player1, player2) {
    const rounds = 3;
    let currentRound = 1;
    let winners = [];
    function getRound() {
        return currentRound - 1;
    }
    function getWinnerOfRound(round) {
        return winners[round - 1];
    }
    // Get player names from the user and sets their respective markers
    function setPlayerNamesWithMarkers(playerName1, playerName2) {
        player1.setPlayerName(playerName1);
        player1.setPlayerMarker("X");
        player2.setPlayerName(playerName2);
        player2.setPlayerMarker("O");
    }
    // check for game over after index selection
    function roundCheck() {
        if (currentRound <= rounds && gameBoard.isGameOver()) {
            winners.push(gameBoard.getWinner());
            gameBoard.clearBoard();
            currentRound++;
            gameBoard.clearLastRoundWinner();
            return true;
        }
        return false;
    }
    function clearRounds() {
        currentRound = 1;
        winners = [];
    }
    function gameEndCheck() {
        if (currentRound > rounds) {
            return true;
        }
        return false;
    }
    function noOfGamesWon(marker) {
        let noOfMarker = winners.filter(value => value == marker).length;
        return noOfMarker;
    }
    // Winner of Three Rounds
    function getTotalWinner() {
        let firstPlayerWon = noOfGamesWon("X");
        let secondPlayerWon = noOfGamesWon("O");
        let draw = noOfGamesWon("draw");
        // display who got the most
        if (firstPlayerWon > secondPlayerWon && firstPlayerWon > draw) {
            return player1.getPlayerName();
        } else if (secondPlayerWon > firstPlayerWon && secondPlayerWon > draw) {
            return player2.getPlayerName();
        } else {
            return "draw";
        }
    }
    return { roundCheck, getTotalWinner, noOfGamesWon, setPlayerNamesWithMarkers, gameEndCheck, getRound, clearRounds, getWinnerOfRound };
}

(function createUIController() {
    // Start and Restart Game Buttons
    const gameContainer = document.querySelector(".game-container");
    const userButtons = gameContainer.querySelector(".buttons");
    const scoreCard = gameContainer.querySelector("h1");
    const startGameButton = userButtons.querySelector("button.start");
    const restartGameButton = userButtons.querySelector("button.restart");

    // Game Buttons
    const ticTacToeGameContainer = gameContainer.querySelector(".tic-tac-toe");
    const cellButtons = ticTacToeGameContainer.querySelectorAll(".box");

    // Buttons(Markers) cannot be pressed(added) before starting the game
    cellButtons.forEach(button => button.disabled = true);

    // Dialog for Player Names
    const playerNameDialog = document.querySelector(".player-name");
    const playerNameForms = playerNameDialog.querySelector("form");
    const player1NameInput = playerNameDialog.querySelector("input#player1");
    const player2NameInput = playerNameDialog.querySelector("input#player2");
    const addPlayerNameButton = playerNameForms.querySelector("button");

    // winner dialog
    const winnerDialog = document.querySelector(".winner");
    const winnerNotice = winnerDialog.querySelector(".winner-notice");
    const winnerSentece = winnerDialog.querySelector("p");
    const winnerName = winnerNotice.querySelector("h1");
    const newGameButton = winnerDialog.querySelector("button");

    // Making dialogs Not Cancellabe when clicked Esc
    playerNameDialog.addEventListener("cancel", (e)=> {
        e.preventDefault();
    });
    winnerDialog.addEventListener("cancel", (e)=>{
        e.preventDefault();
    });

    // UI controller will have all details with these objects
    let game;
    let player1 = createPlayer();
    let player2 = createPlayer();
    let gameBoard = createGameBoard();
    let playerTurn = "X";

    function switchTurn() {
        playerTurn = (playerTurn == "X") ? "O" : "X";
    }

    function displayScoreCard() {
        scoreCard.textContent =
            `${player1.getPlayerName()} == ${game.noOfGamesWon("X")} || ${player2.getPlayerName()} == ${game.noOfGamesWon("O")} `;
    }

    function displayGameBoard() {
        cellButtons.forEach(button => {
            let indexValue = button.getAttribute("data-index");
            if (gameBoard.getGameBoardMarkers(indexValue) == undefined) {
                button.className = "box";
                button.textContent = null;
            } else if (gameBoard.getGameBoardMarkers(indexValue) == "X") {
                button.className = "X";
                button.textContent = "X";
            } else {
                button.className = "O";
                button.textContent = "O";
            }
        });
    }

    function displayRoundEnd() {
        if (game.roundCheck()) {
            let round = game.getRound();
            let winner = game.getWinnerOfRound(round);
            if (winner == "X" || winner == "O") {
                let winnerName = (winner == "X") ? player1.getPlayerName() : player2.getPlayerName();
                scoreCard.textContent = `Round ${game.getRound()}/3 winner is ${winnerName}`;
            } else {
                scoreCard.textContent = `Draw! Click any cell to start next round`
            }
        }
    }

    function displayGameEnd() {
        if (game.gameEndCheck()) {
            let winner = game.getTotalWinner();
            if(winner == "draw"){
                winnerSentece.textContent = "The Game is";
                winnerName.textContent = "DRAW";
            }else{
                winnerSentece.textContent = "The winner is"
                winnerName.textContent = winner ;
            }
            winnerDialog.showModal();
            game.clearRounds();
        }
    }

    // create new Game and initialize all objects
    function newGame() {
        winnerDialog.close();
        player1 = createPlayer();
        player2 = createPlayer();
        gameBoard = createGameBoard();
        playerTurn = "X";
        game = createNewGame(gameBoard, player1, player2);
        playerNameDialog.showModal();
        // Enabling buttons to add markers and removing old markers
        cellButtons.forEach(button => {
            button.disabled = false;
            button.className = "box";
            button.textContent = null;
        });
    }

    // Buttons to start new game
    startGameButton.addEventListener("click", newGame);
    restartGameButton.addEventListener("click", newGame);
    newGameButton.addEventListener("click", newGame)

    // Add Names to the player
    addPlayerNameButton.addEventListener("click", () => {
        let playerName1 = player1NameInput.value ?? "player 1";
        let playerName2 = player2NameInput.value ?? "player 2";
        game.setPlayerNamesWithMarkers(playerName1, playerName2);
        playerNameDialog.close();
        player1NameInput.value = "";
        player2NameInput.value = "";
        displayScoreCard();
    });

    // Add marker to gameboard and Check for game over
    cellButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let indexValue = button.getAttribute("data-index");
            if (playerTurn == "X") {
                gameBoard.addMarkerXO(indexValue, player1.getPlayerMarker())
            } else {
                gameBoard.addMarkerXO(indexValue, player2.getPlayerMarker())
            }
            button.disabled = true;
            displayGameBoard();
            displayScoreCard();
            displayRoundEnd();
            displayGameEnd();
            switchTurn();
        });
    });
})();

