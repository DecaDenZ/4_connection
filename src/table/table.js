import React from 'react';
import Column from '../column/column';

export default function Table (props){
  var currentPlayer = props.currentPlayer;
  if (currentPlayer === 1){
    currentPlayer = props.player1Name;
  } else {
    currentPlayer = props.player2Name;
  }

  return (
  <div>
    <p>Ход игрока {currentPlayer}</p>
    <div className="table">
      <Column columnId='1' onColumnPress={props.onColumnPress} data={props.field[0]}/>
      <Column columnId='2' onColumnPress={props.onColumnPress} data={props.field[1]}/>
      <Column columnId='3' onColumnPress={props.onColumnPress} data={props.field[2]}/>
      <Column columnId='4' onColumnPress={props.onColumnPress} data={props.field[3]}/>
      <Column columnId='5' onColumnPress={props.onColumnPress} data={props.field[4]}/>
      <Column columnId='6' onColumnPress={props.onColumnPress} data={props.field[5]}/>
      <Column columnId='7' onColumnPress={props.onColumnPress} data={props.field[6]}/>
    </div>
  </div>
)

}
