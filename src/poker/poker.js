import { groupBy } from "lodash";
import _ from "lodash";

const maxInARow = weights =>
  _.chain(weights)
    .sortBy()
    .uniq()
    .map((num, i) => num - i)
    .groupBy()
    .orderBy("length")
    .last()
    .value().length;


class rateCards {
  constructor(hand) {
    this.ranks = groupBy(hand, "rank");
    this.suits = groupBy(hand, "suit");
    this.rankTimes = groupBy(this.ranks, "length");
    this.suitsTimes = groupBy(this.suits, "length");
    this.maxInARow = maxInARow(hand.map(({ weight }) => weight));
  }
    
  getOfSameRank(n) {
    return this.rankTimes[n] || [];
  }
    
  hasOfSameRank(n) {
    return this.getOfSameRank(n).length;
  }
    
  getOfSameSuit(n) {
    return this.suitsTimes[n] || [];
  }
    
  hasOfSameSuit(n) {
    return this.getOfSameSuit(n).length;
  }
  hasAce() {
    return !!this.ranks["A"];
  }
    
  hasInARow(n) {
    return this.maxInARow >= n;
  }
}
    
const PokerRatings = {
  RoyalFlush: hand => hand.hasInARow(5) && hand.hasOfSameSuit(5) && hand.hasAce(),
  StraightFlush: hand => hand.hasInARow(5) && hand.hasOfSameSuit(5),
  FourOfAKind: hand => hand.hasOfSameRank(4),
  FullHouse: hand => hand.hasOfSameRank(3) && hand.hasOfSameRank(2),
  Flush: hand => hand.hasOfSameSuit(5),
  Straight: hand => hand.hasInARow(5),
  ThreeOfAKind: hand => hand.hasOfSameRank(3),
  TwoPair: hand => hand.hasOfSameRank(2) >= 2,
  OnePair: hand => hand.hasOfSameRank(2),
  HighCard: hand => hand.hasOfSameRank(1) >= 5
};
    
const PokerHandRate = cards =>
  Object.entries(PokerRatings).find(([, is]) => is(cards))[0];
  
class managePokerGame {
  constructor(){
    this.deck = [];
    this.player1Hand = [];
    this.player2Hand = [];


    this.startGame()
  }
  shuffleDeck = (deck) => {
    let m = deck.length, currentElem, remainElem;
    while (m) {
      remainElem = Math.floor(Math.random() * m--);
      currentElem = deck[m];
      deck[m] = deck[remainElem];
      deck[remainElem] = currentElem;
    } 
    return deck;
  }
  createDeck = () => {
    const SUITS = ["spades", "diams", "clubs", "hearts"];
    const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const WEIGHT = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    let deck = [];
    for (let i = 0; i < SUITS.length; i++) {
      for (let j = 0; j < RANKS.length; j++){
        let card = {rank: RANKS[j], suit: SUITS[i], weight: WEIGHT[j]};
        deck.push(card);
      }
    }
    this.shuffleDeck(deck);
    return deck;
  };

  
  drawCards = (numOfCards, deck) => {
    let hand = [];
    for (let i = 0; i < numOfCards; i++) {
      hand.push(deck.pop());
    }
    return hand;
  };
  startGame = () => {
    this.deck = this.createDeck();
    this.player1Hand = this.drawCards(5,this.deck);
    this.player2Hand = this.drawCards(5, this.deck);
  }

}   

const pokerManager = new managePokerGame();
const {createDeck, shuffleDeck, drawCards, startGame} = pokerManager;

export {
  PokerHandRate,
  pokerManager,
  createDeck,
  shuffleDeck,
  drawCards,
  startGame,
  rateCards
};

