import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
const BASE_URL = 'https://deckofcardsapi.com/api/deck'

/**DeckOfCards: parent, has a <Card /> component child */
function DeckOfCards(){

  const [deckId, setDeckId] = useState(null);
  const [drawCard, setDrawCard] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    /**fetchDeck: make api call to a new deck of cards 
     * when the component is mounted */
    async function fetchDeck() {
      try{
        const deckData = await axios.get(
          `${BASE_URL}/new/shuffle/?deck_count=1`
        );
        setDeckId(deckData.data.deck_id);
      }catch(err){
        console.log('request failed');
      }
    }
    fetchDeck();
  }, []);

  useEffect(() => {
    /** fetchCard: make api call to get one card from the deck 
     * when drawCard state has been changed */ 
    async function fetchCard() {
      try{
        const cardData = await axios.get(
          `${BASE_URL}/${deckId}/draw/?count=1`
        );
        /** if cards still remain in the deck add card to state 
         * else throw alert error
        */
        if(cardData.data.success){
          addCard(cardData.data.cards[0])
          setDrawCard(false);
        }else{
          alert("Error: no cards remaining!");
        }
      }catch(err){
        console.log('request failed');
      }
    }

    if(drawCard && deckId){
      fetchCard();
    }
  }, [drawCard, deckId]);
  
  /** drawACard: change drawCard state to true if it is false
   * change it to false if it is true
   */

  function drawACard(){
    setDrawCard(true);
  }

  /**addCard: Adds a card to state */
  function addCard(cardData) {
    setCards(oldCards => [...oldCards, cardData]);
  }


  return(
    <div>
      <button onClick={drawACard}>Draw a Card</button>
      <div>
        {cards.map(({code, image}) => {
          return (
            <Card 
            key={code}
            image={image}/>
          );
        })}
      </div>
    </div>
  );
}

export default DeckOfCards;