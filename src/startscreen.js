import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function StartScreen(){

  const [player1Name, setPlayer1Name] = useState('Player1');
  const [player2Name, setPlayer2Name] = useState('Player2');
  // const player2Input = useRef();

  // function click(){
    // alert(player2Input.current.value);
  // }

  return (
    <div className="startScreen">
      <h1>Welcome</h1>
      <p>Имя первого игрока</p>
      <input type="text" value={player1Name} onChange={()=>setPlayer1Name(event.target.value)}  />
      <p>Имя ворого игрока</p>
      <input type="text" value={player2Name} onChange={()=>setPlayer2Name(event.target.value)} placeholder='Введите имя игрока2'/>

      <p>
        <Link to={{
          pathname:'/game',
          state:{
            player1Name:player1Name,
            player2Name:player2Name
          }
        }}>Начать игру</Link>
      </p>
    </div>
  )
}

export default StartScreen;
