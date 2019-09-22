import React from 'react';

function Hello(props){
  function sayHello (name){
    return 'Hello ' + name;
  }


  return (
    <p onClick={()=>alert(props.name)}>
      {sayHello(props.name)}
    </p>
  )
}

export default Hello;
