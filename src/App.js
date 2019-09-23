import React, {
   useState
} from 'react';
import './App.css';
import Table from './table/table';

function App() {
   const [currentPlayer, setCurrentPlayer] = useState(1);
   const [field, setField] = useState([
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
   ])

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
      alert('ход игрока ' + currentPlayer + '  в столбце  ' + columnId);
      columnId--;
      let position = field[columnId].indexOf(0);
      field[columnId][position] = currentPlayer;
      setField(field);
      if (checkWin(field[columnId], position)) {
         endGame(currentPlayer);
      }
      currentPlayer === 1 ? setCurrentPlayer(2) : setCurrentPlayer(1);
   }

   function endGame(winner){
      alert('Победил игрок - ' + winner);
      setField([
         [0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0],
      ]);
   }

   return (
      <div className = "App" >
      <Table onColumnPress={move} currentPlayer={currentPlayer} field={field} >< /Table>
      </div>
   );
}

export default App;
