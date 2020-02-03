import React from 'react';
import Card from '../card';
import './styles/cards.css';
import './styles/player.css'

class Player extends React.Component {
   



    render() {   
      const cardsInHand = this.props.player.map((card, key) => 
      <Card 
      key={key} 
      card={card}
      index={key}
      handleChange={this.props.handleChange}
      deck={this.props.deck}
      hand={this.props.player}
      />);
      return (

         <div>
            <div>
               <ul className='hand_position'>
                  {cardsInHand}
               </ul>
               <div className='button__container'>
                  <button onClick={this.props.displayResults}>Call</button>
               </div>
            </div>
         </div>
      )
    }
};


export default Player;