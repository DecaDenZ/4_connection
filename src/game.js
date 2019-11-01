import React, {useState, useEffect} from 'react';
// import './styles/App.css';
import Table from './components/table/table';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
// import {Link} from 'react-router-dom';

function Game(props) {

  const player1Name = props.location.state.player1Name;
  const player2Name = props.location.state.player2Name;

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [field, setField] = useState(props.location.state.field);
  const [isEndGame, setIsEndGame] = useState(false);

  useEffect(() => {
      const intervalID = setInterval(
        axios.get('http://localhost:4000/game/status')
        .then((response) => {
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

  function clearField(){
     axios
      .patch(
         'http://localhost:4000/game'
      )
      .then((res)=> {
         setField(res.data);
         console.log('Поле очищено')
      })
      .catch((error)=> {
          console.log(error);
      });
  }

  //проверяем заполнен ли ряд, если да, ход не засчитывается, перехода хода нет
  // остваляем функцию здесь, чтобы обрабатывался алерт
  function checkFullColumn(arr) {
    if (arr.indexOf(0) === -1) {
      alert('этот ряд заполнен');
      return true;
    }
  }

  // сам ход
  function move(columnId) {
    columnId--;
    if (checkFullColumn(field[columnId])) return;

// здесь отправляем запрос на изменение состояния field на сервер
    axios
      .post(
        'http://localhost:4000/game',
        {currentPlayer: currentPlayer, column: columnId, isEndGame: isEndGame }
      )
      .then((res)=> {
         if (!res.data.field){   // если ходов больше нет, сервер присваивает переменной field значение false
            alert('Больше нет ходов');
            clearField();
         } else {
            setField(res.data.field);
         }
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

 //  if (props.location.state.restartGame) {
 //     clearField();
 // }

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

  function reset(){
    clearField();
    return <Redirect to="/"/>
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
      <input
         type="button"
         className="reset-button"
         onClick={reset}
         value='Очистить поле'
         />
    </div>
  );
}

export default Game;
