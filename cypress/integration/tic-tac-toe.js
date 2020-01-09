const URL = '127.0.0.1:8080';

context ('Tic Tac Toe', () => {

    before(() => {
        cy.visit(URL);
    });


    function startGame() { it('starts the game', ()=>{
        cy.get('#new-game').click()
    }); }


    function checkCells(message, cells) {
        it(`tests ${message}`, ()=>{
            playerOnePlay(cells);
            cy.wait(1000);
        });
    }


    describe('sets up the game', ()=>{

        it('check if there is a table with 9 cells', ()=>{
            cy.get('.square').should('have.length', 9)
        });
    
        it('fills input of player 1 name', ()=>{
            cy.get('#name1').type('Player "X"')
        });
    
        it('selects player 1 token', ()=>{
            cy.get('.input-radio').check('X')
        });
    
        it('fills input of player 2 name', ()=>{
            cy.get('#name2').type('Player "O"')
        });

    });


    describe('test the game', ()=>{

        startGame();
        checkCells('first row', [0, 1, 2]);

        
        startGame();
        checkCells('second row', [3, 4, 5]);
    

        startGame();
        checkCells('third row', [6, 7, 8]);


        startGame();
        checkCells('first column', [0, 3, 6]);


        startGame();
        checkCells('second column', [1, 4, 7]);


        startGame();
        checkCells('third column', [2, 5, 8]);
    

        startGame();
        checkCells('left-right diagonal', [0, 4, 8]);
  

        startGame();
        checkCells('right-left diagonal', [2, 4, 6]);
    });    
})



function playerOnePlay(choices) {
    const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    let playerTwoMoves = cells.filter(elem => choices.indexOf(elem) === -1); //playerTwoMoves is an array without the element of the array choices
    let playSequence = []; //sequence to be played at the end

    //[0,1,2] + [3,4,5] => [0, 3, 1, 4, 2, 5]
    choices.map(elem=>{
        playSequence.push(elem);
        playSequence.push(playerTwoMoves[choices.indexOf(elem)]);
    })

    for (let i = 0; i < playSequence.length; i++) {
        cy.get(`#sq${playSequence[i]}`).click();  
    }
}
