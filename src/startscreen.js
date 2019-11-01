import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function StartScreen(){

   const START_GAME = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
   ]
  const [player1Name, setPlayer1Name] = useState('Player1');
  const [player2Name, setPlayer2Name] = useState('Player2');
  // eslint-disable-next-line
  const [field, setField] = useState(START_GAME);
  return (
    <div className="startScreen">
      <h1>Welcome</h1>
      <p>Имя первого игрока</p>
      <input type="text" value={player1Name}
        onChange={(event)=>setPlayer1Name(event.target.value)}
        placeholder='Введите имя игрока 1'
      />
      <p>Имя ворого игрока</p>
      <input type="text" value={player2Name}
        onChange={(event)=>setPlayer2Name(event.target.value)}
        placeholder='Введите имя игрока 2'
      />

      <p>
        <Link to={{
          pathname:'/game',
          state:{
            player1Name:player1Name,
            player2Name:player2Name,
            field:field
          }
        }}>Начать игру</Link>
      </p>
    </div>
  )
}

export default StartScreen;
