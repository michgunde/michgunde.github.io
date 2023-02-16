let h2 = document.querySelector('h2');

var go = 'X';
h2.textContent = `It is ${go}'s turn!`;

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

const squares = document.querySelectorAll('.row>div');

function playRound() {
    for (let square of squares) {
        square.addEventListener('click', function(e) {
            if (!square.textContent) {
                square.textContent = go; 
                if (checkWinner(go)) {
                    alert(`${go} wins!`)
                    return true;
                } else {
                    go == 'X' ? go = 'O' : go = 'X';
                    h2.textContent = `It is ${go}'s turn!`;
                }
            }
        })
    }
}

playRound();

function checkWinner(x) {
    for (let i = 0; i < squares.length-1; i++) {
                    if (squares[win[i][0]].textContent == x &&
                        squares[win[i][1]].textContent == x &&
                        squares[win[i][2]].textContent == x) {
                            squares[win[i][j]].style.backgroundColor = 'green';
                            squares[win[i][k]].style.backgroundColor = 'green';
                            squares[win[i][l]].style.backgroundColor = 'green';
                        return true
                        }
    } 
    return false
}
