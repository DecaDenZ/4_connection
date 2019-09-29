import React from 'react';

function Chip(props) {
  if (props.value === 0) {
    return <span className="chip" > < /span>
  }

  if (props.value === 1) {
    return <span className="chip-red" > < /span>
  } else {
    return <span className="chip-blue" > < /span>
  }
}

export default Chip;
