let cards = document.querySelectorAll('.card');
let nCards = cards.length;
cards.forEach(card => card.addEventListener('click', flipCard));

if(!localStorage.getItem('highscore')) localStorage.setItem('highscore', Infinity);
//put highscore in the html
document.getElementById('highscore').innerHTML = localStorage.getItem('highscore');

(function reorderCards(){
    cards.forEach(card => {
        card.style.order = Math.floor((nCards - 1)*Math.random());
    });
})();

let [flipped, lockBoard, first, second, currentScore, found] = [false, false, undefined, undefined, 0, 0];

function flipCard(){
    if(lockBoard) return "locked the board";
    if(this === first) return "can't match first card with its self";

    this.classList.toggle('flipped');

    if(!flipped){//first flip
        flipped = true;
        first = this;
    }
    else {//second flip
        flipped = false;
        second = this;
        lockBoard = true;
        if(first.dataset.val === second.dataset.val){
            setTimeout(() => {
                first.removeEventListener('click', flipCard);
                second.removeEventListener('click', flipCard);
                lockBoard = false;

                [first, second] = [undefined, undefined];
            }, 1000);
            found += 2;
        }
        else {
            setTimeout(() => {
                first.classList.remove('flipped');
                second.classList.remove('flipped');
                lockBoard = false;
            
                [first, second] = [undefined, undefined];
            }, 1000); 
        }
    }
    updateCurrentScore();
    //check if game ends, if so: add return button to bottom of screen & update highscore if need be
    endGame();
}

function updateCurrentScore(){
    currentScore ++;
    document.getElementById('currentscore').innerHTML = currentScore;
}

function endGame(){
    if(found === nCards){
        appendReturnButton();
        //check if currentscore < highscore
        if(currentScore < +localStorage.getItem('highscore')){
            localStorage.setItem('highscore', currentScore);
        }
    }
}

function appendReturnButton(){
    let a = document.createElement("a");
    a.href = "land.html";
    let button = document.createElement("button");
    button.innerText = "RETURN!";
    a.appendChild(button);
    document.getElementsByClassName('returnbutton-container')[0].appendChild(a);
}




