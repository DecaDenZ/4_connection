import React from 'react';

function Chip(props) {
  if (props.value === 0) {
    return <span class = "chip" > < /span>
  }

  if (props.value === 1) {
    return <span class = "chip-red" > < /span>
  } else {
    return <span class = "chip-blue" > < /span>
  }
}

export default Chip;
