import React, {useState} from 'react';
import './App.css';
import Game from './game';
import {HashRouter} from 'react-router-dom';
import Welcome from './welcome';
import {Route} from 'react-router-dom';

function App() {
 return <HashRouter>
<Route path="/" exact component={Welcome}/>
<Route path="/game" component={Game}/>
</HashRouter>
}
export default App;
