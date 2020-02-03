import React from 'react';
import './styles/cards.css';


class Card extends React.Component {


  onChange = () => {
    let tempHand = [...this.props.hand];  
    tempHand.splice(this.props.index,1);    
    tempHand.splice(this.props.index,0,this.props.deck.pop());
    this.props.handleChange(tempHand);  
    
  }

  render(){
    return (
      <div className='playingCards'>      
          <label htmlFor="c-2D"
            className={`card rank-${this.props.card.rank.toLowerCase()} ${this.props.card.suit}`}>
              <span className="rank">{this.props.card.rank}</span>
              <span className="suit">&diams;</span>
              <input type="checkbox"
               name="c-2D" 
               id="c-2D" 
               value="select"
               onClick={this.onChange}/>                       
          </label>
        </div>
      );
    }
  }

export default Card
