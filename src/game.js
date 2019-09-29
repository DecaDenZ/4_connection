import React, {
  useState, useEffect
} from 'react';
import './App.css';
import Table from './table/table';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Game(props) {
  const START_GAME = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ]

  useEffect(()=>{
  const intervalID = setInterval(
    axios.get('http://localhost:4000/info').then((response)=>{
      console.log(response);
      setField(response.data.field);
      setCurrentPlayer(response.data.currentPlayer);
    }),
     2000
   );
   return () => {clearInterval(intervalID);
   }
 }, []);

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [field, setField] = useState(START_GAME);

  if (!props.location.state){
    return <Redirect to="/"/>
  }

//   if (checkWin){
//   return (<Link to="/">Заново</Link>)
// }

  function checkWin(arr, position) {
    let count = 1;
    for (let i = position; i > 0; i--) {
      if (arr[i] === arr[i - 1]) {
        count++;
        if (count === 4) return true;
      } else return false;
    }
  }

  function checkFullColumn(arr) {
    if (arr.indexOf(0) === -1) {
      alert('этот ряд заполнен');
      return true;
    }
  }

  function checkNoMove() {
    for (let i = 0; i <= 6; i++) {
      if (field[i][5] === 0) return false;
    }
    alert('ходов больше нет');
    return true;
  }

  function move(columnId) {
    columnId--;
    let arr = field[columnId];
    if (checkFullColumn(arr)) return;
    let position = arr.indexOf(0);
    arr[position] = currentPlayer;
    setField(field);
    if (checkWin(arr, position)) {
      endGame(currentPlayer);
    }
    currentPlayer === 1 ? setCurrentPlayer(2) : setCurrentPlayer(1);
    if (checkNoMove()) setField(START_GAME);
  }

  function endGame(winner) {
    alert('Победил игрок - ' + winner);
    setField(START_GAME);
    return (<Link to={{
        pathname:'/',
      }}>Заново</Link>);
  }

  return (
    <div className="App" >
      <p>{props.location.state.player1Name}</p>
      vs
      <p>{props.location.state.player2Name}</p>
            <Table onColumnPress={move}
                   currentPlayer={currentPlayer}
                   field={field}
            />
            <Link to={{
                pathname:'/',
              }}>Заново</Link>
    </div>
  );
}

export default Game;
