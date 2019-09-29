import React from 'react';
import {HashRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import './App.css';
import Game from './game';
import Welcome from './welcome';
import EndGame from './endgame';

function App() {
 return <HashRouter>
<Route path="/" exact component={Welcome}/>
<Route path="/game" component={Game}/>
<Route path="/endGame" component={EndGame}/>
</HashRouter>
}
export default App;
