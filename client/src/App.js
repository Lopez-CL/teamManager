import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar';
import PlayerList from './components/PlayerList';
import PlayerStatus from './components/PlayerStatus';
import AddPlayer from './components/AddPlayer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/player/list' element={<PlayerList/>}/>
        <Route path='/players/addplayer' element={<AddPlayer/>}/>
        <Route path='/status/game/:num' element={<PlayerStatus/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
