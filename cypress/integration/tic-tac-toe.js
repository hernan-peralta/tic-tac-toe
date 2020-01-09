const URL = '127.0.0.1:8080';

context ('Tic Tac Toe', () => {

    before(() => {
        cy.visit(URL);
    });


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

        it('starts the game', ()=>{
            cy.get('#new-game').click()
        });
    
        it('tests first row', ( )=>{
            playerOnePlay([0, 1, 2]);
            cy.wait(1000);
        });
   


        it('starts the game', ()=>{
            cy.get('#new-game').click()
        });

        it('tests second row', ( )=>{
            playerOnePlay([3, 4, 5]);
            cy.wait(1000);
        });

    

        it('starts the game', ()=>{
            cy.get('#new-game').click()
        });

        it('tests third row', ( )=>{
            playerOnePlay([6, 7, 8]);
            cy.wait(1000);
        });



        it('starts the game', ()=>{
            cy.get('#new-game').click()
        });

        it('tests first column', ( )=>{
            playerOnePlay([0, 3, 6]);
            cy.wait(1000);
        });




        it('starts the game', ()=>{
            cy.get('#new-game').click()
        });

        it('tests second column', ( )=>{
            playerOnePlay([1, 4, 7]);
            cy.wait(1000);
        });
    



        it('starts the game', ()=>{
            cy.get('#new-game').click()
        });

        it('tests third column', ( )=>{
            playerOnePlay([2, 5, 8]);
            cy.wait(1000);
        });
    


        it('starts the game', ()=>{
            cy.get('#new-game').click()
        });

        it('tests left-right diagonal', ( )=>{
            playerOnePlay([0, 4, 8]);
            cy.wait(1000);
        });


    
        it('starts the game', ()=>{
            cy.get('#new-game').click()
        });

        it('tests right-left diagonal', ( )=>{
            playerOnePlay([2, 4, 6]);
        });
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
