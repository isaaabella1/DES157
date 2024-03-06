class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.numHits = 0;
        this.isSunk = false;
        this.isVertical = false;
    }
}
class Player {
    constructor(name, isAI = false) {
        this.name = name;
        this.shipsSunk = 0;
        this.isAI = isAI;
        this.ships = [
            new Ship('Carrier', 5),
            new Ship('Battleship', 4),
            new Ship('Cruiser', 3),
            new Ship('Submarine', 3),
            new Ship('Destroyer', 2)
        ];
        this.shipBoard = [  //for testing 
            ['*', '*', '*', 'A', 'A', 'A', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*', 'C', '*', '*', '*', '*'],
            ['D', 'D', 'D', '*', '*', 'C', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*', 'C', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*', 'C', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*']
        ];
        // this.shipBoard = createEmptyBoard("*"); 
        this.firingBoard = createEmptyBoard("*");
    }
}

const firingBoardContainer = document.getElementById('firing-board-container');
const shipBoardContainer = document.getElementById('ship-board-container');
// endTurnButton.addEventListener('click', switchPlayer);
const boardSize = 10;
// const playerName = prompt("Enter Player 1's name:");
const playerName = "Isabella";  //for testing change later
const player1 = new Player(playerName);
const computerPlayer = new Player('Computer', true);
const players =  [player1,computerPlayer];
let currentPlayer = 0;
// let gameBoard = createEmptyBoard();


function createEmptyBoard( char) {
    const board = [];
    for (let i = 0; i < boardSize; i++) {
        const row = [];
        for (let j = 0; j < boardSize; j++) {
            row.push(char);
        }
        board.push(row);
    }
    return board;
}

function renderBoard(container, board, isFiringBoard) {
    container.innerHTML = ''; // Clear previous content

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');

            if (isFiringBoard) {
                cell.classList.add('firing-board-cell');
            } else {
                cell.classList.add('ship-board-cell');
            }

            cell.textContent = board[i][j];

            // Add a click event listener to each cell
            if (isFiringBoard) {
                cell.addEventListener('click', () => handleCellClick(i, j));
            }

            container.appendChild(cell);
        }
    }
}

function handleCellClick(row, col) {
    wasGuessAHit(row,col);
    console.log(`Cell clicked at (${row}, ${col})`);

}
function wasGuessAHit(row, col){
    // if
};
function placeShips(){

    displayPlaceShipOptions();
    // for (let i = 0; i < ship.length; i++) {
    //     this.shipBoard[startRow + i][startCol] = ship.shipChar;
    // }
}
// Initial render


//Game Control Functions 


function gameControl() {
    // Check if the current player is AI and call AITurn or playerTurn accordingly
    while(!hasPlayerWon(players[currentPlayer])){
        if (players[currentPlayer].isAI) {
            AITurn();
        } else {
            playerTurn();
        }
        }

    // Switch to the next player
}

function AITurn() {
    console.log("AI is taking a turn");
    
}


function playerTurn() {
    console.log(`${players[currentPlayer].name}'s turn`);
    
}
function switchPlayer() {
    currentPlayer = (currentPlayer + 1) % players.length;
}
function hasPlayerWon(currentPlayer){
    if (currentPlayer.shipsSunk == currentPlayer.ships.length){
        return true;
    } else{
        return false;
    }
}
renderBoard(firingBoardContainer, player1.firingBoard, true);
renderBoard(shipBoardContainer, player1.shipBoard, false);
// gameControl();
