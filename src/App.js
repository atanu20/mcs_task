import React from 'react';
import 'swiper/swiper.min.css';
import { Switch, Route } from 'react-router-dom';

import Error from './pages/Error';

import './App.css';
import Home from './pages/home/Home';
import Navbar from './component/navbar/Navbar';
import Add from './pages/operation/Add';
import Edit from './pages/operation/Edit';


const App = () => {
  return (
    <>
     
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/edit/:pid" component={Edit} />


         
          <Route component={Error} />
        </Switch>
       
     
    </>
  );
};

export default App;
