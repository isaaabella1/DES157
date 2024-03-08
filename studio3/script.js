class Ship {
    constructor(name, length, displayChar) {
        this.displayChar = displayChar;
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
            new Ship('Carrier', 3,'A'),
            new Ship('Battleship', 4,'B'),
            new Ship('Cruiser', 3,'C'),
            new Ship('Submarine', 3,'D'),
            new Ship('Destroyer', 2,"E")
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
                cell.addEventListener('click', function() {
                    handleCellClick(i, j);
                });
            } else {
                cell.classList.add('ship-board-cell');
            }

            cell.textContent = board[i][j];
            container.appendChild(cell);
        }
    }
}

function handleCellClick(row, col) {
        if (players[currentPlayer].shipBoard[row][col] !== "*") {
            console.log(`Hit at (${row}, ${col}) on ${players[1].name}'s ship board`);
            // write checkWhichShipHit();
            UpdateFiringBoard(row,col,"Hit"); 
            HitShip(row,col,computerPlayer);
        } else {
            UpdateFiringBoard(row,col,"Miss");
            console.log("Location was a miss");
        }
        if (hasPlayerWon(players[currentPlayer])) {
            console.log(`${players[currentPlayer].name} has won!`);  //added
            // Perform any actions or display messages for winning
        } else {
            AITurn();
        }
        
}
function UpdateFiringBoard(row, col, NewChar) {
    players[0].firingBoard[row][col] = NewChar;
    renderBoard(firingBoardContainer, players[0].firingBoard, true);
}
function updateShipsBoard(row, col, newChar){
    player1.shipBoard[row][col] = newChar;
    renderBoard(shipBoardContainer, player1.shipBoard, false);

}
function HitShip(row, col, player) {
    const shipChar = player.shipBoard[row][col];

    const matchingShip = player.ships.find(ship => ship.displayChar === shipChar);

    if (matchingShip) {
        matchingShip.numHits++;
        console.log(`Hit on ${matchingShip.name}!`);

        if (matchingShip.numHits === matchingShip.length) {
            matchingShip.isSunk = true;
            console.log(`${matchingShip.name} is sunk!`);
            player.shipsSunk++;
        }
    } else {
        console.log(`No matching ship found for character ${shipChar}`);
    }
}
function placeShips(){

    displayPlaceShipOptions();
    // for (let i = 0; i < ship.length; i++) {
    //     this.shipBoard[startRow + i][startCol] = ship.shipChar;
    // }
}
// Initial render


//Game Control Functions 



function AITurn() {
    console.log("AI is taking a turn");
    let { row, col } = generateRandomCoord();
    checkAIGuess(row,col,player1);
    switchPlayer();  
}
function checkAIGuess(row, col,player1){
    if (player1.shipBoard[row][col] !== "*"){
        updateShipsBoard(row,col,"Hit"); 
        console.log(`${row}, ${col}Location was a Hit`);
        HitShip();
    } else {
        updateShipsBoard(row,col,"Miss");
        console.log(`${row}, ${col}Location was a miss`);
    }
    if (hasPlayerWon(players[1])) {  
        console.log(`${players[1].name} has won!`);
        // Perform any actions or display messages for winning
    } else {
        switchPlayer();
    }
}
function generateRandomCoord() {
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);
    return { row, col };
}


function switchPlayer() { //changes current player
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
