let app = document.getElementById("app")

gameStatus = "notPlaying"

let cells = []

for(let i = 0; i < 256; i++){
  cells.push(0)
}

console.log(cells)

function createBoard(){
  let table = document.createElement("table")
  table.classList.add("board")
  let tableBody = document.createElement("tbody")
  let totalCells = 0
  for(let i = 0; i < 16; i++){
    let row = document.createElement("tr")
    row.classList.add("row")
    for(let j = 0; j < 16; j++){
      totalCells++
      let cell = document.createElement("td")
      cell.classList.add("cell")
      cell.id = totalCells
      row.appendChild(cell)
    }
    tableBody.appendChild(row)
  }
  table.appendChild(tableBody)
  app.appendChild(table)
  //document.getElementById("120").style.backgroundColor = "white"
}


function generateApple(){
  let randomNum = Math.trunc(Math.random() * cells.length)
  document.getElementById(randomNum).classList.add("apple")
}
  
let snakeMovement = "up"
let currentCell = 120
snakeWidth = 1

let controlActions = {
  "left": () => currentCell = currentCell - 1, 
  "right": () => currentCell = currentCell + 1,
  "up": () => currentCell = currentCell - 16,
  "down": () => currentCell = currentCell + 16 
}

function startPlaying(){
  gameStatus = "playing"
  movementInterval = setInterval(() => {
    document.getElementById(currentCell).classList.remove("snake")
    controlActions[snakeMovement]()
    document.getElementById(currentCell).classList.add("snake")
  }, 200)
}

function changeDirection (e){
  let controls = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]
  if(controls.includes(e.key)){
    if(gameStatus != "playing"){
      startPlaying()
    }
    snakeMovement = (e.key.slice(5)).toLowerCase()
    console.log(snakeMovement)
  }
}

document.addEventListener("keydown", (e) => changeDirection(e))

createBoard()
document.getElementById(120).classList.add("snake")

generateApple()

/*
FUNCIONES:
- Controlar estado del juego
- CambiarDireccion()
- ReiniciarJuego()
- ComerManzana()
- GenerarManzana()
- MoverSerpiente()
- CrearTablero()
- ChequearColisiones()
*/