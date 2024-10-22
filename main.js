let app = document.getElementById("app")

let gameStatus = "notPlaying"
let updateSpeed = 150
let snakeMovement = "up"
let record = 1

let cells = []
let snakeBody = [120]

for(let i = 0; i < 256; i++){
  cells.push(0)
}

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
  document.getElementById("120").classList.add("snake1")
}

score = document.getElementById("score")
score.textContent = snakeBody.length
recordContainer = document.getElementById("record")
recordContainer.textContent = record

let controlActions = {
  "left": (cell) => cell - 1, 
  "right": (cell) => cell + 1,
  "up": (cell) => cell - 16,
  "down": (cell) => cell + 16 
}

function generateApple(){
  let randomNum
  do{ //El do se ejecuta almenos una vez antes de verificar la condicion
    randomNum = Math.trunc(Math.random() * cells.length) //0 - 255
  } while(snakeBody.includes(randomNum))
  document.getElementById(randomNum + 1).classList.add("apple")
}

function growSnake(){
  currentCell = snakeBody[0]
  if(snakeMovement == "up") snakeBody.push(controlActions["down"](currentCell))
  else if(snakeMovement == "down") snakeBody.push(controlActions["up"](currentCell))
  else if(snakeMovement == "right") snakeBody.push(controlActions["left"](currentCell))
  else if(snakeMovement == "left") snakeBody.push(controlActions["right"](currentCell))
  console.log("Serpiente creciendo ")
}

function eatApple(){
  document.querySelector(".apple").classList.remove("apple")
  generateApple()
  growSnake()
  score.textContent = snakeBody.length
}

function checkBorderCollision() {
  let head = snakeBody[0]; 
  if (
    (snakeMovement === "up" && head <= 15) ||
    (snakeMovement === "down" && head >= 240) ||
    (snakeMovement === "left" && head % 16 === 0) ||
    (snakeMovement === "right" && (head + 1) % 16 === 0)
  ) {
    gameStatus = "lost";
    console.log("COLISION CON BORDES");
  }
}

function checkBodyCollisions(){
  otherSnakeCells = snakeBody.slice(1)
  if(otherSnakeCells.includes(snakeBody[0])){
    gameStatus = "lost"
    console.log("COLISION CON CUERPO")
  }
}

function moveSnake(){
  let lastPositions = []
  let newSnakeBody = snakeBody.map((cell, i) => {
    lastPositions.push(cell)
    if(i == 0){
      checkBorderCollision()
      newCell = controlActions[snakeMovement](cell) //El valor de cell
      checkBodyCollisions()
      return newCell
    }
    else{
      return lastPositions[i - 1]
    }
  })
  return newSnakeBody
}

let movementInterval

function checkGameStatus(){
  if(gameStatus == "lost"){
    clearInterval(movementInterval)
    if(snakeBody.length > record){
      record = snakeBody.length
      document.querySelector(".lostModalRecordMessage").textContent = `You've achieved a new record! ${record}`
      recordContainer.textContent = record
    }
    document.querySelector(".lostModalBackground").style.display = "flex"
    console.log("Perdiste el juego xd")
  }
}

function colorCells(){
  let colors = ['snake1', 'snake2', 'snake3'];
  let newCells = cells.map((_, i)=>{
    if(snakeBody.includes(i)){
      let colorClass = colors[i % colors.length]
      document.getElementById(i + 1).classList.add(colorClass)
      return 1
    }
    else{
      document.getElementById(i + 1).classList.remove(...colors)
      return 0
    }
  })
  cells = newCells
}

function updateBoard(){
  if(snakeBody[0] + 1 == document.querySelector(".apple").id){
    eatApple()
  }
  snakeBody = moveSnake()
  colorCells()  
  checkGameStatus()
}

function restartGame(){
  document.querySelector(".lostModalBackground").style.display = "none"
  gameStatus = "notPlaying"
  snakeBody = [120]
  score.textContent = snakeBody.length
  colorCells()
}

function startPlaying(){
  gameStatus = "playing"
  movementInterval = setInterval(() => {
    updateBoard()
  }, updateSpeed)
}

function changeDirection (e){
  let controls = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]
  let newMovement = (e.key.slice(5)).toLowerCase()
  // CHEQUEAR QUE NO PUEDA DIRIGIRSE AL OPUESTO
  if(controls.includes(e.key)){
    if(gameStatus == "notPlaying"){
      startPlaying()
    }
    if(
        (snakeMovement == "up" && e.key !== "ArrowDown") ||
        (snakeMovement == "down" && e.key !== "ArrowUp") ||
        (snakeMovement == "left" && e.key !== "ArrowRight") ||
        (snakeMovement == "right" && e.key !== "ArrowLeft")
      ){
      snakeMovement = newMovement
    }
  }
}

document.addEventListener("keydown", (e) => changeDirection(e))

createBoard()
generateApple()