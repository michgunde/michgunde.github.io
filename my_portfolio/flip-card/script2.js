let h2 = document.querySelector('h2');
h2.textContent = 'Good luck!';

let input = document.querySelector('input');

let cont = document.querySelector('#container');
let joker = Math.floor(Math.random() * input.value);
console.log(joker);
for (let i = 0; i < input.value; i++) {
    let div = document.createElement('div');
    div.classList.add('card');
    if (i == joker) {
        div.textContent = 'O';
    } else {
        div.textContent = 'X';
    }
    cont.appendChild(div);
    div.addEventListener('click', handleClick);
}

let btn = document.querySelector('button');
btn.addEventListener('click', dealCards);

let counter = 0;

function dealCards() {
    h2.textContent = `Good luck!`
    counter = 0;
    let cont = document.querySelector('#container');
    while (cont.hasChildNodes()) {
        cont.removeChild(cont.firstChild);
    }
    let joker = Math.floor(Math.random() * input.value);
    console.log(joker);
    for (let i = 0; i < input.value; i++) {
        let div = document.createElement('div');
        div.classList.add('card');
        if (i == joker) {
            div.textContent = 'O';
        } else {
            div.textContent = 'X';
        }
        cont.appendChild(div);
        div.addEventListener('click', handleClick);
    }
};

function handleClick(e) {
    if (e.target.style.backgroundColor == 'red') {
        return;
    }
    e.target.style.backgroundColor = 'red';
    counter++;
    h2.textContent = `You've used ${counter} tries!`;
    if (e.target.textContent == 'O') {
        h2.textContent = `You won in ${counter} tries!`;
        let cont = document.querySelector('#container');
        let newCont = cont.cloneNode(true);
        cont.remove();
        document.body.appendChild(newCont);
    }
}