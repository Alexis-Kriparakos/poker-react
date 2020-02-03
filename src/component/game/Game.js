import React from 'react';
import Player from '../player';
import {PokerHandRate, pokerManager,rateCards, drawCards, shuffleDeck, createDeck, startGame} from '../../poker/poker';
import './styles/cards.css';
import './styles/game.css';

class Game extends React.Component {  
    constructor(props){
        super(props);
        this.state = {
          game: {
            winner: null,
            pot: 0,
          },
          player1: {
            player1Hand: pokerManager.player1Hand,
          },
          player2: {
            player2Hand: pokerManager.player2Hand,
          }
        }
        this.handleChangeP1 = this.handleChangeP1.bind(this);
        this.handleChangeP2 = this.handleChangeP2.bind(this);
        this.displayResults = this.displayResults.bind(this);
    }
    handleChangeP1 = (newHand) => {
      this.setState({
        player1: {
          player1Hand: newHand
        }
      })
    }
    handleChangeP2 = (newHand) => {
      this.setState({
        player2: {
          player2Hand: newHand
        }
      })
    }
    

    displayResults() {
      console.log(PokerHandRate(new rateCards(this.state.player1.player1Hand)));
      console.log(PokerHandRate(new rateCards(this.state.player2.player2Hand)));
    }

    render(){
        return(
          <div>
            <Player 
            deck={pokerManager.deck} 
            player={this.state.player1.player1Hand} 
            minBet={this.state.game.minBet}
            handleChange={this.handleChangeP1}
            displayResults={this.displayResults}
            />           
            <Player 
            deck={pokerManager.deck} 
            player={this.state.player2.player2Hand} 
            minBet={this.state.game.minBet}
            handleChange={this.handleChangeP2}
            displayResults={this.displayResults}
            />           
          </div>
        );
      }
}

export default Game;


 


