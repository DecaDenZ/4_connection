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
    <div className="table">{
      props.field.map((el, i) =>{
         return (
            <Column columnId={i+1} onColumnPress={props.onColumnPress} data={el} key={i}/>
         );
      })
   }
    </div>
  </div>
)

}
