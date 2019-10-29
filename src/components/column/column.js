import React from 'react';
import Cell from '../cell/cell';

function Column (props){
  return (
    <div className="column" onClick={() => props.onColumnPress(props.columnId) }>
      {
         props.data.map((el, key) => {
            return (
               <Cell className="cell" value={el} key={key}/>
            );
         })
      }
   </div>
 )
}

export default Column;
