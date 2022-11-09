const cellElements=document.querySelectorAll('[cell]')
const body=document.getElementById('body')
const back=document.querySelector('[background]')
const text=document.querySelector('[text]')
const button=document.querySelector('[btn]')
const COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    [1,4,7]
]
let xTurn
x_class='x'
circle_class='circle'

startGame()

button.addEventListener('click',startGame)
function startGame(){
    cellElements.forEach(cell=>{
        cell.classList.remove(x_class)
        cell.classList.remove(circle_class)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, {once:true})
        
    })

    back.classList.add('none')

}

function handleClick(e){
    const cell=e.target
    const currentClass= xTurn ? x_class:circle_class
    placeMark(cell,currentClass)
    
    if(winGame(currentClass)){
        endgame(false)
    }else if(isDraw()){
        endgame(true)
    }else{
        swapImage()

    }

}

function endgame(draw){
    if(draw){
        text.innerText='Draw!'
    }else{
        text.innerText=`${xTurn?'X':'O'} Wins!`
    }
    back.classList.remove('none')
}


function isDraw(){
   
    return [...cellElements].every(cell=>{
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
       
    })
}

function placeMark(cell,currentClass) {
        cell.classList.add(currentClass)

        

}

function swapImage(){
   xTurn=!xTurn
}

function winGame(currentClass){
    return COMBINATIONS.some(combination=>{
        return combination.every(index=>{
            
            return cellElements[index].classList.contains(currentClass)
           
        })
    })
}