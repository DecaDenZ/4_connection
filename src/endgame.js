import React from 'react';
import {Link} from 'react-router-dom';

function EndGame(props){
  return(
<div className="endGame">
  <h1>Конец игры</h1>
  <Link to={{
    pathname:'/game',
    state:{
      player1Name:'Denis',
      player2Name:'Igor'
    }
  }}>Начать игру</Link>
</div>
  )
}

export default EndGame;
