import React from 'react';
import {HashRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import './styles/App.css';
import Game from './game';
import StartScreen from './startscreen';
import EndGame from './endgame';

function App() {
 return <HashRouter>
<Route path="/" exact component={StartScreen}/>
<Route path="/game" component={Game}/>
<Route path="/endGame" component={EndGame}/>
</HashRouter>
}
export default App;
