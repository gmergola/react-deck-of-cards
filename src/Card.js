import React from 'react';

/**Card: child component of DecKOfCards
 * takes an image url as a prop and returns a div with that 
 * image url as the source
 */
function Card({ image }){
  return(
    <div>
      <img src={image} alt="card-image"/>
    </div>
  );
}

export default Card;