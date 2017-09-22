/*****************************************************************************************************************************************
  --- GAME RULES ---

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

******************************************************************************************************************************************/

var scores,
    roundScore,
    activePlayer;

initialize();

document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function(){
    // Generate Random Dice Number
    var dice = Math.floor(Math.random() * 6) + 1;
    
    //Display the dice image with the correct number
    var diceDOM = document.querySelector('.dice');
    diceDOM.src = './images/dice-' + dice + '.png';
    diceDOM.style.display = 'block';
    
    //Update the round score IF the rolled number was NOT a 1
    if(dice > 1){
        //Add Score
        roundScore+= dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
    }else{
        //Next Player turn, set roundScore for previous player = 0, hide dice image again
        roundScore = 0;
        diceDOM.style.display = 'none';
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        swapPlayers();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    //Add current score to global score
    scores[activePlayer] += roundScore;
    //Update the DOM
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //Check if player won
    if(scores[activePlayer] >= 100){
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
        
    } else{
        //Swap players
        swapPlayers();   
    }
    
});

document.querySelector('.btn-new').addEventListener('click', initialize);

function initialize(){    
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;    

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('#score-0').textContent = '0';           //With 'textContent', Cannot insert HTML, just text
    document.querySelector('#score-1').textContent = '0';           //With 'innerHTML', we can insert HTML and text at the same time. ie: .innerHTML = '<em>' + 0 + '</em>'
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#name-' + activePlayer).textContent = 'Player ' + activePlayer;
    document.querySelector('#name-' + (activePlayer+1)).textContent = 'Player ' + (activePlayer+1);
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
}

function swapPlayers(){
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer++ : activePlayer--;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
}