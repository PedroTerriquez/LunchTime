import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./app/header/header.js";
import Login from "./app/login/login.js";
import Calendar from './app/dashboard/calendar.js';
import Menu from './app/menu/add_menu.js';
import Error from './app/error/error.js';
import DishesCRUD from './app/dishesCRUD/dishesCRUD.js';
import Review from './app/review/review.js';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Application extends Component {
  constructor() {
    super();

    this.state = {
      title: 'Prestamesta pls'
    };
    document.title = this.state.title;
  }

  render() {
    return (
      <Router>
    		<div>
      		<Header />
      		<Switch>
        		<Route exact path="/login" component={ Login }/>
        		<Route exact path="/" component={ Calendar }/>
        		<Route exact path='/menus/new' component={ Menu }/>
        		<Route exact path='/dishes/new' component={ DishesCRUD }/>
        		<Route exact path='/dishes/:id/review' component={ Review }/>
        		<Route component={ Error } />
      		</Switch>
      	</div>
      </Router>
    );
  }
}

const wrapper = document.getElementById('application');
wrapper ? ReactDOM.render(<Application />, wrapper) : false;

export default Application;

