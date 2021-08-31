import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import io from "socket.io-client"

const socket = io("http://localhost:8004/")

ReactDOM.render(
    <App socket = {socket} />,
  document.getElementById('root')
);

