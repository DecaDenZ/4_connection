import React from 'react';
import {Link} from 'react-router-dom';
function Welcome(){
  return <div>
  <h1>Welcome</h1>
  <Link to={{
    pathname:'/game',
    state:{
      player1Name:'Denis',
      player2Name:'Igor'
    }
  }}>Начать игру</Link>
  </div>
}
export default Welcome;
