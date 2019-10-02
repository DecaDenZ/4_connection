import React from 'react';
import {Link} from 'react-router-dom';

function EndGame(props){
  var winner = props.location.state.currentPlayer;
  if (winner === 1){
    winner = props.location.state.player1Name;
  } else {
    winner = props.location.state.player2Name;
  }

  return(
<div className="endGame">
  <h1>Конец игры</h1>
  <p>Победил игрок - {winner}</p>
  <Link to={{pathname:'/'}}>Заново</Link>
</div>
  )
}

export default EndGame;
