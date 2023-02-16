let h2 = document.querySelector('h2');

var go = 'X';

const win = [
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [6,4,2],
]

h2.textContent = `It is ${go}'s turn!`;
const squares = document.querySelectorAll('.row>div');

function playRound() {
    for (let square of squares) {
        square.onclick = function(e) {
            if (!square.textContent) {
                square.textContent = go; 
                if (checkWinner(go)) {
                    alert(`${go} wins!`)
                        for (let square of squares) {
                            square.onclick = null;
                        }
                    } return
                } else {
                    go == 'X' ? go = 'O' : go = 'X';
                    h2.textContent = `It is ${go}'s turn!`;
                }
            }
        }
}

playRound();

function checkWinner(x) {
    for (let i = 0; i < squares.length-1; i++) {
        for (let j = 0; j < 1; j++) {
            for (let k = 1; k < 2; k++) {
                for (let l = 2; l < 3; l++) {
                    if (squares[win[i][j]].textContent == x &&
                        squares[win[i][k]].textContent == x &&
                        squares[win[i][l]].textContent == x) {
                            squares[win[i][j]].style.backgroundColor = 'green';
                            squares[win[i][k]].style.backgroundColor = 'green';
                            squares[win[i][l]].style.backgroundColor = 'green';
                        return true
                        }
                    } 
                }
            } 
        }
    return false
}