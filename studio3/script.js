(function() {
    "use strict";
    console.log("reading js");
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
        this.shipsPlaced = 0; 
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
const boardSize = 10;
const humanPlayerShipBoard = createEmptyBoard('*');

const aiPlayerShipBoard = createEmptyBoard("*");
const firingBoardContainer = document.getElementById('firing-board-container');
const shipBoardContainer = document.getElementById('ship-board-container');
const messagesDiv = document.getElementById('messages');
let donePlaceingShips = false;

 const playerName = prompt("Enter Player 1's name:");
// const playerName = "Isabella";  //for testing change later!!!!
const player1 = new Player("Isabella", humanPlayerShipBoard);
const computerPlayer = new Player('Computer', aiPlayerShipBoard, true);
const players =  [player1,computerPlayer];
let currentPlayer = 0;
computerPlayer.shipBoard = placeAIShips();
// let gameBoard = createEmptyBoard();
const GameWon = new Audio('sounds/GameWon.m4a');
const hitSound = new Audio('sounds/hitSound.m4a');
const missSound = new Audio('sounds/missSound.m4a');

// Function to play hit sound
function playHitSound() {
    hitSound.play();
}

// Function to play miss sound
function playMissSound() {
    missSound.play();
}
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
                if(!donePlaceingShips){
                cell.addEventListener('click', function() {
                    placeShips(i, j);
                });
                }
            }

            cell.textContent = board[i][j];
            container.appendChild(cell);
        }
    }
}
// Function to handle ship placement by the player
document.addEventListener('keydown', function(event) {
    const key = event.key.toLowerCase(); // Convert the key to lowercase

    // Check if the user pressed 'v' or 'h' and update the orientation of the current ship accordingly
    if (key === 'v' || key === 'h') {
        // Get the current ship to be placed
        const currentShip = player1.ships[player1.shipsPlaced];

        // Check if the current ship exists and is not already sunk
        if (currentShip && !currentShip.isSunk) {
            // Assign true to current ship's isVertical property if 'v' is pressed, otherwise assign false
            currentShip.isVertical = key === 'v';
            
            // Display a message indicating the new orientation
            messagesDiv.innerHTML += `${currentShip.name} orientation changed to ${currentShip.isVertical ? 'vertical' : 'horizontal'}<br>`;
            
            // Render the updated ship board
            renderBoard(shipBoardContainer, player1.shipBoard, false);
        }
    }
});
function placeShips(row, col) {
    // Get the current ship to be placed
    const currentShip = player1.ships[player1.shipsPlaced];

    // Check if the current ship can be placed at the clicked position
    if (isValidPlacement(row, col, currentShip, player1.shipBoard)) {
        // Place the ship on the board
        if (currentShip.isVertical) {
            for (let i = 0; i < currentShip.length; i++) {
                player1.shipBoard[row + i][col] = currentShip.displayChar;
            }
        } else {
            for (let i = 0; i < currentShip.length; i++) {
                player1.shipBoard[row][col + i] = currentShip.displayChar;
            }
        }
        
        // Render the updated ship board
        renderBoard(shipBoardContainer, player1.shipBoard, false);
        
        // Update the text box to indicate the ship being placed
        messagesDiv.innerHTML += `${currentShip.name} placed`;
        if(currentShip.isVertical){
            messagesDiv.innerHTML += ` vertical<br>`;
        }
        else{
            messagesDiv.innerHTML += ` Horizontal<br>`;
        }
        
        // Check if all ships have been placed
        if (player1.shipsPlaced === player1.ships.length - 1) {
            donePlaceingShips = true; // Set the flag to indicate all ships have been placed

            messagesDiv.innerHTML = `<strong>All ships have been placed!</strong><br> Begin making Guesses on the blue board to find your opponent's ships!<br>`;
        } else {
            // Move to the next ship
            player1.shipsPlaced++;
        }
    } else {
        messagesDiv.innerHTML += `Invalid placement for ${currentShip.name}<br>`;
    }
}


function isValidPlacement(row, col, ship, board) {
    // Check if the ship fits within the bounds of the board
    if (ship.isVertical) {
        if (row + ship.length > boardSize) {
            return false;
        }
    } else {
        if (col + ship.length > boardSize) {
            return false;
        }
    }
    
    // Check if the cells are empty for ship placement
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
// Function to handle firing on opponent's board by the player
function handleCellClick(row, col) {
     messagesDiv.innerHTML='';  
       // Check if the cell contains a ship
        if (players[1].shipBoard[row][col] !== "*") {
            messagesDiv.innerHTML+=`Hit at (${row}, ${col}) on ${players[1].name}'s ship board<br>`;
            playHitSound();
            // write checkWhichShipHit();
            UpdateFiringBoard(row,col,"Hit"); 
            // this.style.color = 'red';
            HitShip(row,col,computerPlayer);
        } else {
            UpdateFiringBoard(row,col,"Miss");
            // this.style.backgroundColor = 'blue';
            messagesDiv.innerHTML=`Player Guess (${row},${col}) was a miss<br>`;
            playMissSound();
        }
        if (hasPlayerWon(players[currentPlayer])) {
            messagesDiv.innerHTML=`${player1.name} has won!<br>`; 
            GameWon.play(); 
        } else {
            AITurn();
        }
        
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
        playHitSound();
        
    } else {
        updateShipsBoard(row,col,"Miss");
        messagesDiv.innerHTML+=`AI's guess (${row+1}, ${col+1}) Location was a miss<br>`;
        playMissSound();
    }
    if (hasPlayerWon(players[1])) {  
        messagesDiv.innerHTML+=`${players[1].name} has won!!<br>`;

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
// Get the toggle-orientation button element

renderBoard(firingBoardContainer, player1.firingBoard, true);
renderBoard(shipBoardContainer, player1.shipBoard, false);

console.log("Ship Placement:Computer board", computerPlayer.shipBoard);
})();