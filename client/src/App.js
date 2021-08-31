import './App.scss';

import React, {useState} from "react"
import RegisterPage from './components/Register';
import CheckRegister from './contex/contex';
import ChatPage from './components/Chat';



function App({socket}) {

  const [StartChat, SetStartChat] = useState(false);

  return (
    <CheckRegister.Provider value = {{StartChat, SetStartChat}}>
    <div className="App">
      {
      StartChat ? 
      <ChatPage socket = {socket}/> :
      <RegisterPage socket = {socket}/> 
      }
    </div>
    </CheckRegister.Provider>
  );
}

export default App;
