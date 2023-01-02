import './App.css';
import React, {useState,useEffect} from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar';
import PlayerList from './components/PlayerList';
import PlayerStatus from './components/PlayerStatus';
import AddPlayer from './components/AddPlayer';
import {io} from 'socket.io-client'
function App() {
  //setting up connect to server with socket.io
  const [socket] = useState(() => io(':8000'))
    useEffect(()=>{
      socket.on('connection',()=>{
        console.log('connected to server')
      })
      return () => socket.disconnect(true)
    }, [])
    return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/player/list' element={<PlayerList socket={socket}/>}/> 
        <Route path='/players/addplayer' element={<AddPlayer socket={socket}/>}/>
        <Route path='/status/game/:num' element={<PlayerStatus/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
