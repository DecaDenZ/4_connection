import React from 'react';
import {Link} from 'react-router-dom';

function EndGame(props){
  return(
<div>
  <div>Конец игры</div>
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
