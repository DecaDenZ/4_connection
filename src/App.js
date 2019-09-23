import React, {useState} from 'react';
import './App.css';
import Table from './table/table';

function App(){
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [field, setField] = useState([
    [1,2,0,0,0,0],
    [2,0,0,0,0,0],
    [0,0,0,0,0,0],
    [2,1,1,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
  ])

  function move(columnId){
    alert('ход игрока ' + currentPlayer + '  в столбце  ' + columnId);
    columnId--;
    let position = field[columnId].indexOf(0);
    field[columnId][position] = currentPlayer;
    setField(field);
    currentPlayer === 1 ? setCurrentPlayer(2) : setCurrentPlayer(1);
  }

    return (
      <div className="App">
      <Table onColumnPress={move} currentPlayer={currentPlayer} field={field}></Table>
      </div>
    );
  }

export default App;
