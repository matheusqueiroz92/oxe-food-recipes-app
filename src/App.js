import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';

function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } />
      <Route path="/foods" component={ Foods } />
    </Switch>
  );
}

export default App;
