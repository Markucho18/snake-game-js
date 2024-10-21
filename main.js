let app = document.getElementById("app")

gameStatus = "notPlaying"
updateSpeed = 150

let snakeMovement = "up"

let cells = []
let snakeBody = [120]

for(let i = 0; i < 256; i++){
  cells.push(0)
}
cells[120] = 1 

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
  document.getElementById("120").classList.add("snake")
}

score = document.createElement("p")
score.textContent = `Score: ${snakeBody.length}`
score.id = "score"
app.appendChild(score)

let controlActions = {
  "left": (cellIndex) => cellIndex - 1, 
  "right": (cellIndex) => cellIndex + 1,
  "up": (cellIndex) => cellIndex - 16,
  "down": (cellIndex) => cellIndex + 16 
}

function generateApple(){
  let randomNum = Math.trunc(Math.random() * cells.length)
  document.getElementById(randomNum + 1).classList.add("apple")
}

function growSnake(){
  currentCell = snakeBody[0]
  if(snakeMovement == "up") snakeBody.push(controlActions["down"](currentCell))
  else if(snakeMovement == "down") snakeBody.push(controlActions["up"](currentCell))
  else if(snakeMovement == "right") snakeBody.push(controlActions["left"](currentCell))
  else if(snakeMovement == "left") snakeBody.push(controlActions["right"](currentCell))
}

function eatApple(){
  document.querySelector(".apple").classList.remove("apple")
  generateApple()
  growSnake()
  score.textContent = `Score: ${snakeBody.length}`
  console.log(snakeBody.length)
}

//Actualizar si es el primero
//Remplazar el indice de los demas con el del siguiente
function moveSnake(){
  snakeBody.forEach((cell, i) => {
    if(i == 0){
      cells[cell] = 0
      cell = controlActions[snakeMovement](cell)
      console.log("Cell[0] en moveSnake(): ", cell)
      cells[cell] = 1
    }
    else{
      cells[cell] = 0
      cell = cell[i - 1]
      cells[cell] = 1
    }
  })
}

function updateBoard(){
  //Check apple
  if(snakeBody[0] + 1 == document.querySelector(".apple").id){
    eatApple()
  }
  moveSnake()
  //Color the cells
  cells.forEach((cell, i) => {
    if(cell === 1){
      document.getElementById(i + 1).classList.add("snake")
    }  
    else if(cell === 0){
      document.getElementById(i + 1).classList.remove("snake")
    }  
  });
  console.log(`SnakeBody: ${snakeBody}`)
  console.log("actualizando tablero")
}

function startPlaying(){
  gameStatus = "playing"
  movementInterval = setInterval(() => {
    updateBoard()
  }, updateSpeed)
}

function changeDirection (e){
  let controls = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]
  if(controls.includes(e.key)){
    if(gameStatus != "playing"){
      startPlaying()
    }
    snakeMovement = (e.key.slice(5)).toLowerCase()
  }
}

document.addEventListener("keydown", (e) => changeDirection(e))

createBoard()
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