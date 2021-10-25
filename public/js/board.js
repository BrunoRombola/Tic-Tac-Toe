var board = document.getElementsByName('gameCell');
var actualPlayer = document.getElementsByClassName('actualPlayer')
var turn = 0;
var state='Continue';



/*AI elements
*/
function AI (level){
    function randomMovement (actualBoard){
        const indexes = findEmptyCells(actualBoard);
        const index = indexes[Math.trunc(Math.random()*indexes.length)];
        console.log(index)
        actualBoard[index].click()
    }
    this.move = function (){
        switch (level) {
            case 'blind':
                randomMovement(board);
                break;
            case 'normal':
                normalMovement(board);
                break;
            case 'master':
                masterMovement(board);
                break;
        }
    }
}

const IA = new AI('blind')
const findEmptyCells = function (actualBoard) {
    let emptyCells =[];
    for(let i = 0 ; i < board.length; i++){
        if(actualBoard[i].textContent === '' ){
            emptyCells.push(i);
        }
    }
    return emptyCells;
}
const gameStatus = function(actualBoard){
    if(findEmptyCells(actualBoard).length > 0){
        if(state === 'Continue'){
            for (let i = 0; i < 6; i = i+3) {
                if(actualBoard[i].textContent !== '' && actualBoard[i].textContent === board[i+1].textContent && actualBoard[i].textContent === board[i+2].textContent){
                    return 'End';
                }        
            }
            for (let i = 0; i < 3; i++) {
                if(actualBoard[i].textContent !== '' && actualBoard[i].textContent === actualBoard[i+3].textContent && actualBoard[i].textContent === actualBoard[i+6].textContent){
                    return 'End';
                }        
            }
            for (let i = 0, j = 4; i < 6; i = i+2, j = j-2) {
                if(actualBoard[i].textContent !== '' && actualBoard[i].textContent === actualBoard[i+j].textContent && actualBoard[i].textContent === actualBoard[i+2*j].textContent){
                    return 'End';
                }        
            }
            return 'Continue';
        }
    }
    else{
        return 'draw'
    }
}
board.forEach((cell)=>{
    cell.addEventListener('click',()=>{
        cell.textContent = turn%2 ? 'O' : 'X';
        cell.className = turn%2 ? 'O' : 'X';
        actualPlayer.textContent = turn%2 ? 'PC': 'Player'
        console.log(findEmptyCells(board))
        state = gameStatus(board)
        cell.disabled = true;
        if(state !== 'Continue'){
            console.log(gameStatus(board))
        }
        turn++;
        if(turn%2){IA.move()}
    });
});




