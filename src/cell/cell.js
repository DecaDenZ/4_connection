import React from 'react';
import Chip from '../chip/chip';

function Cell (props){
  return <span class="cell"><Chip value={props.value}></Chip></span> 
  // <span class="cell">{props.value}</span>
}

export default Cell;
