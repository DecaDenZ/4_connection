import React, {
   useState
} from 'react';
import './App.css';
import Table from './table/table';

function App() {
  const START_GAME = [
     [0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0],
  ]

   const [currentPlayer, setCurrentPlayer] = useState(1);
   const [field, setField] = useState(START_GAME);
   function checkWin(arr, position) {
      let count = 1;
      for (let i = position; i > 0; i--) {
         if (arr[i] === arr[i - 1]) {
            count++;
            if (count === 4) return true;
         } else return false;
      }
   }

   function move(columnId) {
      columnId--;
      let arr = field[columnId];
      if (arr.indexOf(0) === -1) {
        alert('этот ряд заполнен');
        return;
      }
      console.log('ход игрока ' + currentPlayer + '  в столбце  ' + columnId);
      let position = arr.indexOf(0);
      arr[position] = currentPlayer;
      setField(field);
      if (checkWin(arr, position)) {
         endGame(currentPlayer);
      }
      currentPlayer === 1 ? setCurrentPlayer(2) : setCurrentPlayer(1);
   }

   function endGame(winner){
      alert('Победил игрок - ' + winner);
      setField(START_GAME);
   }

   return (
      <div className = "App" >
      <Table onColumnPress={move} currentPlayer={currentPlayer} field={field} >< /Table>
      </div>
   );
}

export default App;
