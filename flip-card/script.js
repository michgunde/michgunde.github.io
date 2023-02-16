let h2 = document.querySelector('h2');
h2.textContent = 'Good luck!';

let input = document.querySelector('input');

let cont = document.querySelector('#container');

let btn = document.querySelector('button');
btn.addEventListener('click', dealCards);

function dealCards() {
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
    let newBtn = btn.cloneNode(true);
    btn.remove();
    let intro = document.querySelector('#intro');
    intro.appendChild(newBtn);
};

let counter = 0;

function handleClick(e) {
    e.target.style.backgroundColor = 'red';
    counter++;
    h2.textContent = `You've used ${counter} tries!`
    if (e.target.textContent == 'O') {
        h2.textContent = `You won in ${counter} tries!`
        let newCont = cont.cloneNode(true);
        cont.remove();
        document.body.appendChild(newCont);
    }
}