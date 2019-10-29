import React, {useState, useEffect} from 'react';
import './styles/App.css';
import Table from './components/table/table';
import {Redirect} from 'react-router-dom';
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

  const player1Name = props.location.state.player1Name;
  const player2Name = props.location.state.player2Name;

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [field, setField] = useState(START_GAME);
  const [isEndGame, setIsEndGame] = useState(false);

  useEffect(() => {
      const intervalID = setInterval(
        axios.get('http://localhost:4000/game/status')
        .then((response) => {
          console.log(response.data);
          setField(response.data.field);
          setCurrentPlayer(response.data.currentPlayer);
        })
        .catch((error) => console.log(error)),
        2000
      );
      return () => {
        clearInterval(intervalID);
      }
    },
    []
  );

  //проверяем заполнен ли ряд, если да, ход не засчитывается, перехода хода нет
  function checkFullColumn(arr) {
    if (arr.indexOf(0) === -1) {
      alert('этот ряд заполнен');
      return true;
    }
  }

  // сам ход
  function move(columnId) {
    columnId--;
    let arr = field[columnId];
    if (checkFullColumn(arr)) return;
    let position = arr.indexOf(0);

    arr[position] = currentPlayer;

// здесь отправляем запрос на изменение состояния field на сервер
    axios
      .post(
        'http://localhost:4000/game',
        {field: field, currentPlayer: currentPlayer, column: columnId, raw: position }
      )
      .then((res)=> {
        setField(res.data.field);
        setCurrentPlayer(res.data.currentPlayer);
        setIsEndGame(res.data.isEndGame);
      })
      .catch((error)=> {
        console.log(error);
      });
  }

  // проверка введено ли что-то в поля имен, можно добавить проверку по каждому из полей,
  // если проверка не прошла возвра на стартовую сраницу
  if (!props.location.state.player1Name || !props.location.state.player2Name) {
    alert('Введите имя игрока');
    return <Redirect to="/" / >
  }

  // если игра закончилась, направляем на конечный экран, передаем имена игроков и номер игрока-победиеля
  if (isEndGame === true) {
    return <Redirect to={
      {
        pathname: '/endGame',
        state: {
          currentPlayer: currentPlayer,
          player1Name: player1Name,
          player2Name: player2Name
        }
      }
    }
    />
  }

  return (
    <div className="App">
      <p>{player1Name}</p>
      vs
      <p>{player2Name}</p>
      <Table onColumnPress={move}
             currentPlayer={currentPlayer}
             player1Name={player1Name}
             player2Name={player2Name}
             field={field}
      />
    </div>
  );
}

export default Game;
