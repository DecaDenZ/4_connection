import React, {useState} from 'react';
import './App.css';
import Table from './table/table';

function App(){
  const [currentPlayer, setState] = useState(1);
  const field = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
  ];

  function move(columnId){
    alert('ход игрока ' + currentPlayer + '  в столбце  ' + columnId);
    currentPlayer === 1 ? setState(2) : setState(1);
    columnId--;
    let position = field[columnId].indexOf(0);

    })
  }


    return (
      <div className="App">
      <Table onColumnPress={move} currentPlayer={currentPlayer} field={field}></Table>
      </div>
    );
  }

export default App;
