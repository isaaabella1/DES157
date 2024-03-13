class Ship {
    constructor(name, length, displayChar) {
        this.displayChar = displayChar; // Symbol representing the ship on the board
        this.name = name; // Name of the ship
        this.length = length; // Length of the ship
        this.numHits = 0; // Number of hits the ship has taken
        this.isSunk = false; // Flag indicating if the ship is sunk
        this.isVertical = false; // Flag indicating if the ship is placed vertically on the board
    }
}
class Player {
    constructor(name, shipBoard, isAI = false) {
        this.name = name; // Player's name
        this.shipsSunk = 0; // Number of ships sunk by the player
        this.isAI = isAI; // Flag indicating if the player is controlled by the AI
        this.ships = [ // Array containing the player's ships
            new Ship('Carrier', 3, 'A'),
            new Ship('Battleship', 4, 'B'),
            new Ship('Cruiser', 3, 'C'),
            new Ship('Submarine', 3, 'D'),
            new Ship('Destroyer', 2, 'E')
        ];
        this.shipBoard = shipBoard; // 2D array representing the player's ship placement on the board
        this.firingBoard = createEmptyBoard("*"); // 2D array representing the player's firing history on the opponent's board
    }
}
const humanPlayerShipBoard = [  
    ['*', '*', '*', 'A', 'A', 'A', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*', 'B', 'B', 'B', 'B', '*'],
    ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*', 'C', '*', '*', '*', '*'],
    ['D', 'D', 'D', '*', '*', 'C', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*', 'C', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*', '*', '*', '*', '*', 'E'],
    ['*', '*', '*', '*', '*', '*', '*', '*', '*', 'E'],
    ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*']
];
const boardSize = 10;
const aiPlayerShipBoard = createEmptyBoard("*");
const firingBoardContainer = document.getElementById('firing-board-container');
const shipBoardContainer = document.getElementById('ship-board-container');
const messagesDiv = document.getElementById('messages');


// const playerName = prompt("Enter Player 1's name:");
const playerName = "Isabella";  //for testing change later
//give ai board here? placeAIShips();
const player1 = new Player("Isabella", humanPlayerShipBoard);
const computerPlayer = new Player('Computer', aiPlayerShipBoard, true);
const players =  [player1,computerPlayer];
let currentPlayer = 0;
computerPlayer.shipBoard = placeAIShips();
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
// Function to render the game board on the UI
function renderBoard(container, board, isFiringBoard) {
    container.innerHTML = ''; // Clear previous content
// Iterate through the board and create HTML elements for each cell
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
// Function to handle ship placement by the player
function placeShips(row,col){
    messagesDiv.innerHTML = 'Click on the ship board to place your ships.<br>';

    // Add a click event listener to each cell on the ship board
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
//if there have been num Ships valid clicks, then end place Ships

            
        }
    }
}
// Function to handle firing on opponent's board by the player
function handleCellClick(row, col) {
     messagesDiv.innerHTML='';  
       // Check if the cell contains a ship
        if (players[1].shipBoard[row][col] !== "*") {
            messagesDiv.innerHTML+=`Hit at (${row}, ${col}) on ${players[1].name}'s ship board<br>`;
            // write checkWhichShipHit();
            UpdateFiringBoard(row,col,"Hit"); 
            // this.style.color = 'red';
            HitShip(row,col,computerPlayer);
        } else {
            UpdateFiringBoard(row,col,"Miss");
            // this.style.backgroundColor = 'blue';
            messagesDiv.innerHTML=`Player Guess (${row},${col}) was a miss<br>`;
        }
        if (hasPlayerWon(players[currentPlayer])) {
            messagesDiv.innerHTML=`${players[0].name} has won!<br>`;  
            messagesDiv.innerHTML += `<button onclick="playAgain()">Play Again</button>`;//added
            // Perform any actions or display messages for winning
        } else {
            AITurn();
        }
        
}
function playAgain() {
    location.reload(); // Reload the page
}
// Function to update the firing board with hit or miss information
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
        messagesDiv.innerHTML+=`Hit on ${player.name}'s ${matchingShip.name}!<br>`;

        if (matchingShip.numHits === matchingShip.length) {
            matchingShip.isSunk = true;
            messagesDiv.innerHTML+=`${matchingShip.name} is sunk!<br>`;
            player.shipsSunk++;
        }
    } else {
        messagesDiv.innerHTML+=`No matching ship found for character ${shipChar}<br>`;
    }
}


function AITurn() { //add last guess handling 
    messagesDiv.innerHTML+="AI is taking a turn<br>";
    let { row, col } = generateRandomCoord(boardSize);
    while (player1.shipBoard[row][col] == "Hit" || player1.shipBoard[row][col] == "Miss") {
        ({ row, col } = generateRandomCoord(boardSize));
    }
    checkAIGuess(row,col,players[0]);
    switchPlayer();  
}
function checkAIGuess(row, col,player1){
    if (player1.shipBoard[row][col] !== "*"){
        HitShip(row, col, player1);
        updateShipsBoard(row,col,"Hit"); 
        messagesDiv.innerHTML+=`AI's guess ${row+1}, ${col+1} Location was a Hit<br>`;
        
    } else {
        updateShipsBoard(row,col,"Miss");
        messagesDiv.innerHTML+=`AI's guess (${row+1}, ${col+1}) Location was a miss<br>`;
    }
    if (hasPlayerWon(players[1])) {  
        messagesDiv.innerHTML+=`${players[1].name} has won!!<br>`;
        messagesDiv.innerHTML += `<button onclick="playAgain()">Play Again</button>`;//added

        // Perform any actions or display messages for winning
    } else {
        switchPlayer();
    }
}
function generateRandomCoord(boardSize) {
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


function handleShipPlacement(row, col) {}
// Initial render


//Game Control Functions 

function placeAIShips() {
    const board = createEmptyBoard("*");

    computerPlayer.ships.forEach(ship => {
        ship.isVertical = Math.random() < 0.5;
        let { row, col } = generateRandomCoord(boardSize - ship.length);
        while (!isValidChord(row, col, ship, board)) {
            ({ row, col } = generateRandomCoord(boardSize - ship.length));
        }

        for (let i = 0; i < ship.length; i++) {
            if (ship.isVertical) {
                board[row + i][col] = ship.displayChar;
            } else {
                board[row][col + i] = ship.displayChar;
            }
        }
    });

    return board;
}
//checks that AI chord is valid
function isValidChord(row, col, ship, board) {
    for (let i = 0; i < ship.length; i++) {
        if (ship.isVertical) {
            if (board[row + i][col] !== "*") {
                return false;
            }
        } else {
            if (board[row][col + i] !== "*") {
                return false;
            }
        }
    }
    return true;
}
// function AIHunt(){}
// Destroy Mode
// In Destroy mode, the AI will shoot at all locations around the oldest location hit. The AI will fire at the surrounding locations in this order: left, up, right, then down. If any hits are scored they are added to the list of locations to fire at. You return to Hunt mode once all of these locations have been fired at. 

renderBoard(firingBoardContainer, player1.firingBoard, true);
renderBoard(shipBoardContainer, player1.shipBoard, false);

console.log("Ship Placement:Computer board", computerPlayer.shipBoard);
