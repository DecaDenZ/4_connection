import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';
// import Hello from './hello/hello';
import Table from './table/table';


function App(){
  

  const field = [
    [1,0,0,0,0,0,0],
    [2,1,0,0,0,0,0],
    [2,2,1,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0],
  ];

  const currentPlayer = 2;

  function move(columnID){
    alert('ход игрока ' + currentPlayer + '  в столбце  ' + columnID);
  }

    return (
      <div className="App">
      <Table onColumnPress={move} currentPlayer={currentPlayer} field={field}></Table>
      </div>
    );
  }

export default App;
