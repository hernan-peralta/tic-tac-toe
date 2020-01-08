const $container = document.querySelector('.container');
const $name1 = document.querySelector('#name1');
const $name2 = document.querySelector('#name2');
const $inputRadio = document.querySelectorAll('.input-radio');
let $token1;
let $token2;
const $newGame = document.querySelector('#new-game');


const Gameboard = (()=>{
    let gameboard = ['', '', '', '', '', '', '', '', ''];

    const assign = (index, token) =>{
        gameboard[index] = token;
    };

    const reset = () => {
        //https://stackoverflow.com/questions/12482961/is-it-possible-to-change-values-of-the-array-when-doing-foreach-in-javascript/12482991
        gameboard.forEach(function (part, index) {
            gameboard[index] = '';
        }, gameboard);
        render();
        Game.lastTurn = 0;
    };


    const isThereAWinner = () => {
        if (gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2] && gameboard[0] != '') {
            return true;
        }
        else if (gameboard[3] === gameboard[4] && gameboard[4] === gameboard[5] && gameboard[3] != '') {
            return true;
        }
        else if (gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8] && gameboard[6] != '') {
            return true;
        }
        else if (gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6] && gameboard[0] != '') {
            return true;
        }
        else if (gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7] && gameboard[1] != '') {
            return true;
        }
        else if (gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8] && gameboard[2] != '') {
            return true;
        }
        else if (gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8] && gameboard[0] != '') {
            return true;
        }
        else if (gameboard[2] === gameboard[4] && gameboard[4] === gameboard[6] && gameboard[2] != '') {
            return true;
        }
        else if (gameboard.indexOf('') === -1){
            document.querySelector('#result').innerHTML = 'Draw!';
        }
        else{
            return false;
        }
    }

    return {assign, gameboard, reset, isThereAWinner};
})();


const Player = (name, token) => {
    return {name, token}
};


const Game = (() => {
    let lastTurn = 0;
    
    const createPlayers = () => {
        const player1 = Player($name1.value, $token1);
        const player2 = Player($name2.value, $token2);       
        Game.players = [player1, player2];        
    }

    const nextTurn = () => {
        if (Game.lastTurn === 1){
            Game.lastTurn = 0;
        }
        else{
            Game.lastTurn = 1;
        }
    };

    const isValid = (squareID) => {
        if (Gameboard.gameboard[squareID] === ''){
            return true;
        }
    };

    const play = (squareID) => {
        if (!Gameboard.isThereAWinner() && isValid(squareID)){
            Gameboard.assign(squareID, Game.players[Game.lastTurn].token);
            render();
            nextTurn();
        }
        if (Gameboard.isThereAWinner()){
            nextTurn();//this is needed to get the correct turn, otherwise the player 2 win is not recognized
            document.querySelector('#result').innerHTML = `The winner is ${Game.players[Game.lastTurn].name}!`;
        }
    };

    return {createPlayers, play, lastTurn}
})();


//quiza deberia ir dentro de Gameboard y usarlo como Gameboard.render
function render() {
    for (let i = 0; i < Gameboard.gameboard.length; i++) {
        document.querySelector(`#sq${[i]}`).innerHTML = Gameboard.gameboard[i];        
    }
}


$container.onclick = function(event){
    const $element = event.target;

    if ($element.classList.contains('square')){
        let squareID = ($element.id[2]);
        Game.play(squareID);
    }
}


$newGame.onclick = function () {
    if ($inputRadio[0].checked){
        $token1 = 'X';
        $token2 = 'O';
    }
    else{
        $token1 = 'O';
        $token2 = 'X';
    }
    Gameboard.reset();
    document.querySelector('#result').innerHTML = '';
    Game.createPlayers();
}
