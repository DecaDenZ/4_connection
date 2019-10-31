import React from 'react';
import Chip from '../chip/chip';

function Cell (props){
  return <span className="cell"><Chip value={props.value}/></span>
}

export default Cell;
