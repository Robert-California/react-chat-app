
import { useState, useRef } from 'react'
import './App.css'
import { Auth } from './components/Auth'
import Cookies from "universal-cookie";
function App() {
  const cookies = new Cookies();

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);


  if(!isAuth){
    return (
      <div>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }
  return <div>
    {room ? <div>Chat</div> : 
  <div>
    <label>Enter room name</label>
    <input ref={roomInputRef}></input>
    <button onClick={() => setRoom(roomInputRef.current.value)}>Enter chat</button>
  </div>}
  </div>
}

  

export default App
