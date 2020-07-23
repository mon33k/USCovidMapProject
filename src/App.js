import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch, Link} from 'react-router-dom';
import Header from './components/header'
import LandingPage from './components/landing-page';
import Main from './components/main';

function App() {
  return (
    <div>
      <Header/>
      <Main/>
    </div>
      
  );
}

export default App;
