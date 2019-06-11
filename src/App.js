import React from 'react';
import logo from './logo.svg';
// Styling
import './App.css';
import { makeStyles } from '@material-ui/core/styles'
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import LandingPage from './component/LandingPage/LandingPage';
import TodoApplication from './component/TodoApplication/TodoApplication';
import NavigationBar from './component/NavigationBar/NavigationBar';
// Components 



const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    backgroundColor : "white",
    borderColor :"pink",
    borderWidth: "2px",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div>
        <Route exact  path='/' component={LandingPage} />
        <Route exact path='/todoapplication' component={TodoApplication} />
        <Route exact path='/navbar' component={NavigationBar} />
        
      </div>
    </BrowserRouter>
  );
}

export default App;
