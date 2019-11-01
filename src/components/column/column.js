import React from 'react';
import Cell from '../cell/cell';
import {MoveContext} from '../../game';

function Column (props){
  return (
     <MoveContext.Consumer>
         { (move)=> (
            <div className="column" onClick={ move(props.columnId) }>
            {
               props.data.map((el, key) => {
                  return (
                     <Cell className="cell" value={el} key={key}/>
                  );
               })
            }
            </div>
         )}
      </MoveContext.Consumer>
 )
}

export default Column;
