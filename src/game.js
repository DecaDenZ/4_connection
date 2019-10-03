import React, {
  useState,
  useEffect
} from 'react';
import './App.css';
import Table from './table/table';
import {
  Redirect
} from 'react-router-dom';
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
        axios.get('http://localhost:4000/info')
        .then((response) => {
          console.log(response);
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

  // проверяем является ли ход победным
  function checkWin(column, row) {
    if (checkWinVertical(column, row)){
      return true;
    } else {
      if (checkWinDiagonal(column, row)) {
        return true;
      } else {
        if (checkWinHorizontal(column, row)){
          return true
        } else {
          return false
        }
      }
    }
  }

  // проверка по вертикали
  function checkWinVertical(column, row){
    let count = 1;
    for (let i = row; i > 0; i--) {
      if (field[column][i] === field[column][i - 1]) {
        count++;
      }
    }
    return (count === 4) ? true : false;
  }

  function checkWinHorizontal(column, row){
    let currentPlayer = field[column][row];
    let count = 0;
    for (let i = 0; i < 7; i++){
      if (field[i][row] === currentPlayer){
        count++;
      } else {
        count = 0;
      }
      if (count === 4) return true;
    }
    return false;
  }

  //проверка по диагонали
  function checkWinDiagonal(column, row){
    //сохраняем начальное значение позиции
    let reserveColumn = column;
    let reserveRow = row;

    let count = 0;
    let currentPlayer = field[column][row];
    // проверка слева вправо
    //находим начало диагонали
    if (column > 0 && row > 0){
      let min = Math.min(column, row);
      column -= min;
      row -= min;
    }
    while (column < 7 && row < 6) {
      if (field[column][row] === currentPlayer){
        count++;
      } else count = 0;

      if (count === 4) return true
      column++; row++;
    }
    //возвращаем начальное значение позиции
    column = reserveColumn;
    row = reserveRow;
    // проверка справа налево
    //находим начало диагонали
    if (column < 6 && row > 0){
      let min = Math.min((6 - column), row);
      column += min;
      row -= min;
    }

    while (column >= 0 && row < 6) {
      if (field[column][row] === currentPlayer){
        count++;
      } else count = 0;
      if (count === 4) return true
      column--; row++;
    }
    return false;
  }

  //проверяем заполнен ли ряд, если да, ход не засчитывается, перехода хода нет
  function checkFullColumn(arr) {
    if (arr.indexOf(0) === -1) {
      alert('этот ряд заполнен');
      return true;
    }
  }

  //проверяем есь ли возможнось хода
  function checkNoMove() {
    for (let i = 0; i <= 6; i++) {
      if (field[i][5] === 0) return false;
    }
    alert('ходов больше нет');
    return true;
  }

  // сам ход
  function move(columnId) {
    columnId--;
    let arr = field[columnId];
    if (checkFullColumn(arr)) return;
    let position = arr.indexOf(0);
    arr[position] = currentPlayer;
    setField(field);
    if (checkWin(columnId, position)) {
      endGame(currentPlayer);
      return;
    }
    currentPlayer === 1 ? setCurrentPlayer(2) : setCurrentPlayer(1);
    if (checkNoMove()) setField(START_GAME);
  }


  function endGame(winner) {
    setCurrentPlayer(winner);
    setIsEndGame(true);
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
